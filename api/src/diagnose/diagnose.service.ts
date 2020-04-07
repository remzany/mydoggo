import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnose } from './interfaces/diagnose.interface';
import { DiagnoseDto } from './dto/diagnose.dto';

@Injectable()
export class DiagnoseService {
  constructor(@InjectModel('Diagnose') private readonly diagnoseModel: Model<Diagnose>) {}

  // CREATE diagnose
  async addDiagnose(createDiagnoseDTO: DiagnoseDto): Promise<Diagnose> {
    const newDiagnose = await new this.diagnoseModel(createDiagnoseDTO);
    return newDiagnose.save();
  }

  // READ diagnose
  async getDiagnose(diagnoseID): Promise<Diagnose> {
    const customer = await this.diagnoseModel.findById(diagnoseID).exec();
    return customer;
  }

  // UPDATE diagnose details
  async updateDiagnose(diagnoseID, data): Promise<Diagnose> {
    const updatedDiagnose = await this.diagnoseModel.findByIdAndUpdate(diagnoseID, data, {
      new: true,
    });
    return updatedDiagnose;
  }

  // DELETE diagnose
  async deleteDiagnose(diagnoseID): Promise<any> {
    const deletedDiagnose = await this.diagnoseModel.findByIdAndRemove(diagnoseID);
    return deletedDiagnose;
  }

  // GET ALL diagnose
  async getAllDiagnose(): Promise<Diagnose[]> {
    const diagnoses = await this.diagnoseModel.find().exec();
    return diagnoses;
  }

  // For JWT checking
  async findOneByEmail(email: string): Promise<Diagnose> {
    return await this.diagnoseModel.findOne({ email: email }, '+password');
  }

}
