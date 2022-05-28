import { copy, compress } from "./deps.ts"
import generatesFiles from "./advancement/mod.ts"
import { generateFolders, DATAPACK_FOLDER_PATH, RESOURCEPACK_FOLDER_PATH } from "./utils/pack.ts"
import { config } from "./config.ts"
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

async function generateZIP(path: string, output: string) {
    const fileNames: string[] = [];
    for await (const dirEntry of Deno.readDir(path)) {
        fileNames.push(path + "/" + dirEntry.name);
    }
    await compress(fileNames, `${config.techName}_${output}.zip`, { overwrite: true })
}

await removeIfExists(DATAPACK_FOLDER_PATH)
await removeIfExists(RESOURCEPACK_FOLDER_PATH)

console.log("Generating datapack folder and resourcepack folder...")

await generateFolders()
await copy("./static/textures", `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/textures`)
await copy("./static/lang", `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/lang`)
await initTextures()
await generatesFiles()
await generatesFunctionFiles()

console.log("Datapack/resourcepack folders have been generated")
console.log("Generating datapack archive and resourcepack archive...")

await Promise.all([
    generateZIP(DATAPACK_FOLDER_PATH, "datapack"),
    generateZIP(RESOURCEPACK_FOLDER_PATH, "resourcepack")
])

console.log("Datapack/resourcepack archives have been generated")