import { FishAdvancement } from "../interface/IFishAdvancement.ts"
import { saveAdvancement, getDatapackName } from "../pack.ts"
import getVariantList from "../variant.ts"

const TEMPLATE: FishAdvancement = {
    "display": {
        "title": "Tropical fish",
        "description": "{BucketVariantTag: 0}",
        "icon": {
            "item": "minecraft:tropical_fish",
            "nbt": "{BucketVariantTag: 0}"
        },
        "background": "minecraft:textures/block/gray_concrete.png",
        "show_toast": true,
        "announce_to_chat": true
    },
    "parent": `${getDatapackName()}:root`,
    "criteria": {
        "requirement": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [{
                    "items": ["minecraft:tropical_fish_bucket"],
                    "nbt": "{BucketVariantTag: 0}"
                }]
            }
        }
    }
}

function createFishAdvancement(variant: number): Promise<void> {
    const fishAdvancement = { ...TEMPLATE }

    fishAdvancement.display.description = `Variant n°${variant}`
    fishAdvancement.display.icon.nbt = `{BucketVariantTag: ${variant}}`
    fishAdvancement.criteria.requirement.conditions.items[0].nbt = `{BucketVariantTag: ${variant}}`

    return saveAdvancement(`variant_${variant}.json`, JSON.stringify(fishAdvancement, null, 2))
}

export default async function createAllFishAdvancements(): Promise<void> {
    const promises: Promise<void>[] = []
    for (const variant of getVariantList()) {
        promises.push(createFishAdvancement(variant))
    }
    await Promise.all(promises);
}