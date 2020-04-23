import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SecureStorage} from '@ionic-native/secure-storage/ngx';
import { TranslateModule } from '@ngx-translate/core';

import { ReminderComponent } from '../../components/reminder/reminder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers:[
    SecureStorage
  ],
  declarations: [HomePage, ReminderComponent],
  entryComponents:[
    ReminderComponent
  ]
})
export class HomePageModule {}
