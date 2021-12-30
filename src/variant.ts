export default function getVariantList(): number[] {
    const variantList: number[] = []

    for (let size = 0; size <= 1; size++) {
        for (let pattern = 0; pattern <= 5; pattern++) {
            for (let colorBody = 0; colorBody <= 15; colorBody++) {
                for (let colorPattern = 0; colorPattern <= 15; colorPattern++) {
                    variantList.push((colorPattern << 24) | (colorBody << 16) | (pattern << 8) | size)
                }
            }
        }
    }

    return variantList
}