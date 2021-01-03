import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Diagnose, DiagnoseData } from './interfaces/diagnose.interface';
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

    const upvoteDiagnose = await this.diagnoseModel.findByIdAndUpdate(
      diagnoseID, 
      { $addToSet: { "likeArray": data.likeArray }},
      {
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

  async addCommentDiagnose(diagnoseID, DiagnoseData): Promise<any> {

    const updatedDiagnose = await this.diagnoseModel.findByIdAndUpdate(
      diagnoseID, 
      { $addToSet: {"comments": DiagnoseData} },
      {new : true}
    );

    return updatedDiagnose;

  }

  // DELETE diagnose
  async deleteDiagnose(diagnoseID): Promise<any> {
    const deletedDiagnose = await this.diagnoseModel.findByIdAndRemove(diagnoseID);
    return deletedDiagnose;
  }

  // GET ALL diagnose
  async getAllDiagnose(userId: string): Promise<Diagnose[]> {
    const diagnoses = await this.diagnoseModel.find({}, '-comments._ownerid').exec();
    return diagnoses;
  }

  // DELETE diagnose
  async deleteComment(diagnoseID, data: {"ownerID": string, "commentID": string}): Promise<any> {

    

    let comment = await this.diagnoseModel.findById(diagnoseID);
    comment.comments.forEach(async (res, index) => {
      if(res._id != data.commentID) return;
      if(res._ownerid != data.ownerID ) return;
      comment.comments.splice(index, 1);
      await this.diagnoseModel.findByIdAndUpdate(diagnoseID, comment);
    })

    return comment;

  }
  // For JWT checking
  async findOneByEmail(email: string): Promise<Diagnose> {
    return await this.diagnoseModel.findOne({ email: email }, '+password');
  }

}
