import {getAdvancementsPathType, types, writeFile} from "../utils/pack.ts"
import {calculateModelData} from "../utils/variant.ts"
import {getMainTemplate_MainFile} from "./advancementFactory.ts";
import {Variant} from "./IJson.ts";

export default async function generateMainFile(type: string, typesVariants: {
    key: string, value: Variant
}[]) {
    const path = `${getAdvancementsPathType(type)}/main.json`
    const content = getMainTemplate_MainFile({
        modelData: calculateModelData(types.indexOf(type), 0, 7),
        type: type
    })

    for (const variant of typesVariants) {
        content.criteria[variant.key] = variant.value
    }

    await writeFile(path, content)
}