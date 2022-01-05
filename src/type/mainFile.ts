import {getPathType, types, writeFile} from "../pack.ts"
import {MainFile, Variant} from "./IJson.ts"
import {calculModelData} from "../variant.ts"

const TEMPLATE: MainFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket",
            "nbt": "{CustomModelData: %MODELDATA%}"
        },
        "title": "Les petits %TYPE% dans l'eau ...",
        "description": "Récupérer toutes les sortes de %TYPE%",
        "background": "minecraft:textures/block/tube_coral_block.png",
        "frame": "challenge",
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
    const modelData: string = "" + calculModelData(types.indexOf(type), 0, 7)

    const content: MainFile = JSON.parse(JSON.stringify(TEMPLATE))
    content.display.icon.nbt = content.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
    content.display.title = convertString(content.display.title, type)
    content.display.description = convertString(content.display.description, type)

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await writeFile(path, content)
}