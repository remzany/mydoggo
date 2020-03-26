import { Component, OnInit } from '@angular/core';

import { HttpRequestService} from '../../services/http-request.service';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { DogStats } from '../../interfaces/dog.interface';

import {ApiService} from '../../services/api.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  dog:Observable<Array<{name:string, val:boolean}>>;
  dogBreed:Array<{name:string, val:boolean}> = [];

  selected = "";

  constructor(private httpReq:HttpRequestService, 
    private modal:ModalController,
    private api:ApiService) { }

  ngOnInit() {
    this.api.getUserData().subscribe(a => {
      this.selected = a.dogBreed;
    })
  }

  openModal(){
    this.api.getBreed().subscribe(a =>{
      a.forEach(element => {
        this.dogBreed.push({name: element, val:false});
      })
    });
  }
    signOut(){
      this.api.logout();
    }

}
