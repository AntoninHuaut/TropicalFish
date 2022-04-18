import {getAdvancementsPathType, types, writeFile} from "../pack.ts"
import {MainFile, Variant} from "./IJson.ts"
import {calculateModelData} from "../variant.ts"
import {formatTranslateKey} from "./utils.ts"

const TEMPLATE: MainFile = {
    "author": {
        "translate": "global.author"
    },
    "display": {
        "icon": {
            "item": "minecraft:tropical_fish_bucket",
            "nbt": "{CustomModelData: %MODELDATA%}"
        },
        "title": {
            "translate": "advancement.catch.type.title",
            "with": [{
                "translate": "fish.type.%TYPE%"
            }]
        },
        "description": {
            "translate": "advancement.catch.type.description",
            "with": [{
                "translate": "fish.type.%TYPE%"
            }]
        },
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

export default async function generateMainFile(type: string, typesVariants: { key: string, value: Variant }[]) {
    const path = `${getAdvancementsPathType(type)}/main.json`
    const modelData: string = "" + calculateModelData(types.indexOf(type), 0, 7)

    const content: MainFile = JSON.parse(JSON.stringify(TEMPLATE))
    content.display.icon.nbt = content.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
    content.display.title = formatTranslateKey(content.display.title, {type: type})
    content.display.description = formatTranslateKey(content.display.description, {type: type})

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await writeFile(path, content)
}