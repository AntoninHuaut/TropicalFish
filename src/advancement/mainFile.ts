import {getAdvancementsPathType, types, writeFile} from "../utils/pack.ts"
import {MainFile, Variant} from "./IJson.ts"
import {calculateModelData} from "../utils/variant.ts"
import {formatTranslateKey} from "./utils.ts"
import {getMainTemplate_MainFile} from "./advancementFactory.ts";

export default async function generateMainFile(type: string, typesVariants: { key: string, value: Variant }[]) {
    const path = `${getAdvancementsPathType(type)}/main.json`
    const modelData: string = "" + calculateModelData(types.indexOf(type), 0, 7)

    const content: MainFile = getMainTemplate_MainFile()
    content.display.icon.nbt = content.display.icon.nbt.replace(/%MODELDATA%/g, modelData)
    content.display.title = formatTranslateKey(content.display.title, {type: type})
    content.display.description = formatTranslateKey(content.display.description, {type: type})

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await writeFile(path, content)
}