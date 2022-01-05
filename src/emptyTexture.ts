// TMP: Create texture template

import {ensureDir, ensureFile} from "https://deno.land/std/fs/mod.ts"
import {colors, PATH_PACK, types, writeFile} from "./pack.ts"
import {calculModelData} from "./variant.ts"

export interface LinkItemsFile {
    parent: string;
    textures: Textures;
    overrides: (OverridesEntity)[];
}

export interface Textures {
    layer0: string;
}

export interface OverridesEntity {
    predicate: Predicate;
    model: string;
}

export interface Predicate {
    custom_model_data: number;
}

async function createEmptyFiles() {
    const promisesFolder: Promise<void>[] = []
    for (const type of types) {
        const modelsPathType = `${PATH_PACK}/assets/minecraft/models/item/${type}/`
        const texturesPathType = `${PATH_PACK}/assets/minecraft/textures/item/${type}/`

        for (const colorBody of colors) {
            const modelPathTypeColorBody = `${modelsPathType}/${colorBody}/`
            const texturesPathTypeColorBody = `${texturesPathType}/${colorBody}/`
            promisesFolder.push(ensureDir(modelPathTypeColorBody))
            promisesFolder.push(ensureDir(texturesPathTypeColorBody))
        }
    }
    await Promise.all(promisesFolder)

    const promisesFiles: Promise<void>[] = []
    for (const type of types) {
        const modelsPathType = `${PATH_PACK}/assets/minecraft/models/item/${type}/`
        const texturesPathType = `${PATH_PACK}/assets/minecraft/textures/item/${type}/`

        for (const colorBody of colors) {
            const modelPathTypeColorBody = `${modelsPathType}/${colorBody}/`
            const texturesPathTypeColorBody = `${texturesPathType}/${colorBody}/`

            for (const colorPattern of colors) {
                const finalPath = `${modelPathTypeColorBody}/${colorPattern}.json`

                promisesFiles.push(ensureFile(`${texturesPathTypeColorBody}/${colorPattern}.png.template`))
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

async function createLinkTexturesFile() {
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
                const modelData: number = calculModelData(typeIndex, bodyColorIndex, patternColorIndex)
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

    await writeFile(`${PATH_PACK}/assets/minecraft/models/item/tropical_fish_bucket.json`, content)
}

export default async function initTexture() {
    await createEmptyFiles()
    await createLinkTexturesFile()
}