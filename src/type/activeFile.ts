import {getDatapackName, getPathBodyColor} from "../pack.ts"
import {ActiveRoot} from "./IJson.ts"

const TEMPLATE: ActiveRoot = {
    "author": "EclairDeFeu360 & Maner",
    "parent": "au_tropique:%TYPE%/%BODY_COLOR%/pattern_%PATTERN_COLOR%",
    "criteria": {
        "active": {
            "trigger": "minecraft:impossible"
        }
    }
}

function convertString(str: string, type: string, colorBody: string, colorPattern: string) {
    return str.replace(/%TYPE%/g, type)
        .replace(/%BODY_COLOR%/g, colorBody)
        .replace(/%PATTERN_COLOR%/g, colorPattern)
}

export default async function generateActiveFile(type: string, colorBody: string) {
    const colorPattern = "yellow"
    const content: ActiveRoot = JSON.parse(JSON.stringify(TEMPLATE))

    content.parent = convertString(content.parent, type, colorBody, colorPattern)

    const path = `${getPathBodyColor(type, colorBody)}/active.json`
    await Deno.writeTextFile(path, JSON.stringify(content, null, 2)) // TODO remove null 2
}