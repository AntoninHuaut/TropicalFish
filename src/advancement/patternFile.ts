import {colors, getAdvancementsPathBodyColor, types, writeFile} from "../utils/pack.ts"
import {calculateModelData} from "../utils/variant.ts"
import {getParentRewardsTemplate} from "./advancementFactory.ts";
import {Criteria, Variant} from "./IJson.ts";

export default async function generatePatternFiles(params: {
    type: string,
    colorBody: string,
    colorPattern: string,
    variantObj: { key: string, value: Variant }
}) {
    const criteriaItem: Criteria = {
        [params.variantObj.key]: params.variantObj.value
    }

    const colorPatternIndex = colors.indexOf(params.colorPattern)
    let parent = params.type
    if (colorPatternIndex == 0) {
        parent = `${parent}/body_${params.colorBody}`
    } else {
        const previousColor = colors[colorPatternIndex - 1]
        parent = `${parent}/${params.colorBody}/pattern_${previousColor}`
    }

    const content = getParentRewardsTemplate({
        bodyColor: params.colorBody,
        modelData: calculateModelData(types.indexOf(params.type), colors.indexOf(params.colorBody), colorPatternIndex),
        parent: parent,
        patternColor: params.colorPattern,
        type: params.type
    })

    content.criteria = criteriaItem

    const path = `${getAdvancementsPathBodyColor(params.type, params.colorBody)}/pattern_${params.colorPattern}.json`
    await writeFile(path, content)
}