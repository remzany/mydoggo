import { 
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  NotFoundException
} from '@nestjs/common';

import { DiagnoseService } from './diagnose.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('api/diagnose')
export class DiagnoseController {
    constructor(private diagnoseService:DiagnoseService){}

    @UseGuards(AuthGuard())
    @Get(':diagnoseID')
    async getDiagnoses(@Res() res, @Param('diagnoseID') diagnoseID) {
      const diagnose = await this.diagnoseService.getDiagnoses(diagnoseID);
      if (!diagnose) throw new NotFoundException('There is no diagnoses for this diagnose');
      return res.status(HttpStatus.OK).json(diagnose);
    }

}