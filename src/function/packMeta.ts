import {PATH_PACK, writeStringFile} from "../pack.ts"

const content: string = JSON.stringify({
    "pack": {
        "author":"EclairDeFeu360 & Maner",
        "pack_format": 8,
        "description": "§3Par EclairDeFeu360 & Maner"
    }
}, null, 2)

export async function generatePackMeta() {
    const path = `${PATH_PACK}/pack.mcmeta`
    await writeStringFile(path, content.trim())
}