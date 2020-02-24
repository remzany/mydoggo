import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {BreedModule} from './breed/breed.module';

import {TypegooseModule} from 'nestjs-typegoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/myDoggo'),
    TypegooseModule.forRoot("mongodb://localhost/myDoggo", {
      useNewUrlParser: true
    }),
    UsersModule,
    AuthModule,
    BreedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
