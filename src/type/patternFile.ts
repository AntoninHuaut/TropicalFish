import {getDatapackName, getPathBodyColor} from "../pack.ts"
import {Criteria, ParentRewardsFile, Variant} from "./IJson.ts"

const TEMPLATE: ParentRewardsFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:%COLOR%_wool"
        },
        "title": "Tout %COLOR%",
        "description": "Récupérer un %TYPE% %BODY_COLOR%, rayais %PATTERN_COLOR%",
        "frame": "task",
        "show_toast": true,
        "announce_to_chat": false,
        "hidden": false
    },
    "parent": "au_tropique:%TYPE%/body_%BODY_COLOR%",
    "criteria": {
        // FILL
    },
    "rewards": {
        "function": `${getDatapackName()}:%TYPE%`
    }
}

function convertString(str: string, type: string, colorBody: string, colorPattern: string) {
    return str.replace(/%TYPE%/g, type)
        .replace(/%BODY_COLOR%/g, colorBody)
        .replace(/%PATTERN_COLOR%/g, colorPattern)
}

export default async function generatePatternFiles(type: string, colorBody: string, colorPattern: string, variantObj: { key: string, value: Variant }) {
    const criteriaItem: Criteria = {
        [variantObj.key]: variantObj.value
    }

    const content: ParentRewardsFile = JSON.parse(JSON.stringify(TEMPLATE))

    content.display.icon.item = convertString(content.display.icon.item, type, colorBody, colorPattern)
    content.display.title = convertString(content.display.title, type, colorBody, colorPattern)
    content.display.description = convertString(content.display.description, type, colorBody, colorPattern)
    content.parent = convertString(content.parent, type, colorBody, colorPattern)
    content.rewards.function = convertString(content.rewards.function, type, colorBody, colorPattern)
    content.criteria = criteriaItem

    const path = `${getPathBodyColor(type, colorBody)}/pattern_${colorPattern}.json`
    await Deno.writeTextFile(path, JSON.stringify(content, null, 2)) // TODO remove null 2
}