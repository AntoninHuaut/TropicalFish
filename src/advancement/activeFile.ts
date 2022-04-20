import {getAdvancementsPathBodyColor, getDatapackName, writeFile} from "../utils/pack.ts"
import {ActiveFile} from "./IJson.ts"
import {formatString} from "./utils.ts"
import {getActiveTemplate} from "./advancementFactory.ts";

export default async function generateActiveFile(type: string, colorBody: string) {
    const colorPattern = "yellow"
    const content: ActiveFile = getActiveTemplate()

    content.parent = formatString(content.parent, {
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    })

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/active.json`
    await writeFile(path, content)
}