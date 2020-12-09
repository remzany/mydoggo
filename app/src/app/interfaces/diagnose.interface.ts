export interface Question{
    title:string;
    upvotes:number;
    imageUrl:string;
    comments:number;
}

export interface Diagnose{
    _id:string;
    title:string;
    description:string;
    comments:Array<{"content":string, "owner":string}>;
    likeArray:Array<string>;
    likeCount:Number;
  }