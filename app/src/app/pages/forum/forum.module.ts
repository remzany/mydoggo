import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumPageRoutingModule } from './forum-routing.module';
import {ComponentsModule} from '../../components/components.module';

import { ForumPage } from './forum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule {}
