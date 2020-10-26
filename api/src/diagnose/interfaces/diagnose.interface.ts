import { Document } from 'mongoose';

export interface Diagnose extends Document {
    readonly id:string
    readonly title:string;
    readonly description:string;
    readonly comments:Array<string>;
    likeArray:Array<string>;
    likeCount:Number;
    readonly tag:string;
    readonly ownership:string;
}