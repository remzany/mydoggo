import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {DiagnoseController} from './diagnose.controller';

import {DiagnoseService} from './diagnose.service';
import { PassportModule } from '@nestjs/passport';
import {DiagnoseSchema} from './diagnose.schema';

@Module({
  imports: [
  MongooseModule.forFeature([{name: 'Diagnose', schema: DiagnoseSchema}]),
  PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
providers: [DiagnoseService],
controllers: [DiagnoseController],
exports: [DiagnoseService]
})
export class DiagnoseModule {}
