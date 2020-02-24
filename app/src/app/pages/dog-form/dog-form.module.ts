import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogFormPageRoutingModule } from './dog-form-routing.module';

import { DogFormPage } from './dog-form.page';

import { AlertController } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogFormPageRoutingModule
  ],
  declarations: [DogFormPage],
  providers:[
    AlertController
  ]
})
export class DogFormPageModule {}
