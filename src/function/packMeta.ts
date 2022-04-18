import {PATH_PACK, writeStringFile} from "../pack.ts"

const content: string = JSON.stringify({
    "pack": {
        "author": {
            "translate": "global.author"
        },
        "pack_format": 8,
        "description": {
            "translate": "global.author"
        }
    }
}, null, 2)

export async function generatePackMeta() {
    const path = `${PATH_PACK}/pack.mcmeta`
    await writeStringFile(path, content.trim())
}