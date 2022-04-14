import {
    colors,
    getAdvancementsPathType,
    getDatapackFunctionPath,
    getDatapackName,
    types,
    writeFile,
    writeStringFile
} from "../pack.ts"
import {MainFile, Variant} from "../advancement/IJson.ts"
import {calculateModelData} from "../variant.ts"

const TEMPLATE: string = `advancement grant @s only ${getDatapackName()}:%TYPE%/%BODY_COLOR%/active`

function convertString(str: string, type: string, colorBody: string) {
    return str.replace(/%TYPE%/g, type).replace(/%BODY_COLOR%/g, colorBody)
}

export default async function generateFunctionFile(type: string) {
    const path = `${getDatapackFunctionPath()}/${type}.mcfunction`
    let content: string = ""

    for (const colorBody of colors) {
        content += convertString(TEMPLATE, type, colorBody) + "\n"
    }

    await writeStringFile(path, content.trim())
}