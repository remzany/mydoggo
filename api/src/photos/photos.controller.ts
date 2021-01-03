import { 
Controller,
Post,
UseInterceptors,
UploadedFile } from '@nestjs/common';

import {FileInterceptor} from '@nestjs/platform-express';

@Controller('photos')
export class PhotosController {
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("photo", {
      dest: "./uploads",
    })
  )UploadSingle(@UploadedFile() file){
    console.log(file);
  }
}
