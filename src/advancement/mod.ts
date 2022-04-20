import {colors, colorsMapping, getAdvancementsPathType, types, writeFile} from "../utils/pack.ts"
import {calculateModelData, getVariantsWithTypeColor} from "../utils/variant.ts"
import generateMainFile from "./mainFile.ts"
import generatePatternFiles from "./patternFile.ts"
import generateActiveFile from "./activeFile.ts"
import generateGlobalFile from "./globalFile.ts"
import {getParentTemplate_mod} from "./advancementFactory.ts";
import {Variant} from "./IJson.ts";

export default async function generatesFiles() {
    const promises: Promise<void>[] = []
    const colorsMappingFlip = Object.fromEntries(Object.entries(colorsMapping).map(([k, v]) => [v, k]))
    const allTypeVariants: {
        [type: string]: { key: string, value: Variant }[]
    } = {}

    types.forEach((type, typeIndex) => {
        const typeVariants: {
            key: string, value: Variant
        }[] = []

        colors.forEach((bodyColor, bodyColorIndex) => {
            const path = `${getAdvancementsPathType(type)}/body_${bodyColor}.json`
            const variantsColor = getVariantsWithTypeColor(type, bodyColor).map(colorVariant => {
                return {
                    color: colorVariant,
                    key: `variant_${colorVariant}`
                }
            })
            const content = getParentTemplate_mod({
                bodyColor: bodyColor,
                modelData: calculateModelData(typeIndex, bodyColorIndex, 0),
                variantsColor: variantsColor,
                type: type
            })

            let patternColorIndex = 0
            for (const variant of variantsColor) {
                const patternColor = colorsMappingFlip[patternColorIndex]
                const criteriaKey = variant.key
                const criteriaValue = content.criteria[criteriaKey]

                promises.push(generatePatternFiles({
                    type: type,
                    colorBody: bodyColor,
                    colorPattern: patternColor,
                    variantObj: {
                        key: criteriaKey,
                        value: criteriaValue
                    }
                }))

                patternColorIndex++
                typeVariants.push({key: criteriaKey, value: criteriaValue})
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