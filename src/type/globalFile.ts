import { MainFile, Variant, ParentFile } from "./IJson.ts";
import { getAdvancementsPath, getDatapackName } from "../pack.ts";

const TEMPLATE: MainFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket"
        },
        "title": "Les petits poissons dans l'eau ...",
        "description": "Récupérer tous les poissons",
        "background": "minecraft:textures/block/tube_coral_block.png",
        "frame": "goal",
        "show_toast": true,
        "announce_to_chat": true,
        "hidden": false
    },
    "criteria": {
        // FILL
    }
}

// Duplicate an achievement to show the progress in the global tab
const TYPE_TEMPLATE: ParentFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket"
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
    const path = `${getAdvancementsPath()}/global.json`
    const content: MainFile = JSON.parse(JSON.stringify(TEMPLATE))

    for (const type of Object.keys(allTypesVariants)) {
        const typePath = `${getAdvancementsPath()}/global_${type}.json`
        const typeContent: ParentFile = JSON.parse(JSON.stringify(TYPE_TEMPLATE))

        typeContent.display.title = convertString(typeContent.display.title, type)
        typeContent.display.description = convertString(typeContent.display.description, type)

        for (const variant of allTypesVariants[type]) {
            content.criteria[variant.key] = variant.value
            typeContent.criteria[variant.key] = variant.value
        }

        await Deno.writeTextFile(typePath, JSON.stringify(typeContent, null, 2)) // TODO remove null 2
    }

    await Deno.writeTextFile(path, JSON.stringify(content, null, 2)) // TODO remove null 2
}