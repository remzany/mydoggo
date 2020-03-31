import { Module } from '@nestjs/common';

import {DiagnoseController} from './diagnose.controller';

import {DiagnoseService} from './diagnose.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
  PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
providers: [DiagnoseService],
controllers: [DiagnoseController],
exports: [DiagnoseService]
})
export class DiagnoseModule {}
