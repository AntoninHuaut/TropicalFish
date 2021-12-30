export interface RootFishIcon {
    item: string
}

export interface RootFishDisplay {
    title: string
    description: string
    icon: RootFishIcon
    background: string
    show_toast: boolean
    announce_to_chat: boolean
}

export interface RootFishRequirement {
    trigger: string
}

export interface RootFishCriteria {
    requirement: RootFishRequirement
}

export interface RootFishAdvancement {
    display: RootFishDisplay
    criteria: RootFishCriteria
}