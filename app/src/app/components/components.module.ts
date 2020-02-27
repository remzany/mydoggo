import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TodoComponent} from './todo/todo.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents:[
    TodoComponent
  ]
})
export class ComponentsModule { }
