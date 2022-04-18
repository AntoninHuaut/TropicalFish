import {copy} from "https://deno.land/std/fs/copy.ts"
import generatesFiles from "./advancement/mod.ts"
import {generateFolders, PATH_PACK} from "./pack.ts"
import initTexture from "./models.ts"
import generatesFunctionFiles from "./function/mod.ts"

try {
    await Deno.remove('pack', {recursive: true})
} catch (_ignore) { /**/
}

await generateFolders()
await copy("./static/textures", `${PATH_PACK}/assets/minecraft/textures`)
await copy("./static/lang", `${PATH_PACK}/assets/minecraft/lang`)
await initTexture()
await generatesFiles()
await generatesFunctionFiles()

console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")