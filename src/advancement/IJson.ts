// TODO

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