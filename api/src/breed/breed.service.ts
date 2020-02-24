import {Injectable} from '@nestjs/common';
import {Breed} from './breed';
import {InjectModel} from 'nestjs-typegoose';
import {ReturnModelType} from '@typegoose/typegoose';

@Injectable()
export class BreedService {

    constructor(@InjectModel(Breed) private readonly breedModel: ReturnModelType<typeof Breed>) {}

    async listBreeds(): Promise<Breed[] | null> {
        return await this.breedModel.find().exec();
    }
}
