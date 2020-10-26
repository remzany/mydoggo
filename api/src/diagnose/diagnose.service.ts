import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnose } from './interfaces/diagnose.interface';
import { DiagnoseDto } from './dto/diagnose.dto';

@Injectable()
export class DiagnoseService {
  constructor(@InjectModel('Diagnose') private readonly diagnoseModel: Model<Diagnose>) { }

  // CREATE diagnose
  async addDiagnose(createDiagnoseDTO: DiagnoseDto): Promise<Diagnose> {
    const newDiagnose = await new this.diagnoseModel(createDiagnoseDTO);
    return newDiagnose.save();
  }

  // READ diagnose
  async getDiagnose(diagnoseID): Promise<Diagnose> {
    const diagnose = await this.diagnoseModel.findById(diagnoseID).exec();
    return diagnose;
  }

  // UPDATE diagnose details
  async upvoteDiagnose(diagnoseID, data: DiagnoseDto): Promise<Diagnose> {


    let val = null;

    const upvoteDiagnose = await this.diagnoseModel.findByIdAndUpdate(diagnoseID, {
      $addToSet: { "likeArray": data.likeArray },
    }, {
      new: true
    }).then(async (res) => {

      val = res.likeArray.length;

      const result = await this.diagnoseModel.findByIdAndUpdate(diagnoseID, {
        $set: {
          "likeCount": res.likeArray.length
        }
      });

      return result;

    });

    upvoteDiagnose.likeCount = val;

    console.log(JSON.stringify(upvoteDiagnose));

    return upvoteDiagnose;

  }

  // UPDATE diagnose details
  async downvoteDiagnose(diagnoseID, data: DiagnoseDto): Promise<Diagnose> {


    let val = null;

    const downvoteDiagnose = await this.diagnoseModel.findByIdAndUpdate(diagnoseID, {
      $pull: { "likeArray": data.likeArray },
    }, {
      new: true
    }).then(async (res) => {

      val = res.likeArray.length;

      const result =  await this.diagnoseModel.findByIdAndUpdate(diagnoseID, {
        $set: {
          "likeCount": res.likeArray.length
        }
      });

      return result
      
    });

    downvoteDiagnose.likeCount = val;

    return downvoteDiagnose;
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
