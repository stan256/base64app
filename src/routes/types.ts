export enum Mode {
    Encode, Decode
}


export interface Transform {
    saved: number
    base64: string
    text: string
}