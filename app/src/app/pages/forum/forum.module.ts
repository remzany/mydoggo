import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForumPageRoutingModule } from './forum-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { ForumPage } from './forum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ForumPageRoutingModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule {}
