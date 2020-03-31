import { Document } from 'mongoose';

export interface Diagnose extends Document {
  readonly text:string;
  readonly upvote:number;
  readonly comments:Array<{text:string, date:string, upvote:number}>;
}
