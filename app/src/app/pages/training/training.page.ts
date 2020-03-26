import { Component, OnInit } from '@angular/core';


import { ApiService, User } from '../../services/api.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  signOut(){
    this.api.logout();
  }
}
