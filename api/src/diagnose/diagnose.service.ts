import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnose } from './diagnose.interface';
@Injectable()
export class DiagnoseService {

  constructor(@InjectModel('User') private readonly diagnoseModel: Model<Diagnose>){}

  async getDiagnoses(diagnoseId): Promise<Diagnose> {
    const diagnose = await this.diagnoseModel.findById(diagnoseId).exec();
    return diagnose;
  }

}
