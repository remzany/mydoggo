import { Document } from 'mongoose';

export interface Diagnose extends Document {
    readonly title:string;
    readonly description:string;
    readonly comments:Array<string>;
    readonly likeArray:Array<string>;
    readonly likeCount:Number;
    readonly tag:string;
    readonly ownership:string;
}