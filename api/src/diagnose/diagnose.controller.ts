import { 
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  NotFoundException,
  Post,
  Body
} from '@nestjs/common';

import { DiagnoseService } from './diagnose.service';
import { AuthGuard } from '@nestjs/passport';
import {DiagnoseDto} from './diagnose.dto';


@Controller('api/diagnose')
export class DiagnoseController {
    constructor(private diagnoseService:DiagnoseService){}

    @Post()
    async addDiagnose(@Res() res, @Body() createDiagnoseDto: DiagnoseDto) {
      try {
        const user = await this.diagnoseService.addDiagnose(createDiagnoseDto);
        return res.status(HttpStatus.OK).json({
          msg: 'DiagnoseAdded',
          user
        });
      } catch (e) {
        return res.status(HttpStatus.CONFLICT).json({
          msg: 'User already exists'
        });
      }
    }

    @UseGuards(AuthGuard())
    @Get(':diagnoseID')
    async getDiagnoses(@Res() res, @Param('diagnoseID') diagnoseID) {
      const diagnose = await this.diagnoseService.getDiagnoses(diagnoseID);
      if (!diagnose) return res.status(404).json({msg: "diagnosenone"});
      return res.status(HttpStatus.OK).json(diagnose);
    }

}