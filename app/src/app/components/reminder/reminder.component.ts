import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';

import { ModalController } from '@ionic/angular';

interface Reminder{
    title:string,
    date:{
      year:string, month:string, day: string, hour: string, minute: string
    },
    recurrence:string
};

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})

export class ReminderComponent implements OnInit {

  text:string;
  todaysDate: any;
  time:any;
  recurrence = false;
  recurrenceValue:string;
  reminders: Array<Reminder>

  constructor(
    private platform:Platform,
    private localNotification:LocalNotifications,
    private calendar: Calendar,
    private modal:ModalController) { }

  async ngOnInit() {
    if(!this.localNotification.hasPermission)
      await this.localNotification.requestPermission()

      await this.calendar.requestReadWritePermission();
  }

  async createCalender(){
    const dateObject = {
      year: this.todaysDate.split('T')[0].split('-')[0],
      month: this.todaysDate.split('T')[0].split('-')[1],
      day: this.todaysDate.split('T')[0].split('-')[2],
      hour: this.time.split('T')[1].split('.')[0].split(':')[0],
      minute: this.time.split('T')[1].split('.')[0].split(':')[1],
      second: 0,
      miliseconds: 0
    }

    const calOptions = this.calendar.getCalendarOptions();
    calOptions.id = new Date().getTime().toString();
    if(this.recurrence) calOptions.recurrence = this.recurrenceValue;
    this.calendar.createEventInteractively(this.text,'','',
    new Date(dateObject.year,(dateObject.month-1),dateObject.day,dateObject.hour,dateObject.minute))
    .then(()=>{
      alert('Event is set');
    })


    this.modal.dismiss();
  }

  segmentChanged(ev:any){
    this.recurrenceValue = ev.target.value
  }
}
