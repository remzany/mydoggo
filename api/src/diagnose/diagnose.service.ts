import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnose } from './diagnose.interface';

import {DiagnoseDto} from './diagnose.dto';

@Injectable()
export class DiagnoseService {

  constructor(@InjectModel('Diagnose') private readonly diagnoseModel: Model<Diagnose>){}

  async addDiagnose(DiagnoseDto): Promise<Diagnose>{
    const newDiagnose = await new this.diagnoseModel(DiagnoseDto);
    return newDiagnose.save();
  }

  async getDiagnoses(diagnoseId): Promise<Diagnose> {
    const diagnose = await this.diagnoseModel.findById(diagnoseId).exec();
    return diagnose;
  }

}
