import { DiagnoseDto } from './dto/diagnose.dto';
import { DiagnoseService } from './diagnose.service';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DiagnoseData} from './interfaces/diagnose.interface';

@Controller('api/diagnose')
export class DiagnoseController {
  constructor(private diagnoseService: DiagnoseService) {}


  @UseGuards(AuthGuard())
  @Post()
  async addDiagnose(@Res() res, @Body() createDiagnoseDto: DiagnoseDto) {
    try {
      const diagnose = await this.diagnoseService.addDiagnose(createDiagnoseDto);
      return res.status(HttpStatus.OK).json({
        msg: 'Diagnose has been created successfully',
        diagnose
      });
    } catch (e) {
      return res.status(HttpStatus.CONFLICT).json({
        msg: 'Diagnose already exists'
      });
    }
  }

  @UseGuards(AuthGuard())
  @Get(':diagnoseID')
  async getDiagnose(@Res() res, @Param('diagnoseID') diagnoseID) {
    const diagnose = await this.diagnoseService.getDiagnose(diagnoseID);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json(diagnose);
  }

  @UseGuards(AuthGuard())
  @Put('upvote/:diagnoseID')
  async upvoteDiagnose(
    @Res() res,
    @Param('diagnoseID') diagnoseID,
    @Body() createDiagnoseDto: DiagnoseDto,
  ) {
    const diagnose = await this.diagnoseService.upvoteDiagnose(diagnoseID, createDiagnoseDto);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json({
      errors: 0,
      msg: 'Diagnose has been successfully updated',
      likeNumber: diagnose.likeCount,
    });
  }

  @UseGuards(AuthGuard())
  @Put('downvote/:diagnoseID')
  async downvoteDiagnose(
    @Res() res,
    @Param('diagnoseID') diagnoseID,
    @Body() createDiagnoseDto: DiagnoseDto,
  ) {
    const diagnose = await this.diagnoseService.downvoteDiagnose(diagnoseID, createDiagnoseDto);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json({
      errors: 0,
      msg: 'Diagnose has been successfully updated',
      likeNumber: diagnose.likeCount,
    });
  }

  @UseGuards(AuthGuard())
  @Delete(':diagnoseID')
  async deleteDiagnose(@Res() res, @Param('diagnoseID') diagnoseID) {
    const diagnose = await this.diagnoseService.deleteDiagnose(diagnoseID);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist');
    return res.status(HttpStatus.OK).json({
      msg: 'Diagnose has been deleted',
      diagnose,
    });
  }

  @UseGuards(AuthGuard())
  @Put('addcomment/:diagnoseID')
  async addCommentDiagnose(
    @Res() res,
    @Param('diagnoseID') diagnoseID,
    @Body() data: DiagnoseData,
  ) {
    const diagnose = await this.diagnoseService.addCommentDiagnose(diagnoseID, data);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json({
      errors: 0,
      msg: 'Diagnose has been successfully updated',
      comment: diagnose.comments
    });
  }

  @UseGuards(AuthGuard())
  @Put('deletecomment/:diagnoseID')
  async deleteComment(
    @Res() res,
    @Param('diagnoseID') diagnoseID,
    @Body() data: {"ownerID": string, "commentID": string},
  ) {
    const diagnose = await this.diagnoseService.deleteComment(diagnoseID, data);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json({
      errors: 0,
      msg: 'Diagnose has been successfully updated',
      comment: diagnose.comments
    });
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAllDiagnose(@Res() res, @Body() userId: string) {
    const diagnose = await this.diagnoseService.getAllDiagnose(userId);
    return res.status(HttpStatus.OK).json(diagnose);
  }

}
