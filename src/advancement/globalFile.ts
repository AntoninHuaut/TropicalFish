import {MainFile, ParentFile, Variant} from "./IJson.ts"
import {getAdvancementsPath, getDatapackName, types, writeFile} from "../utils/pack.ts"
import {calculateModelData} from "../utils/variant.ts"
import {formatTranslateKey} from "./utils.ts"
import {getMainTemplate_GlobalFile, getParentTemplate_globalFile} from "./advancementFactory.ts";

export default async function generateGlobalFile(allTypesVariants: { [type: string]: { key: string, value: Variant }[] }) {
    const promises: Promise<void>[] = []

    const path = `${getAdvancementsPath()}/global.json`
    const content: MainFile = getMainTemplate_GlobalFile()
    let lastParent = "global"

    for (const type of Object.keys(allTypesVariants)) {
        const typePath = `${getAdvancementsPath()}/global_${type}.json`
        const typeContent: ParentFile = getParentTemplate_globalFile()
        const modelData: string = "" + calculateModelData(types.indexOf(type), 0, 7)

        typeContent.display.icon.nbt = typeContent.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
        typeContent.display.title = formatTranslateKey(typeContent.display.title, {type: type})
        typeContent.display.description = formatTranslateKey(typeContent.display.description, {type: type})
        typeContent.parent = `${getDatapackName()}:${lastParent}`

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