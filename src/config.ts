export const config: IConfig = {
    globalRewardCommands: ['xp add @s 2700 levels'],
    typeRewardCommands: ['xp add @s 2700 points'],
    datapackFormat: 9,
    resourcepackFormat: 8,
    techName: "tropicalfish",
    i18nName: "Tropical Fish",
    jsonMinified: true
}

export interface IConfig {
    globalRewardCommands: string[]
    typeRewardCommands: string[]
    datapackFormat: number
    resourcepackFormat: number
    techName: string
    i18nName: string
    jsonMinified: boolean
}