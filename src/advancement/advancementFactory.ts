import {getDatapackName, getGlobalRewardFileName} from "../utils/pack.ts";
import {Criteria, Display} from "./IJson.ts";

class AdvancementFactory {

    private json: Record<string, any> = {
        author: {
            translate: "global.author"
        }
    }

    criteria(criteria: Criteria): this {
        this.json.criteria = criteria
        return this
    }

    display(display: Display): this {
        this.json.display = display
        return this
    }

    parent(parent: string): this {
        this.json.parent = `${getDatapackName()}:${parent}`
        return this
    }

    rewards(functionStr: string): this {
        this.json.rewards = {
            function: `${getDatapackName()}:${functionStr}`
        }
        return this
    }

    get() {
        return this.json
    }
}

/*
TODO RENAME ALL METHODS AND FILES IN ADVANCEMENTS
 */

export function getActiveTemplate(params: {
    type: string,
    colorBody: string,
    colorPattern: string
}) {
    return new AdvancementFactory()
        .parent(`${params.type}/${params.colorBody}/pattern_${params.colorPattern}`)
        .criteria({
            active: {
                trigger: "minecraft:impossible"
            }
        })
        .get()
}

export function getMainTemplate_GlobalFile() {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket"
            },
            title: {
                translate: "advancement.catch.fish.title"
            },
            description: {
                translate: "advancement.catch.fish.description"
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "challenge",
            show_toast: true,
            announce_to_chat: true,
            hidden: false
        })
        .rewards(getGlobalRewardFileName())
        .get()
}

export function getParentTemplate_globalFile(params: {
    modelData: number,
    parent: string,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: `{ "CustomModelData": ${params.modelData} }`
            },
            title: {
                translate: "advancement.catch.type.title",
                with: [{
                    translate: `fish.type.${params.type}`
                }]
            },
            description: {
                translate: "advancement.catch.type.description",
                with: [{
                    translate: `fish.type.${params.type}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "goal",
            show_toast: false,
            announce_to_chat: false,
            hidden: false
        })
        .parent(params.parent)
        .rewards(getGlobalRewardFileName())
        .get()
}

export function getMainTemplate_MainFile(params: {
    modelData: number,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: `{ "CustomModelData": ${params.modelData} }`
            },
            title: {
                translate: "advancement.catch.type.title",
                with: [{
                    translate: `fish.type.${params.type}`
                }]
            },
            description: {
                translate: "advancement.catch.type.description",
                with: [{
                    translate: `fish.type.${params.type}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "challenge",
            show_toast: true,
            announce_to_chat: true,
            hidden: false
        })
        .get()
}

export function getParentTemplate_mod(params: {
    bodyColor: string,
    modelData: number,
    type: string,
    variantsColor: { color: number, key: string }[]
}) {
    const variants = params.variantsColor.map(variantColor => {
        return {
            [`variant_${variantColor}`]: {
                trigger: "minecraft:inventory_changed",
                conditions: {
                    items: [{
                        items: ["minecraft:tropical_fish_bucket"],
                        nbt: `{BucketVariantTag: ${variantColor}}`
                    }]
                }
            }
        }
    })

    const criteria = {}
    Object.assign(criteria, ...variants)

    return new AdvancementFactory()
        .criteria(criteria)
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: `{ "CustomModelData": ${params.modelData} }`
            },
            title: {
                translate: "advancement.catch.type_bodyColor.title",
                with: [{
                    translate: `fish.type.${params.type}`
                }, {
                    translate: `fish.color.${params.bodyColor}`
                }]
            },
            description: {
                translate: "advancement.catch.type_bodyColor.description",
                with: [{
                    translate: `fish.type.${params.type}`
                }, {
                    translate: `fish.color.${params.bodyColor}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "goal",
            show_toast: true,
            announce_to_chat: false,
            hidden: false
        })
        .parent(`${params.type}/main`)
        .get()
}

export function getParentRewardsTemplate(params: {
    bodyColor: string,
    modelData: number,
    parent: string,
    patternColor: string,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: `{ "CustomModelData": ${params.modelData} }`
            },
            title: {
                translate: "advancement.catch.type_bodyColor_patternColor.title",
                with: [{
                    translate: `fish.type.${params.type}`
                }, {
                    translate: `fish.color.${params.bodyColor}`
                }, {
                    translate: `fish.color.${params.patternColor}`
                }]
            },
            description: {
                translate: "advancement.catch.type_bodyColor_patternColor.description",
                with: [{
                    translate: `fish.type.${params.type}`
                }, {
                    translate: `fish.color.${params.bodyColor}`
                }, {
                    translate: `fish.color.${params.patternColor}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "task",
            show_toast: true,
            announce_to_chat: false,
            hidden: false
        })
        .parent(`${params.parent}`)
        .rewards(`${params.type}`)
        .get()
}