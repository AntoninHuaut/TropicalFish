import {ActiveFile, MainFile, ParentFile, ParentRewardsFile} from "./IJson.ts";
import {getDatapackName} from "../utils/pack.ts";
import {getGlobalRewardFileName} from "../function/globalRewardFile.ts";

export function getActiveTemplate(): ActiveFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "parent": `${getDatapackName()}:%TYPE%/%BODY_COLOR%/pattern_%PATTERN_COLOR%`,
        "criteria": {
            "active": {
                "trigger": "minecraft:impossible"
            }
        }
    }
}

export function getMainTemplate_GlobalFile(): MainFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "display": {
            "icon": {
                "item": "minecraft:tropical_fish_bucket",
                "nbt": "{}"
            },
            "title": {
                "translate": "advancement.catch.fish.title"
            },
            "description": {
                "translate": "advancement.catch.fish.description"
            },
            "background": "minecraft:textures/block/tube_coral_block.png",
            "frame": "challenge",
            "show_toast": true,
            "announce_to_chat": true,
            "hidden": false
        },
        "criteria": {
            // FILL
        },
        "rewards": {
            "function": `${getDatapackName()}:${getGlobalRewardFileName()}`
        }
    }
}

export function getParentTemplate_globalFile(): ParentFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "display": {
            "icon": {
                "item": "minecraft:tropical_fish_bucket",
                "nbt": "{CustomModelData: %MODELDATA%}"
            },
            "title": {
                "translate": "advancement.catch.type.title",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }]
            },
            "description": {
                "translate": "advancement.catch.type.description",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }]
            },
            "background": "minecraft:textures/block/tube_coral_block.png",
            "frame": "goal",
            "show_toast": false,
            "announce_to_chat": false,
            "hidden": false
        },
        "parent": `${getDatapackName()}:global`,
        "criteria": {
            // FILL
        }
    }
}

export function getMainTemplate_MainFile(): MainFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "display": {
            "icon": {
                "item": "minecraft:tropical_fish_bucket",
                "nbt": "{CustomModelData: %MODELDATA%}"
            },
            "title": {
                "translate": "advancement.catch.type.title",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }]
            },
            "description": {
                "translate": "advancement.catch.type.description",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }]
            },
            "background": "minecraft:textures/block/tube_coral_block.png",
            "frame": "challenge",
            "show_toast": true,
            "announce_to_chat": true,
            "hidden": false
        },
        "criteria": {
            // FILL
        }
    }
}

export function getParentTemplate_mod(): ParentFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "display": {
            "icon": {
                "item": "minecraft:tropical_fish_bucket",
                "nbt": "{CustomModelData: %MODELDATA%}"
            },
            "title": {
                "translate": "advancement.catch.type_bodyColor.title",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }, {
                    "translate": "fish.color.%BODY_COLOR%"
                }]
            },
            "description": {
                "translate": "advancement.catch.type_bodyColor.description",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }, {
                    "translate": "fish.color.%BODY_COLOR%"
                }]
            },
            "frame": "goal",
            "show_toast": true,
            "announce_to_chat": false,
            "hidden": false
        },
        "parent": `${getDatapackName()}:%TYPE%/main`,
        "criteria": {
            // FILL
        }
    }
}

export function getParentRewardsTemplate(): ParentRewardsFile {
    return {
        "author": {
            "translate": "global.author"
        },
        "display": {
            "icon": {
                "item": "minecraft:tropical_fish_bucket",
                "nbt": "{CustomModelData: %MODELDATA%}"
            },
            "title": {
                "translate": "advancement.catch.type_bodyColor_patternColor.title",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }, {
                    "translate": "fish.color.%BODY_COLOR%"
                }, {
                    "translate": "fish.color.%PATTERN_COLOR%"
                }]
            },
            "description": {
                "translate": "advancement.catch.type_bodyColor_patternColor.description",
                "with": [{
                    "translate": "fish.type.%TYPE%"
                }, {
                    "translate": "fish.color.%BODY_COLOR%"
                }, {
                    "translate": "fish.color.%PATTERN_COLOR%"
                }]
            },
            "frame": "task",
            "show_toast": true,
            "announce_to_chat": false,
            "hidden": false
        },
        "parent": `${getDatapackName()}:%TYPE%`,
        "criteria": {
            // FILL
        },
        "rewards": {
            "function": `${getDatapackName()}:%TYPE%`
        }
    }
}