import { Component, OnInit } from '@angular/core';

import {Question} from '../../interfaces/diagnose.interface';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})

export class DiagnosePage implements OnInit {

  questions:Array<Question> = [{title: "Marusa moja lepotica", comments: 0, upvotes: 3, imageUrl: "/"}];

  constructor() {
   }

  ngOnInit() {
  }

}
