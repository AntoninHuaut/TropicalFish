import { emptyDir } from "https://deno.land/std/fs/mod.ts"
import "https://deno.land/x/dotenv/load.ts";

const DATAPACK_NAME = Deno.env.get("DATAPACK_NAME")
const PATH = "pack/"
const PATH_ADVANCEMENTS = PATH + `data/${DATAPACK_NAME}/advancements/`
try {
    await Deno.remove('pack', { recursive: true })
} catch (_ignore) { /**/ }
await emptyDir(PATH_ADVANCEMENTS)

await Deno.writeTextFile(PATH + "pack.mcmeta", JSON.stringify({
    "pack": {
        "pack_format": 8,
        "description": "Tropical Fish Datapack"
    }
}, null, 2))

const TEMPLATE = {
    "display": {
        "title": "Tropical fish",
        "description": "",
        "icon": {
            "item": "minecraft:tropical_fish"
        },
        "background": "minecraft:textures/block/gray_concrete.png",
        "show_toast": true,
        "announce_to_chat": true
    }
}

const promises = []

function saveAdvancement(fileName, content) {
    promises.push(Deno.writeTextFile(PATH_ADVANCEMENTS + fileName, JSON.stringify(content, null, 2)))
}

const TEMPLATE_ROOT = { ...TEMPLATE }
TEMPLATE_ROOT['criteria'] = {
    "requirement": {
        "trigger": "minecraft:tick"
    }
}

saveAdvancement("root.json", TEMPLATE_ROOT)

const TEMPLATE_GLOBAL = { ...TEMPLATE }
TEMPLATE_GLOBAL['parent'] = `${DATAPACK_NAME}:root`

for (let size = 0; size <= 1; size++) {
    for (let pattern = 0; pattern <= 5; pattern++) {
        for (let colorBody = 0; colorBody <= 15; colorBody++) {
            for (let colorPattern = 0; colorPattern <= 15; colorPattern++) {
                const variant = (colorPattern << 24) | (colorBody << 16) | (pattern << 8) | size

                const TEMPLATE_NBT = { ...TEMPLATE_GLOBAL }
                TEMPLATE_NBT['display']['icon']['nbt'] = `{BucketVariantTag: ${variant}}`
                TEMPLATE_NBT['display']['description'] = `Variant n°${variant}`
                TEMPLATE_NBT['criteria'] = {
                    "requirement": {
                        "trigger": "minecraft:inventory_changed",
                        "conditions": {
                            "items": [{
                                "items": ["minecraft:tropical_fish_bucket"],
                                "nbt": `{BucketVariantTag: ${variant}}`
                            }]
                        }
                    }
                }

                promises.push(saveAdvancement(`variant_${variant}.json`, TEMPLATE_NBT))
            }
        }
    }
}

await Promise.all(promises)
console.log("Generated datapack folder, zip the contents of the pack/ folder to turn it into a datapack")