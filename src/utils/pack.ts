import { ensureDir } from "https://deno.land/std/fs/mod.ts"
import { colors, types } from "./variant.ts";
import { config } from "../config.ts";

export const DATAPACK_FOLDER_PATH = "datapack"
export const RESOURCEPACK_FOLDER_PATH = "resourcepack"

export async function generateFolders() {
    const promises: Promise<void>[] = []
    for (const type of types) {
        for (const color of colors) {
            const path = getAdvancementsPathBodyColor(type, color)
            promises.push(ensureDir(path))
        }
    }
    promises.push(ensureDir(getMinecraftFunctionPath()), ensureDir(getDatapackFunctionPath()))

    for (const type of types) {
        const modelsPathType = `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/models/item/${type}/`

        for (const colorBody of colors) {
            const modelPathTypeColorBody = `${modelsPathType}/${colorBody}/`
            promises.push(ensureDir(modelPathTypeColorBody))
        }
    }

    await Promise.all(promises)
}

export async function writeFile(path: string, content: object) {
    let stringify: string;
    if (config.jsonMinified) {
        stringify = JSON.stringify(content)
    } else {
        stringify = JSON.stringify(content, null, 2)
    }
    await writeStringFile(path, stringify)
}

export async function writeStringFile(path: string, content: string) {
    await Deno.writeTextFile(path, content)
}

export function getDatapackName(): string {
    return config.datapackTechName
}

export function getMinecraftFunctionPath() {
    return `${DATAPACK_FOLDER_PATH}/data/minecraft/tags/functions`
}

export function getDatapackFunctionPath() {
    return `${DATAPACK_FOLDER_PATH}/data/${getDatapackName()}/functions`
}

export function getAdvancementsPath() {
    return `${DATAPACK_FOLDER_PATH}/data/${getDatapackName()}/advancements`
}

export function getAdvancementsPathType(type: string) {
    return `${getAdvancementsPath()}/${type}`
}

export function getAdvancementsPathBodyColor(type: string, color: string) {
    return `${getAdvancementsPathType(type)}/${color}`
}

export function getGlobalRewardFileName() {
    return "global_reward"
}