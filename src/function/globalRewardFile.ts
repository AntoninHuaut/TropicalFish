import {getDatapackFunctionPath, writeStringFile} from "../pack.ts"

const content = `xp add @s 2700 levels`

export async function generateGlobalReward() {
    const path = `${getDatapackFunctionPath()}/${getGlobalRewardFileName()}.mcfunction`
    await writeStringFile(path, content.trim())
}

export function getGlobalRewardFileName() {
    return "global_reward"
}