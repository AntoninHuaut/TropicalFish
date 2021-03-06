import { RESOURCEPACK_FOLDER_PATH, writeFile } from "../utils/pack.ts"
import { calculateModelData, colors, types } from "../utils/variant.ts"

export interface LinkItemsFile {
    parent: string
    textures: Textures
    overrides: (OverridesEntity)[]
}

export interface Textures {
    layer0: string
}

export interface OverridesEntity {
    predicate: Predicate
    model: string
}

export interface Predicate {
    custom_model_data: number
}

async function createModelsFiles() {
    const promisesFiles: Promise<void>[] = []
    for (const type of types) {
        const modelsPathType = `${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/models/item/${type}/`

        for (const colorBody of colors) {
            const modelPathTypeColorBody = `${modelsPathType}/${colorBody}/`

            for (const colorPattern of colors) {
                const finalPath = `${modelPathTypeColorBody}/${colorPattern}.json`

                promisesFiles.push(writeFile(finalPath, {
                    "parent": "item/generated",
                    "textures": {
                        "layer0": `item/${type}/${colorBody}/${colorPattern}`
                    }
                }))
            }
        }
    }
    await Promise.all(promisesFiles)
}

async function createLinkTexturesModelsFile() {
    const content: LinkItemsFile = {
        "parent": "item/generated",
        "textures": {
            "layer0": "item/tropical_fish_bucket"
        },
        "overrides": []
    }

    types.forEach((type, typeIndex) => {
        colors.forEach((bodyColor, bodyColorIndex) => {
            colors.forEach((patternColor, patternColorIndex) => {
                const modelData: number = calculateModelData(typeIndex, bodyColorIndex, patternColorIndex)
                const model = `item/${type}/${bodyColor}/${patternColor}`

                content.overrides.push({
                    "predicate": {
                        "custom_model_data": modelData
                    },
                    "model": model
                })
            })
        })
    })

    await writeFile(`${RESOURCEPACK_FOLDER_PATH}/assets/minecraft/models/item/tropical_fish_bucket.json`, content)
}

export default async function initTextures() {
    await createModelsFiles()
    await createLinkTexturesModelsFile()
}