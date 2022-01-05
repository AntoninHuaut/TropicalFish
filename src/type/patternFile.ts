import {colors, getDatapackName, getPathBodyColor} from "../pack.ts"
import {Criteria, ParentRewardsFile, Variant} from "./IJson.ts"

const TEMPLATE: ParentRewardsFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:%PATTERN_COLOR%_wool"
        },
        "title": "%BODY_COLOR% %PATTERN_COLOR%",
        "description": "Récupérer un %TYPE% %BODY_COLOR%, rayais %PATTERN_COLOR%",
        "frame": "task",
        "show_toast": true,
        "announce_to_chat": false,
        "hidden": false
    },
    "parent": "au_tropique:%TYPE%",
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
    content.rewards.function = convertString(content.rewards.function, type, colorBody, colorPattern)
    content.criteria = criteriaItem

    const colorPatternIndex = colors.indexOf(colorPattern)
    if (colorPatternIndex == 0) {
        content.parent = convertString(`${content.parent}/body_${colorBody}`, type, colorBody, colorPattern)
    } else {
        const previousColor = colors[colorPatternIndex - 1]
        content.parent = convertString(`${content.parent}/${colorBody}/pattern_${previousColor}`, type, colorBody, colorPattern)
    }

    const path = `${getPathBodyColor(type, colorBody)}/pattern_${colorPattern}.json`
    await Deno.writeTextFile(path, JSON.stringify(content))
}