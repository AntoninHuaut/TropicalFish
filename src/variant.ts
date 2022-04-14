import { typesMapping, colorsMapping } from "./pack.ts"

function padNumber(num: number) {
    return ("" + num).padStart(2, "0")
}

export function calculateModelData(typeIndex: number, bodyColorIndex: number, patternColorIndex: number): number {
    const typeIndexStr = padNumber(typeIndex + 1)
    const bodyColorIndexStr = padNumber(bodyColorIndex + 1)
    const patternColorIndexStr = padNumber(patternColorIndex + 1)

    return Number.parseInt(`1${typeIndexStr}${bodyColorIndexStr}${patternColorIndexStr}`)
}

export function getVariantsWithTypeColor(typeStr: string, colorStr: string): number[] {
    const variantList: number[] = []

    if (!Object.keys(typesMapping).includes(typeStr)) return []
    if (!Object.keys(colorsMapping).includes(colorStr)) return []

    const type = typesMapping[typeStr]

    const size = type[0]
    const pattern = type[1]
    const colorBody = colorsMapping[colorStr]

    for (let colorPattern = 0; colorPattern <= 14; colorPattern++) { // 15 = black : Not found naturally
        variantList.push((colorPattern << 24) | (colorBody << 16) | (pattern << 8) | size)
    }

    return variantList
}