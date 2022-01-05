import {getDatapackName, types, colors, getPathType, colorsMapping, writeFile} from "../pack.ts"
import {calculModelData, getVariantsWithTypeColor} from "../variant.ts"
import generateMainFile from "./mainFile.ts"
import {ParentFile, Variant} from "./IJson.ts"
import generatePatternFiles from "./patternFile.ts"
import generateActiveFile from "./activeFile.ts"
import generateGlobalFile from "./globalFile.ts"

const TEMPLATE: ParentFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket",
            "nbt": "{CustomModelData: %MODELDATA%}"
        },
        "title": "Les petits %TYPE% %COLOR% ...",
        "description": "Récupérer tous les %TYPE% %COLOR%",
        "frame": "goal",
        "show_toast": true,
        "announce_to_chat": false,
        "hidden": false
    },
    "parent": `${getDatapackName()}:%TYPE%/main`,
    "criteria": {
        // FILL
    }
}
const LINE: Variant = {
    "trigger": "minecraft:inventory_changed",
    "conditions": {"items": [{"items": ["minecraft:tropical_fish_bucket"], "nbt": "{BucketVariantTag:%VARIANT%}"}]}
}

const BODY_FILENAME = "body_"

function convertString(str: string, type: string, color: string) {
    return str.replace(/%TYPE%/g, type).replace(/%COLOR%/g, color)
}

export default async function generatesFiles() {
    const promises: Promise<void>[] = []
    const colorsMappingFlip = Object.fromEntries(Object.entries(colorsMapping).map(([k, v]) => [v, k]))
    const allTypeVariants: { [type: string]: { key: string, value: Variant }[] } = {}

    types.forEach((type, typeIndex) => {
        const typeVariants: { key: string, value: Variant }[] = []

        colors.forEach((bodyColor, bodyColorIndex) => {
            const path = `${getPathType(type)}/${BODY_FILENAME}${bodyColor}.json`
            const modelData: string = "" + calculModelData(typeIndex, bodyColorIndex, 0)
            const content: ParentFile = JSON.parse(JSON.stringify(TEMPLATE))

            content.display.icon.nbt = content.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
            content.display.title = convertString(content.display.title, type, bodyColor)
            content.display.description = convertString(content.display.description, type, bodyColor)
            content.parent = convertString(content.parent, type, bodyColor)

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