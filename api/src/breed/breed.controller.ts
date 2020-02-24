import {Controller, Get} from '@nestjs/common';
import {BreedService} from './breed.service';
import {Breed} from './breed';

@Controller('breed')
export class BreedController {

    constructor(private readonly breedService: BreedService) { }

    @Get('getBreeds')
    async listBreeds(): Promise<Breed[] | null> {
        return await this.breedService.listBreeds();
    }
}
