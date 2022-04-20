export const config: IConfig = {
    globalRewardCommands: ['xp add @s 2700 levels'],
    packFormat: 8
}

export interface IConfig {
    globalRewardCommands: string[]
    packFormat: number // for ressource pack
}