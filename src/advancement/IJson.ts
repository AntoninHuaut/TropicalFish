export interface TranslateKey {
    translate: string;
    with?: TranslateKey[];
}

export interface MainFile {
    author: TranslateKey;
    display: Display;
    criteria: Criteria;
    rewards?: Rewards;
}

export interface Rewards {
    function: string;
}

export interface ParentFile extends MainFile {
    parent: string;
}

export interface ParentRewardsFile extends ParentFile {
    rewards: Rewards;
}

export interface Rewards {
    function: string;
}

export interface Display {
    icon: Icon;
    title: TranslateKey;
    description: TranslateKey;
    background?: string;
    frame: string;
    show_toast: boolean;
    announce_to_chat: boolean;
    hidden: boolean;
}

export interface Icon {
    item: string;
    nbt: string;
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

export interface ActiveFile {
    author: TranslateKey;
    parent: string;
    criteria: ActiveCriteria;
}

export interface ActiveCriteria {
    active: ActiveTrigger;
}

export interface ActiveTrigger {
    trigger: string;
}
