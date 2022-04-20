import {getDatapackName} from "../utils/pack.ts";
import {NewCriteria, NewDisplay} from "./NewIJson.ts";
import {getGlobalRewardFileName} from "../function/globalRewardFile.ts";

export class AdvancementFactory {

    private json: Record<string, any> = {
        author: {
            translate: "global.author"
        }
    }

    criteria(criteria: NewCriteria): this {
        this.json.criteria = criteria
        return this
    }

    display(display: NewDisplay): this {
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
TODO RENAME ALL METHODS
 */

export function getActiveTemplate(config: {
    type: string,
    colorBody: string,
    colorPattern: string
}) {
    return new AdvancementFactory()
        .parent(`${config.type}/${config.colorBody}/pattern_${config.colorPattern}`)
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

export function getParentTemplate_globalFile(config: {
    modelData: number,
    parent: string,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: {
                    CustomModelData: config.modelData
                }
            },
            title: {
                translate: "advancement.catch.type.title",
                with: [{
                    translate: `fish.type.${config.type}`
                }]
            },
            description: {
                translate: "advancement.catch.type.description",
                with: [{
                    translate: `fish.type.${config.type}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "goal",
            show_toast: false,
            announce_to_chat: false,
            hidden: false
        })
        .parent(config.parent)
        .rewards(getGlobalRewardFileName())
        .get()
}

export function getMainTemplate_MainFile(config: {
    modelData: number,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: {
                    CustomModelData: config.modelData
                }
            },
            title: {
                translate: "advancement.catch.type.title",
                with: [{
                    translate: `fish.type.${config.type}`
                }]
            },
            description: {
                translate: "advancement.catch.type.description",
                with: [{
                    translate: `fish.type.${config.type}`
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

export function getParentTemplate_mod(config: {
    bodyColor: string,
    modelData: number,
    type: string
}) {
    return new AdvancementFactory()
        .criteria({})
        .display({
            icon: {
                item: "minecraft:tropical_fish_bucket",
                nbt: {
                    CustomModelData: config.modelData
                }
            },
            title: {
                translate: "advancement.catch.type_bodyColor.title",
                with: [{
                    translate: `fish.type.${config.type}`
                }, {
                    translate: `fish.color.${config.bodyColor}`
                }]
            },
            description: {
                translate: "advancement.catch.type_bodyColor.description",
                with: [{
                    translate: `fish.type.${config.type}`
                }, {
                    translate: `fish.color.${config.bodyColor}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "goal",
            show_toast: true,
            announce_to_chat: false,
            hidden: false
        })
        .parent(`${config.type}/main`)
        .get()
}

export function getParentRewardsTemplate(config: {
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
                nbt: {
                    CustomModelData: config.modelData
                }
            },
            title: {
                translate: "advancement.catch.type_bodyColor_patternColor.title",
                with: [{
                    translate: `fish.type.${config.type}`
                }, {
                    translate: `fish.color.${config.bodyColor}`
                }, {
                    translate: `fish.color.${config.patternColor}`
                }]
            },
            description: {
                translate: "advancement.catch.type_bodyColor_patternColor.description",
                with: [{
                    translate: `fish.type.${config.type}`
                }, {
                    translate: `fish.color.${config.bodyColor}`
                }, {
                    translate: `fish.color.${config.patternColor}`
                }]
            },
            background: "minecraft:textures/block/tube_coral_block.png",
            frame: "task",
            show_toast: true,
            announce_to_chat: false,
            hidden: false
        })
        .parent(`${config.parent}`)
        .rewards(`${config.type}`) // TODO check rewards may not generated
        .get()
}