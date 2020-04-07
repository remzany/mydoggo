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

@Controller('api/diagnose')
export class DiagnoseController {
  constructor(private diagnoseService: DiagnoseService) {}

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
  @Put(':diagnoseID')
  async updateDiagnose(
    @Res() res,
    @Param('diagnoseID') diagnoseID,
    @Body() createDiagnoseDto: DiagnoseDto,
  ) {
    const diagnose = await this.diagnoseService.updateDiagnose(diagnoseID, createDiagnoseDto);
    if (!diagnose) throw new NotFoundException('Diagnose does not exist!');
    return res.status(HttpStatus.OK).json({
      msg: 'Diagnose has been successfully updated',
      diagnose,
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
  @Get()
  async getAllDiagnose(@Res() res) {
    const diagnose = await this.diagnoseService.getAllDiagnose();
    return res.status(HttpStatus.OK).json(diagnose);
  }
}
