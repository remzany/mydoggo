import { Injectable } from '@nestjs/common';

import { DogData } from './dogdata'
@Injectable()
export class BreedService {

    constructor(){}

  async getBreed(): Promise<Array<string>> {
    return DogData.map(a => {
      return a.name;
    });
  }
}
