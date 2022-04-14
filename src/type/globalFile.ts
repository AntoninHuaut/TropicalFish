import {MainFile, Variant, ParentFile} from "./IJson.ts"
import {getAdvancementsPath, getDatapackName, types, writeFile} from "../pack.ts"
import {calculateModelData} from "../variant.ts"

const TEMPLATE: MainFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket",
            "nbt": "{}"
        },
        "title": "Les petits poissons dans l'eau ...",
        "description": "Récupérer tous les poissons",
        "background": "minecraft:textures/block/tube_coral_block.png",
        "frame": "challenge",
        "show_toast": true,
        "announce_to_chat": true,
        "hidden": false
    },
    "criteria": {
        // FILL
    },
    "rewards": {
        "function": `${getDatapackName()}:global_reward`
    }
}

// Duplicate an achievement to show the progress in the global tab
const TYPE_TEMPLATE: ParentFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket",
            "nbt": "{CustomModelData: %MODELDATA%}"
        },
        "title": "Les petits %TYPE% dans l'eau ...",
        "description": "Récupérer toutes les sortes de %TYPE%",
        "background": "minecraft:textures/block/tube_coral_block.png",
        "frame": "goal",
        "show_toast": false,
        "announce_to_chat": false,
        "hidden": false
    },
    "parent": `${getDatapackName()}:global`,
    "criteria": {
        // FILL
    }
}

function convertString(str: string, type: string) {
    return str.replace(/%TYPE%/g, type)
}

export default async function generateGlobalFile(allTypesVariants: { [type: string]: { key: string, value: Variant }[] }) {
    const promises: Promise<void>[] = []

    const path = `${getAdvancementsPath()}/global.json`
    const content: MainFile = JSON.parse(JSON.stringify(TEMPLATE))
    let lastParent = "global"

    for (const type of Object.keys(allTypesVariants)) {
        const typePath = `${getAdvancementsPath()}/global_${type}.json`
        const typeContent: ParentFile = JSON.parse(JSON.stringify(TYPE_TEMPLATE))
        const modelData: string = "" + calculateModelData(types.indexOf(type), 0, 7)

        typeContent.display.icon.nbt = typeContent.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
        typeContent.display.title = convertString(typeContent.display.title, type)
        typeContent.display.description = convertString(typeContent.display.description, type)
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