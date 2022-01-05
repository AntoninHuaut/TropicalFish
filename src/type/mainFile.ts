import {getPathType} from "../pack.ts"
import {MainFile, Variant} from "./IJson.ts"

const TEMPLATE: MainFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket"
        },
        "title": "Les petits %TYPE% dans l'eau ...",
        "description": "Récupérer toutes les sortes de %TYPE%",
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

function convertString(str: string, type: string) {
    return str.replace(/%TYPE%/g, type)
}

export default async function generateMainFile(type: string, typesVariants: { key: string, value: Variant }[]) {
    const path = `${getPathType(type)}/main.json`

    const content: MainFile = JSON.parse(JSON.stringify(TEMPLATE))
    content.display.title = convertString(content.display.title, type)
    content.display.description = convertString(content.display.description, type)

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await Deno.writeTextFile(path, JSON.stringify(content, null, 2)) // TODO remove null 2
}