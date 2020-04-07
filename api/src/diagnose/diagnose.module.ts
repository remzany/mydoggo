import { Module } from '@nestjs/common';
import { DiagnoseService } from './diagnose.service';
import { DiagnoseController } from './diagnose.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiagnoseSchema } from './schemas/diagnose.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Diagnose', schema: DiagnoseSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  providers: [DiagnoseService],
  controllers: [DiagnoseController],
  exports: [DiagnoseService]
})
export class DiagnoseModule {}
