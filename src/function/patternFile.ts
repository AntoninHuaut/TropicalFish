import {colors, getDatapackFunctionPath, getDatapackName, writeStringFile} from "../utils/pack.ts"
import {formatString} from "../advancement/utils.ts"

const TEMPLATE = `advancement grant @s only ${getDatapackName()}:%TYPE%/%BODY_COLOR%/active`

export default async function generateFunctionFile(type: string) {
    const path = `${getDatapackFunctionPath()}/${type}.mcfunction`
    let content = ""

    for (const colorBody of colors) {
        content += formatString(TEMPLATE, {
            type: type,
            colorBody: colorBody
        }) + "\n"
    }

    await writeStringFile(path, content.trim())
}