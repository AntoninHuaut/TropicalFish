import {colors, getDatapackFunctionPath, getDatapackName, writeStringFile} from "../utils/pack.ts"

const getCommands = (config: {
    type: string,
    bodyColor: string
}) => `advancement grant @s only ${getDatapackName()}:${config.type}/${config.bodyColor}/active`

export default async function generateFunctionFile(type: string) {
    const path = `${getDatapackFunctionPath()}/${type}.mcfunction`
    let content = ""

    for (const bodyColor of colors) {
        content += getCommands({
            type: type,
            bodyColor: bodyColor
        }) + "\n"
    }

    await writeStringFile(path, content.trim())
}