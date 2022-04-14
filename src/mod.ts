import generatesFiles from "./advancement/mod.ts"
import {generateFolders, generateLoad} from "./pack.ts"
import initTexture from "./emptyTexture.ts"
import generatesFunctionFiles from "./function/mod.ts";

try {
    await Deno.remove('pack', {recursive: true})
} catch (_ignore) { /**/
}

await generateFolders()
await initTexture() // TODO TEMPORARY
await generateLoad()
await generatesFiles()
await generatesFunctionFiles()

console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")