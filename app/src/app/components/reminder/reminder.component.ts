import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

  }

}
