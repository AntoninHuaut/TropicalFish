import { copy } from "https://deno.land/std/fs/mod.ts"
import generatesFiles from "./advancement/mod.ts"
import { generateFolders, DATAPACK_FOLDER_PATH, RESOURCEPACK_FOLDER_PATH } from "./utils/pack.ts"
import initTextures from "./texture/mod.ts"
import generatesFunctionFiles from "./function/mod.ts"

async function removeIfExists(path: string) {
    try {
        await Deno.stat(path);
        await Deno.remove(path, { recursive: true })
    } catch (_e) {
        // Ignore
    }
}

await removeIfExists(DATAPACK_FOLDER_PATH)
await removeIfExists(RESOURCEPACK_FOLDER_PATH)

await generateFolders()
await copy("./static/textures", `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/textures`)
await copy("./static/lang", `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/lang`)
await initTextures()
await generatesFiles()
await generatesFunctionFiles()

console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")