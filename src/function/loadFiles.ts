import {
    getDatapackFunctionPath,
    getDatapackName,
    getDisplayDatapackName,
    getMinecraftFunctionPath,
    writeFile,
    writeStringFile
} from "../pack.ts";

const TELLRAW_DATA: string = JSON.stringify([{
    "text": "[",
    "color": "#CCCCCC",
    "hoverEvent": {
        "action": "show_text",
        "value": {
            "text": "The pack has been successfully loaded", "color": "#CCCCCC"
        }
    }
}, {
    "text": "✔", "color": "#33CC33"
}, {
    "text": "]"
}, {
    "text": ` ${getDisplayDatapackName()}`,
    "hoverEvent": {
        "action": "show_text",
        "value": {"text": "By EclairDeFeu360 & Maner\nClick to learn more", "color": "#CCCCCC"}
    },
    "clickEvent": {"action": "open_url", "value": "https://github.com/AntoninHuaut/TropicalFish"}
}])
const content: string = `tellraw @a ${TELLRAW_DATA}`

export default async function generateLoadFiles() {
    await writeStringFile(`${getDatapackFunctionPath()}/load.mcfunction`, content.trim())
    await writeFile(`${getMinecraftFunctionPath()}/load.json`, {"values": [`${getDatapackName()}:load`]})
}