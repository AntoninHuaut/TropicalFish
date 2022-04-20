import {types} from "../utils/pack.ts"
import generateFunctionFile from "./patternFile.ts"
import {generateGlobalReward} from "./globalRewardFile.ts"
import generateLoadFiles from "./loadFiles.ts"
import {generatePackMeta} from "./packMeta.ts"

export default async function generatesFunctionFiles() {
    const promises: Promise<void>[] = []
    types.forEach((type) => promises.push(generateFunctionFile(type)))
    promises.push(generateGlobalReward())
    promises.push(generateLoadFiles())
    promises.push(generatePackMeta())
    await Promise.all(promises)
}