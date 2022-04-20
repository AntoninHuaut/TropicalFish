import {colors, getAdvancementsPathBodyColor, types, writeFile} from "../utils/pack.ts"
import {calculateModelData} from "../utils/variant.ts"
import {getParentRewardsTemplate} from "./advancementFactory.ts";
import {Criteria, Variant} from "./IJson.ts";

export default async function generatePatternFiles(type: string, colorBody: string, colorPattern: string,
                                                   variantObj: { key: string, value: Variant }) {
    const criteriaItem: Criteria = {
        [variantObj.key]: variantObj.value
    }

    const colorPatternIndex = colors.indexOf(colorPattern)
    let parent = type
    if (colorPatternIndex == 0) {
        parent = `${parent}/body_${colorBody}`
    } else {
        const previousColor = colors[colorPatternIndex - 1]
        parent = `${parent}/${colorBody}/pattern_${previousColor}`
    }

    const content = getParentRewardsTemplate({
        bodyColor: colorBody,
        modelData: calculateModelData(types.indexOf(type), colors.indexOf(colorBody), colors.indexOf(colorPattern)),
        parent: parent,
        patternColor: colorPattern,
        type: type
    })

    content.criteria = criteriaItem

    const path = `${getAdvancementsPathBodyColor(type, colorBody)}/pattern_${colorPattern}.json`
    await writeFile(path, content)
}