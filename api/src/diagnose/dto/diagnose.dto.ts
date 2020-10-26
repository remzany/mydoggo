export class DiagnoseDto {
    readonly title:string;
    readonly description:string;
    readonly comments:Array<string>;
    likeArray:Array<string>;
    likeCount:Number;
    readonly tag:string;
    readonly ownership:string;
}