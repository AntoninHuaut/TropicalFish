import {
    getAdvancementsPath,
    getAdvancementsPathBodyColor,
    getAdvancementsPathType,
    getDatapackName,
    writeFile
} from "../utils/pack.ts"
import {calculateModelData, colors, colorsMapping, getVariantsWithTypeColor, types} from "../utils/variant.ts"
import {
    getActiveContent,
    getMainTemplate_GlobalFile,
    getMainTemplate_MainFile,
    getParentRewardsTemplate,
    getParentTemplate_globalFile,
    getParentTemplate_mod
} from "./advancementFactory.ts";
import {Criteria, Variant} from "./IJson.ts";

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

            promises.push(createActiveFiles(type, bodyColor))
            promises.push(writeFile(path, content))
        })

        allTypeVariants[type] = typeVariants
        promises.push(generateMainFile(type, typeVariants))
    })

    promises.push(generateGlobalFile(allTypeVariants))
    await Promise.all(promises)
}

async function generateMainFile(type: string, typesVariants: {
    key: string, value: Variant
}[]) {
    const path = `${getAdvancementsPathType(type)}/main.json`
    const content = getMainTemplate_MainFile({
        modelData: calculateModelData(types.indexOf(type), 0, 7),
        type: type
    })

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await writeFile(path, content)
}

async function createActiveFiles(type: string, colorBody: string) {
    const colorPattern = "yellow"

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/active.json`
    const content = getActiveContent({
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    })
    await writeFile(path, content)
}

async function generatePatternFiles(params: {
    type: string,
    colorBody: string,
    colorPattern: string,
    variantObj: { key: string, value: Variant }
}) {
    const criteriaItem: Criteria = {
        [params.variantObj.key]: params.variantObj.value
    }

    const colorPatternIndex = colors.indexOf(params.colorPattern)
    let parent = params.type
    if (colorPatternIndex == 0) {
        parent = `${parent}/body_${params.colorBody}`
    } else {
        const previousColor = colors[colorPatternIndex - 1]
        parent = `${parent}/${params.colorBody}/pattern_${previousColor}`
    }

    const content = getParentRewardsTemplate({
        bodyColor: params.colorBody,
        modelData: calculateModelData(types.indexOf(params.type), colors.indexOf(params.colorBody), colorPatternIndex),
        parent: parent,
        patternColor: params.colorPattern,
        type: params.type
    })

    content.criteria = criteriaItem

    const path = `${getAdvancementsPathBodyColor(params.type, params.colorBody)}/pattern_${params.colorPattern}.json`
    await writeFile(path, content)
}

async function generateGlobalFile(allTypesVariants: {
    [type: string]: { key: string, value: Variant }[]
}) {
    const promises: Promise<void>[] = []

    const path = `${getAdvancementsPath()}/global.json`
    const content = getMainTemplate_GlobalFile()
    let lastParent = "global"

    for (const type of Object.keys(allTypesVariants)) {
        const typePath = `${getAdvancementsPath()}/global_${type}.json`
        const typeContent = getParentTemplate_globalFile({
            modelData: calculateModelData(types.indexOf(type), 0, 7),
            parent: lastParent,
            type: type
        })

        for (const variant of allTypesVariants[type]) {
            content.criteria[variant.key] = variant.value
            typeContent.criteria[variant.key] = variant.value
        }

        promises.push(writeFile(typePath, typeContent))

        lastParent = `global_${type}`
    }

    promises.push(writeFile(`${getAdvancementsPath()}/global_tick.json`, {
        "criteria": {"active": {"trigger": "minecraft:tick"}},
        "parent": `${getDatapackName()}:${lastParent}`
    }))
    promises.push(writeFile(path, content))
    await Promise.all(promises)
}