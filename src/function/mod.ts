import {
    getDatapackFunctionPath,
    getDatapackName,
    getGlobalRewardFileName,
    getTypeRewardFileName,
    DATAPACK_FOLDER_PATH,
    RESOURCEPACK_FOLDER_PATH,
    writeStringFile
} from "../utils/pack.ts"
import generateLoadFiles from "./loadFiles.ts"
import { colors, types } from "../utils/variant.ts";
import { config } from "../config.ts";

export default async function generatesFunctionFiles() {
    const promises: Promise<void>[] = []
    types.forEach((type) => promises.push(generateFunctionFile(type)))
    promises.push(generateRewards())
    promises.push(generateLoadFiles())
    promises.push(generatePackMeta())
    await Promise.all(promises)
}

async function generateRewards() {
    await writeStringFile(`${getDatapackFunctionPath()}/${getGlobalRewardFileName()}.mcfunction`, config.globalRewardCommands.join('\n').trim())
    await writeStringFile(`${getDatapackFunctionPath()}/${getTypeRewardFileName()}.mcfunction`, config.typeRewardCommands.join('\n').trim())
}

async function generatePackMeta() {
    await writeStringFile(`${DATAPACK_FOLDER_PATH}/pack.mcmeta`, JSON.stringify({
        "pack": {
            "description": config.i18nName,
            "pack_format": config.datapackFormat
        }
    }, null, 2).trim())
    await writeStringFile(`${RESOURCEPACK_FOLDER_PATH}/pack.mcmeta`, JSON.stringify({
        "pack": {
            "description": config.i18nName,
            "pack_format": config.resourcepackFormat
        }
    }, null, 2).trim())
}

async function generateFunctionFile(type: string) {
    const getAdvancementCmd = (config: {
        type: string,
        bodyColor: string
    }) => `advancement grant @s only ${getDatapackName()}:${config.type}/${config.bodyColor}/active`

    const path = `${getDatapackFunctionPath()}/${type}.mcfunction`
    let content = ""

    for (const bodyColor of colors) {
        content += getAdvancementCmd({
            type: type,
            bodyColor: bodyColor
        }) + "\n"
    }

    await writeStringFile(path, content.trim())
}