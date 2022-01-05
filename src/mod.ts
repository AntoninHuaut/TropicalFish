import {copy} from "https://deno.land/std/fs/copy.ts"
import generatesFiles from "./type/mod.ts"
import {generateFolders, generateLoad, PATH_PACK, PATH_TEMPLATE} from "./pack.ts"

try {
    await Deno.remove('pack', {recursive: true})
} catch (_ignore) { /**/
}

await copy(PATH_TEMPLATE, PATH_PACK)
await generateFolders()
await generateLoad()
await generatesFiles()

console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")