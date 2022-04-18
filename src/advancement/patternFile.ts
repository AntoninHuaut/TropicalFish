import {colors, getAdvancementsPathBodyColor, getDatapackName, types, writeFile} from "../pack.ts"
import {Criteria, ParentRewardsFile, Variant} from "./IJson.ts"
import {calculateModelData} from "../variant.ts"
import {formatString, formatTranslateKey, IFormatParam} from "./utils.ts"

const TEMPLATE: ParentRewardsFile = {
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

export default async function generatePatternFiles(type: string, colorBody: string, colorPattern: string, variantObj: { key: string, value: Variant }) {
    const criteriaItem: Criteria = {
        [variantObj.key]: variantObj.value
    }

    const formatParams: IFormatParam = {
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    }

    const content: ParentRewardsFile = JSON.parse(JSON.stringify(TEMPLATE))

    const modelData: string = "" + calculateModelData(types.indexOf(type), colors.indexOf(colorBody), colors.indexOf(colorPattern))
    content.display.icon.nbt = content.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
    content.display.title = formatTranslateKey(content.display.title, formatParams)
    content.display.description = formatTranslateKey(content.display.description, formatParams)
    content.rewards.function = formatString(content.rewards.function, formatParams)
    content.criteria = criteriaItem

    const colorPatternIndex = colors.indexOf(colorPattern)
    if (colorPatternIndex == 0) {
        content.parent = formatString(`${content.parent}/body_${colorBody}`, formatParams)
    } else {
        const previousColor = colors[colorPatternIndex - 1]
        content.parent = formatString(`${content.parent}/${colorBody}/pattern_${previousColor}`, formatParams)
    }

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/pattern_${colorPattern}.json`
    await writeFile(path, content)
}