import {ensureDir} from "https://deno.land/std/fs/mod.ts"
import "https://deno.land/x/dotenv/load.ts"

export const PATH_PACK = "pack"

export const types: string[] = ["betty", "blockfish", "brinely", "clayfish", "dasher", "flopper", "glitter", "kob", "snooper", "spotty", "stripey", "sunstreak"]
export const typesMapping: Record<string, [number, number]> = { // first least byte / second-least byte : https://minecraft.fandom.com/wiki/Tropical_Fish (Entity data)
    "betty": [1, 4],
    "blockfish": [1, 3],
    "brinely": [0, 4],
    "clayfish": [1, 5],
    "dasher": [0, 3],
    "flopper": [1, 0],
    "glitter": [1, 2],
    "kob": [0, 0],
    "snooper": [0, 2],
    "spotty": [0, 5],
    "stripey": [1, 1],
    "sunstreak": [0, 1]
}
// black : Not found naturally
export const colors: string[] = ["blue", "brown", "cyan", "gray", "green", "light_blue", "light_gray", "lime", "magenta", "orange", "pink", "purple", "red", "white", "yellow"]
export const colorsMapping: Record<string, number> = {
    "blue": 11,
    "brown": 12,
    "cyan": 9,
    "gray": 7,
    "green": 13,
    "light_blue": 3,
    "light_gray": 8,
    "lime": 5,
    "magenta": 2,
    "orange": 1,
    "pink": 6,
    "purple": 10,
    "red": 14,
    "white": 0,
    "yellow": 4
}

export async function writeFile(path: string, content: object) {
    let stringify: string;
    if (Deno.env.get("JSON_MINIFIED") === "true") {
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
    return Deno.env.get("DATAPACK_NAME") ?? 'au_tropique'
}

export function getDisplayDatapackName(): string {
    return getDatapackName()
        .replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

export function getMinecraftFunctionPath() {
    return `${PATH_PACK}/data/minecraft/tags/functions`
}

export function getDatapackFunctionPath() {
    return `${PATH_PACK}/data/${getDatapackName()}/functions`
}

export function getAdvancementsPath() {
    return `${PATH_PACK}/data/${getDatapackName()}/advancements`
}

export function getAdvancementsPathType(type: string) {
    return `${getAdvancementsPath()}/${type}`
}

export function getAdvancementsPathBodyColor(type: string, color: string) {
    return `${getAdvancementsPathType(type)}/${color}`
}

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
        const modelsPathType = `${PATH_PACK}/assets/minecraft/models/item/${type}/`

        for (const colorBody of colors) {
            const modelPathTypeColorBody = `${modelsPathType}/${colorBody}/`
            promises.push(ensureDir(modelPathTypeColorBody))
        }
    }

    await Promise.all(promises)
}