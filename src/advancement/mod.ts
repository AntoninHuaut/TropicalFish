import {colors, colorsMapping, getAdvancementsPathType, types, writeFile} from "../utils/pack.ts"
import {calculateModelData, getVariantsWithTypeColor} from "../utils/variant.ts"
import generateMainFile from "./mainFile.ts"
import {Variant} from "./IJson.ts"
import generatePatternFiles from "./patternFile.ts"
import generateActiveFile from "./activeFile.ts"
import generateGlobalFile from "./globalFile.ts"
import {getParentTemplate_mod} from "./advancementFactory.ts";

// TODO
const LINE: Variant = {
    "trigger": "minecraft:inventory_changed",
    "conditions": {"items": [{"items": ["minecraft:tropical_fish_bucket"], "nbt": "{BucketVariantTag:%VARIANT%}"}]}
}

const BODY_FILENAME = "body_"

export default async function generatesFiles() {
    const promises: Promise<void>[] = []
    const colorsMappingFlip = Object.fromEntries(Object.entries(colorsMapping).map(([k, v]) => [v, k]))
    const allTypeVariants: { [type: string]: { key: string, value: Variant }[] } = {}

    types.forEach((type, typeIndex) => {
        const typeVariants: { key: string, value: Variant }[] = []

        colors.forEach((bodyColor, bodyColorIndex) => {
            const path = `${getAdvancementsPathType(type)}/${BODY_FILENAME}${bodyColor}.json`
            const content = getParentTemplate_mod({
                bodyColor: bodyColor,
                modelData: calculateModelData(typeIndex, bodyColorIndex, 0),
                type: type
            })

            const colorVariants = getVariantsWithTypeColor(type, bodyColor)

            let patternColorIndex = 0
            for (const variant of colorVariants) {
                const contentKey = `variant_${variant}`
                const contentLine: Variant = JSON.parse(JSON.stringify(LINE))

                contentLine.conditions.items[0].nbt = contentLine.conditions.items[0].nbt.replace(/%VARIANT%/g, "" + variant)
                content.criteria[contentKey] = contentLine

                const patternColor = colorsMappingFlip[patternColorIndex]
                promises.push(generatePatternFiles(type, bodyColor, patternColor, {
                    key: contentKey,
                    value: contentLine
                }))

                patternColorIndex++
                typeVariants.push({key: contentKey, value: contentLine})
            }

            promises.push(generateActiveFile(type, bodyColor))
            promises.push(writeFile(path, content))
        })

        allTypeVariants[type] = typeVariants
        promises.push(generateMainFile(type, typeVariants))
    })

    promises.push(generateGlobalFile(allTypeVariants))
    await Promise.all(promises)
}