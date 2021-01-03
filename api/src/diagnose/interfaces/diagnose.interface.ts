import { Document } from 'mongoose';

export interface Diagnose extends Document {
    readonly id:string
    readonly title:string;
    readonly description:string;
    readonly comments: Array<{"content":string, "_ownerid": string, "_id": string}>;
    readonly likeArray: Array<string>;
    likeCount:Number;
    readonly tag:string;
    readonly ownership:string;
}

export interface DiagnoseData extends Document{
    data:{"content":string, "_ownerid": string}
}