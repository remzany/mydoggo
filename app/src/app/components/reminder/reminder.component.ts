import { Component, OnInit } from '@angular/core';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})

export class ReminderComponent implements OnInit {

  text:string = "";
  todaysDate: String = new Date().toISOString();


  //set default timer, probably same as before
  time:string = "";

  constructor(private localNotifications: LocalNotifications, private platform:Platform) { }

  ngOnInit() {

  }

  createNotification(){
    try{
      this.localNotifications.schedule({
        id: 1,
        text: 'Single ILocalNotification',
        sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
        data: { secret: this.text }
      });
    }catch(e){
      alert(e);
    }

  }

}
