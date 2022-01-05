import {ensureDir} from "https://deno.land/std/fs/mod.ts"
import "https://deno.land/x/dotenv/load.ts"

export const PATH_PACK = "pack/"
export const PATH_TEMPLATE = "template/"

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

export function getDatapackName(): string {
    return Deno.env.get("DATAPACK_NAME") ?? 'au_tropique'
}

export function getFunctionPath() {
    return `${PATH_PACK}/data/minecraft/tags/functions`
}

export function getAdvancementsPath() {
    return `${PATH_PACK}/data/${getDatapackName()}/advancements`
}

export function getPathType(type: string) {
    return `${getAdvancementsPath()}/${type}`
}

export function getPathBodyColor(type: string, color: string) {
    return `${getPathType(type)}/${color}`
}

export async function generateFolders() {
    const promises: Promise<void>[] = []
    for (const type of types) {
        for (const color of colors) {
            const path = getPathBodyColor(type, color)
            promises.push(ensureDir(path))
        }
    }
    promises.push(ensureDir(getFunctionPath()))
    await Promise.all(promises)
}

export async function generateLoad() {
    await Deno.writeTextFile(`${getFunctionPath()}/load.json`, JSON.stringify({"values": [`${getDatapackName()}:load`]}))
}