export interface MainFile {
    author: string;
    display: Display;
    criteria: Criteria;
}

export interface ParentFile extends MainFile {
    parent: string;
}

export interface ParentRewardsFile extends ParentFile {
    parent: string;
    rewards: Rewards;
}

export interface Rewards {
    function: string;
}

export interface Display {
    icon: Icon;
    title: string;
    description: string;
    background?: string;
    frame: string;
    show_toast: boolean;
    announce_to_chat: boolean;
    hidden: boolean;
}

export interface Icon {
    item: string;
}

export interface Criteria {
    [variant: string]: Variant;
}

export interface Variant {
    trigger: string;
    conditions: Conditions;
}

export interface Conditions {
    items: (ItemsEntity)[];
}

export interface ItemsEntity {
    items: (string)[];
    nbt: string;
}

//

export interface ActiveRoot {
    author: string;
    parent: string;
    criteria: ActiveCriteria;
}

export interface ActiveCriteria {
    active: ActiveTrigger;
}

export interface ActiveTrigger {
    trigger: string;
}