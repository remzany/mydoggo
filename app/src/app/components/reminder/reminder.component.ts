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
  time:string = "";

  //set default timer, probably same as before
 

  constructor(private localNotifications: LocalNotifications, private platform:Platform) { }

  ngOnInit() {
  }

  createNotification(){
    let mergedDateTime = this.todaysDate.split("T")[0] + this.time.split("T")[1];
    try{
      this.localNotifications.schedule({
        id: 1,
        text: this.text,
        sound: this.platform.is('android')? 'file://sound.mp3': 'file://beep.caf',
        data: { secret: this.text },
        trigger: { at: new Date(mergedDateTime) }
      });
    }catch(e){
      alert(e);
    }finally{

    }

  }

}
