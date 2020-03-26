import { Module } from '@nestjs/common';

import {BreedController} from './breed.controller';

import {BreedService} from './breed.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
    ],
  providers: [BreedService],
  controllers: [BreedController],
  exports: [BreedService]
})
export class BreedModule {}
