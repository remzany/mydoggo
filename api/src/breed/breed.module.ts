import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedController } from './breed.controller';

import {Breed} from './breed';
import {TypegooseModule} from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Breed])],
  providers: [BreedService],
  controllers: [BreedController]
})
export class BreedModule {}
