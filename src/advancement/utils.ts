import {TranslateKey} from "./IJson.ts"

export interface IFormatParam {
    type?: string;
    colorBody?: string;
    colorPattern?: string;
}

export function formatTranslateKey(obj: TranslateKey, params?: IFormatParam): TranslateKey {
    obj.translate = formatString(obj.translate, params)
    if (obj.with) {
        obj.with = obj.with.map((subObj: TranslateKey) => formatTranslateKey(subObj, params))
    }
    return obj
}

export function formatString(obj: string, params?: IFormatParam): string {
    return obj
        .replace(/%TYPE%/g, params?.type ?? "")
        .replace(/%BODY_COLOR%/g, params?.colorBody ?? "")
        .replace(/%PATTERN_COLOR%/g, params?.colorPattern ?? "")
}