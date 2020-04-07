export interface Question{
    title:string;
    upvotes:number;
    imageUrl:string;
    comments:number;
}

export interface Diagnose{
    title:string;
    description:string;
    comments:Array<string>;
    likeArray:Array<string>;
    likeCount:Number;
  }