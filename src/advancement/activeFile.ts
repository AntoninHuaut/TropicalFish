import {getAdvancementsPathBodyColor, writeFile} from "../utils/pack.ts"
import {getActiveTemplate} from "./advancementFactory.ts";

export default async function generateActiveFile(type: string, colorBody: string) {
    const colorPattern = "yellow"
    const content = getActiveTemplate({
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    })

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/active.json`
    await writeFile(path, content)
}