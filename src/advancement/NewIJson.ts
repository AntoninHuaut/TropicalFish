export interface NewMainFile {
    author: NewTranslateKey;
    criteria?: NewCriteria;
    display?: NewDisplay;
    parent?: string;
    rewards?: NewRewards;
}

export interface NewTranslateKey {
    translate: string;
    with?: NewTranslateKey[];
}

interface NewStringCriteria {
    [variant: string]: NewVariant;
}

interface NewActiveCriteria {
    active?: { trigger: string; };
}

export type NewCriteria = NewStringCriteria | NewActiveCriteria

export interface NewDisplay {
    icon: NewIcon;
    title: NewTranslateKey;
    description: NewTranslateKey;
    background?: string;
    frame: string;
    show_toast: boolean;
    announce_to_chat: boolean;
    hidden: boolean;
}

export interface NewRewards {
    function: string;
}

export interface NewIcon {
    item: string;
    nbt?: string;
}

export interface NewVariant {
    trigger: string;
    conditions: { items: (NewItemsEntity)[] };
}

export interface NewItemsEntity {
    items: (string)[];
    nbt: string;
}