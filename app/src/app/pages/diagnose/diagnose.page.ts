import { Component, OnInit } from '@angular/core';

import {Question} from '../../interfaces/diagnose.interface';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})

export class DiagnosePage implements OnInit {

  questions:[Question];

  constructor() {
    this.questions.push({title: "Marusa kakec", comments: 0, upvotes: 3, imageUrl: "/"});
   }

  ngOnInit() {
  }

}
