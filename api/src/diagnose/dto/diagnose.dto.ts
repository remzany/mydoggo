export class DiagnoseDto {
    readonly title:string;
    readonly description:string;
    readonly comments:Array<{"content": string}>;
    readonly likeArray:string;
    //readonly likeCount:Number;
    readonly tag:string;
    readonly ownership:string;
}