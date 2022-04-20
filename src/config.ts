export const config: IConfig = {
    globalRewardCommands: ['xp add @s 2700 levels'],
    packFormat: 8,
    datapackTechName: "au_tropique",
    jsonMinified: true
}

export interface IConfig {
    globalRewardCommands: string[]
    packFormat: number // for ressource pack
    datapackTechName: string
    jsonMinified: boolean
}