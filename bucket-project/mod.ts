import { Image } from 'https://deno.land/x/imagescript@v1.2.13/mod.ts'
import { ensureDir } from "https://deno.land/std@0.141.0/fs/mod.ts"
import { resolve } from "https://deno.land/std@0.141.0/path/mod.ts";

const config = {
    overlayPath: 'overlay.png',
    assetsDir: '../static/textures/item',
    distDir: 'dist'
}

const imgPending: Promise<void>[] = []
const overlay = await Image.decode(await Deno.readFile(config.overlayPath))

async function generateImage(imgAssetsFolder: string, entry: Deno.DirEntry) {
    const imgAssetsPath = `${imgAssetsFolder}/${entry.name}`
    const imgDistFolder = imgAssetsFolder.replace(new RegExp(config.assetsDir), config.distDir)
    const imgDistPath = `${imgDistFolder}/${entry.name}`

    const image = await Image.decode(await Deno.readFile(imgAssetsPath))
    image.composite(overlay, image.width - overlay.width, image.height - overlay.height)

    await ensureDir(imgDistFolder)
    await Deno.writeFile(imgDistPath, await image.encode())
}

async function checkImage(folder: string) {
    const childPending: Promise<void>[] = []
    for await (const entry of Deno.readDir(folder)) {
        if (entry.isFile) imgPending.push(generateImage(folder, entry))
        else childPending.push(checkImage(`${folder}/${entry.name}`))
    }
    await Promise.all(childPending)
}

console.time("Generate images")
await checkImage(config.assetsDir)
await Promise.all(imgPending)
console.timeEnd("Generate images")

console.log(`Dist path: ${resolve(config.distDir)}`)