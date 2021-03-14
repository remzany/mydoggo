import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})

export class ReminderComponent implements OnInit {

  text:string = "";
  todaysDate: any;
  time:any;

  //set default timer, probably same as before
 

  constructor(private platform:Platform) { }

  ngOnInit() {
  }

  async createNotification(){
    // let mergedDateTime = this.todaysDate.split("T")[0] + this.time.split("T")[1];

    // TRY TO USE ON LOAD NOTIFICATION; MAYBE THEN IT WILL WORK

    let dateObject = {
      year: this.todaysDate.split("T")[0].split("-")[0],
      month: this.todaysDate.split("T")[0].split("-")[1],
      day: this.todaysDate.split("T")[0].split("-")[2],
      hour: this.time.split("T")[1].split(".")[0].split(":")[0],
      minute: this.time.split("T")[1].split(".")[0].split(":")[1],
      second: 0,
      miliseconds: 0
    }

    alert(JSON.stringify(LocalNotifications));

    // await LocalNotifications.requestPermissions();
    // const notifs = await LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       title: "Title",
    //       body: "Body",
    //       id: 1,
    //       schedule: { at: new Date(Date.now() + 1000 * 5) },
    //       sound: null,
    //       attachments: null,
    //       actionTypeId: "",
    //       extra: null
    //     }
    //   ]
    // });

    //   alert(notifs)
  }

}
