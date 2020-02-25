import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TodoComponent} from './todo/todo.component';
import {BreedSelectionComponent} from './breed-selection/breed-selection.component';

import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [TodoComponent, BreedSelectionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents:[
    TodoComponent,
    BreedSelectionComponent
  ]
})
export class ComponentsModule { }
