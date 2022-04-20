import {colors, getAdvancementsPathBodyColor, getDatapackName, types, writeFile} from "../utils/pack.ts"
import {Criteria, ParentRewardsFile, Variant} from "./IJson.ts"
import {calculateModelData} from "../utils/variant.ts"
import {formatString, formatTranslateKey, IFormatParam} from "./utils.ts"
import {getParentRewardsTemplate} from "./advancementFactory.ts";

export default async function generatePatternFiles(type: string, colorBody: string, colorPattern: string, variantObj: { key: string, value: Variant }) {
    const criteriaItem: Criteria = {
        [variantObj.key]: variantObj.value
    }

    const formatParams: IFormatParam = {
        type: type,
        colorBody: colorBody,
        colorPattern: colorPattern
    }

    const content: ParentRewardsFile = getParentRewardsTemplate()

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