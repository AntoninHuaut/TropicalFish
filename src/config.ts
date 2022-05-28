export const config: IConfig = {
    globalRewardCommands: ['xp add @s 2700 levels'],
    datapackFormat: 9,
    resourcepackFormat: 8,
    techName: "tropicalfish",
    i18nName: "Tropical Fish",
    jsonMinified: true
}

export interface IConfig {
    globalRewardCommands: string[]
    datapackFormat: number
    resourcepackFormat: number
    techName: string
    i18nName: string
    jsonMinified: boolean
}