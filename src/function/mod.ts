import {types} from "../pack.ts";
import generateFunctionFile from "./patternFile.ts";
import {generateGlobalReward} from "./globalRewardFile.ts";
import generateLoadFile from "./loadFile.ts";
import {generatePackMeta} from "./packMeta.ts";

export default async function generatesFunctionFiles() {
    const promises: Promise<void>[] = []
    types.forEach((type) => promises.push(generateFunctionFile(type)))
    promises.push(generateGlobalReward())
    promises.push(generateLoadFile())
    promises.push(generatePackMeta())
    await Promise.all(promises)
}