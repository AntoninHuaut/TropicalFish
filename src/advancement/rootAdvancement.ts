import { RootFishAdvancement } from "../interface/IRootAdvancement.ts"
import { saveAdvancement } from "../pack.ts"

const TEMPLATE: RootFishAdvancement = {
    "display": {
        "title": "Tropical fish",
        "description": "",
        "icon": {
            "item": "minecraft:tropical_fish"
        },
        "background": "minecraft:textures/block/gray_concrete.png",
        "show_toast": true,
        "announce_to_chat": true
    },
    "criteria": {
        "requirement": {
            "trigger": "minecraft:tick"
        }
    }
}

export default async function createRootAdvancement(): Promise<void> {
    await saveAdvancement("root.json", JSON.stringify(TEMPLATE, null, 2))
}