import {getDatapackFunctionPath, writeStringFile} from "../pack.ts";

const TELLRAW_DATA = [{
    "text": "[",
    "color": "#CCCCCC",
    "hoverEvent": {
        "action": "show_text",
        "value": {
            "text": "The pack has been successfully loaded", "color": "#CCCCCC"
        }
    }
}, {
    "text": "\u2714", "color": "#33CC33"
}, {
    "text": "]"
}, {
    "text": "Au Tropique",
    "hoverEvent": {
        "action": "show_text",
        "value": {"text": "Par EclairDeFeu360 & Maner\\nClick to learn more", "color": "#CCCCCC"}
    },
    "clickEvent": {"action": "open_url", "value": "https://github.com/AntoninHuaut/TropicalFish"}
}]
const content: string = `tellraw @a ${TELLRAW_DATA}`

export default async function generateLoadFile() {
    const path = `${getDatapackFunctionPath()}/load.mcfunction`
    await writeStringFile(path, content.trim())
}