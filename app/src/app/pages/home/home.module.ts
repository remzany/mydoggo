import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SecureStorage} from '@ionic-native/secure-storage/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule} from '@ionic/storage';
import { ReminderComponent } from '../../components/reminder/reminder.component';
import { DogProfileComponent } from '../../components/dog-profile/dog-profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule,
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
  declarations: [HomePage, ReminderComponent, DogProfileComponent],
  entryComponents:[
    ReminderComponent,
    DogProfileComponent
  ]
})
export class HomePageModule {}
