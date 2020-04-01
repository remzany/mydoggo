import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { NeconfigModule } from 'neconfig';
import { BreedModule } from './bread/breed.module';
import { DiagnoseModule } from './diagnose/diagnose.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    NeconfigModule.register({
      readers: [
        { name: 'env', file: path.resolve(process.cwd(), '.env') }
      ]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BreedModule,
    DiagnoseModule,
  ]
})
export class AppModule {}
