import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DogSearchPageRoutingModule } from './dog-search-routing.module';

import { DogSearchPage } from './dog-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DogSearchPageRoutingModule
  ],
  declarations: [DogSearchPage]
})
export class DogSearchPageModule {}
