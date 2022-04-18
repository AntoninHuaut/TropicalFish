import {getAdvancementsPathBodyColor, getDatapackName, writeFile} from "../pack.ts"
import {ActiveFile} from "./IJson.ts"
import {formatString} from "./utils.ts"

const TEMPLATE: ActiveFile = {
    "author": {
        "translate": "global.author"
    },
    "parent": `${getDatapackName()}:%TYPE%/%BODY_COLOR%/pattern_%PATTERN_COLOR%`,
    "criteria": {
        "active": {
            "trigger": "minecraft:impossible"
        }
    }
}

export default async function generateActiveFile(type: string, colorBody: string) {
    const colorPattern = "yellow"
    const content: ActiveFile = JSON.parse(JSON.stringify(TEMPLATE))

    content.parent = formatString(content.parent, {
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    })

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/active.json`
    await writeFile(path, content)
}