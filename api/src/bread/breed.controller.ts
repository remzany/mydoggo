import { BreedService } from './breed.service';

import {
    Controller,
    Get,
    Res,
    HttpStatus,
    UseGuards
  } from '@nestjs/common';

  import { AuthGuard } from '@nestjs/passport';

@Controller('api/breed')
export class BreedController {
    constructor(private breedService:BreedService){}

    @UseGuards(AuthGuard())
    @Get()
    async getBreed(@Res() res) {
    const breed = await this.breedService.getBreed();
    return res.status(HttpStatus.OK).json(breed);
    }

}

