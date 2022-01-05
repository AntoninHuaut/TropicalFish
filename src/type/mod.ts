import { getDatapackName, types, colors, getPathType, colorsMapping } from "../pack.ts"
import { getVariantsWithTypeColor } from "../variant.ts"
import generateMainFile from "./mainFile.ts"
import { ParentFile, Variant } from "./IJson.ts"
import generatePatternFiles from "./patternFile.ts"
import generateActiveFile from "./activeFile.ts"
import generateGlobalFile from "./globalFile.ts";

const TEMPLATE: ParentFile = {
    "author": "EclairDeFeu360 & Maner",
    "display": {
        "icon": {
            "item": "minecraft:%COLOR%_concrete"
        },
        "title": "Les petits %TYPE% %COLOR% ...",
        "description": "Récupérer tous les %TYPE% %COLOR%",
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
const LINE: Variant = {
    "trigger": "minecraft:inventory_changed",
    "conditions": { "items": [{ "items": ["minecraft:tropical_fish_bucket"], "nbt": "{BucketVariantTag:%VARIANT%}" }] }
}

const BODY_FILENAME = "body_"

function convertString(str: string, type: string, color: string) {
    return str.replace(/%TYPE%/g, type).replace(/%COLOR%/g, color)
}

export default async function generatesFiles() {
    const promises: Promise<void>[] = []
    const colorsMappingFlip = Object.fromEntries(Object.entries(colorsMapping).map(([k, v]) => [v, k]))
    const allTypeVariants: { [type: string]: { key: string, value: Variant }[] } = {}

    for (const type of types) {
        const typeVariants: { key: string, value: Variant }[] = []

        for (const bodyColor of colors) {
            const path = `${getPathType(type)}/${BODY_FILENAME}${bodyColor}.json`
            const content: ParentFile = JSON.parse(JSON.stringify(TEMPLATE))

            content.display.icon.item = convertString(content.display.icon.item, type, bodyColor)
            content.display.title = convertString(content.display.title, type, bodyColor)
            content.display.description = convertString(content.display.description, type, bodyColor)
            content.parent = convertString(content.parent, type, bodyColor)

            const colorVariants = getVariantsWithTypeColor(type, bodyColor)

            let patternColorIndex = 0
            for (const variant of colorVariants) {
                const contentKey = `variant_${variant}`
                const contentLine: Variant = JSON.parse(JSON.stringify(LINE))

                contentLine.conditions.items[0].nbt = contentLine.conditions.items[0].nbt.replace(/%VARIANT%/g, "" + variant)
                content.criteria[contentKey] = contentLine

                const patternColor = colorsMappingFlip[patternColorIndex]
                promises.push(generatePatternFiles(type, bodyColor, patternColor, {
                    key: contentKey,
                    value: contentLine
                }))

                patternColorIndex++
                typeVariants.push({ key: contentKey, value: contentLine })
            }

            promises.push(generateActiveFile(type, bodyColor))
            promises.push(Deno.writeTextFile(path, JSON.stringify(content, null, 2))) // TODO remove null, 2
        }

        allTypeVariants[type] = typeVariants
        promises.push(generateMainFile(type, typeVariants))
    }

    promises.push(generateGlobalFile(allTypeVariants))
    await Promise.all(promises)
}