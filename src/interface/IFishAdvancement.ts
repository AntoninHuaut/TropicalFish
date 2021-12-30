export interface FishIcon {
    item: string
    nbt: string
}

export interface FishDisplay {
    title: string
    description: string
    icon: FishIcon
    background: string
    show_toast: boolean
    announce_to_chat: boolean
}

export interface FishItem {
    items: string[]
    nbt: string
}

export interface FishConditions {
    items: FishItem[]
}

export interface FishRequirement {
    trigger: string
    conditions: FishConditions
}

export interface FishCriteria {
    requirement: FishRequirement
}

export interface FishAdvancement {
    display: FishDisplay
    criteria: FishCriteria
    parent: string
}