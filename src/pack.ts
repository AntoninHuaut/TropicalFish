import { emptyDir } from "https://deno.land/std/fs/mod.ts"
import "https://deno.land/x/dotenv/load.ts";

const DATAPACK_NAME: string = Deno.env.get("DATAPACK_NAME") ?? 'fish'
const PATH = "pack/"
const PATH_ADVANCEMENTS = PATH + `data/${DATAPACK_NAME}/advancements/`

function getPathAdvancements(): string {
    return PATH_ADVANCEMENTS
}

export function getDatapackName(): string {
    return DATAPACK_NAME
}

export async function saveAdvancement(fileName: string, content: string): Promise<void> {
    await Deno.writeTextFile(getPathAdvancements() + fileName, content)
}

export async function initPackFolder() {
    try {
        await Deno.remove('pack', { recursive: true })
    } catch (_ignore) { /**/
    }
    await emptyDir(PATH_ADVANCEMENTS)

    await Deno.writeTextFile(PATH + "pack.mcmeta", JSON.stringify({
        "pack": {
            "pack_format": 8,
            "description": "Tropical Fish Datapack"
        }
    }, null, 2))
}