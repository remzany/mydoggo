import { Component, OnInit } from '@angular/core';

import { HttpRequestService} from '../../services/http-request.service';

import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { DogStats } from '../../interfaces/dog.interface';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  title:string = "";
  dog:Observable<DogStats[]>;
  dogBreed:Array<{name:string, val:boolean}> = [];

  selected = "Akita";

  constructor(private httpReq:HttpRequestService, private modal:ModalController) { }

  ngOnInit() {
    this.title = this.httpReq.getDogData().dogBreed;

    console.log(this.title);
  }

  openModal(){
    this.dog = this.httpReq.getDogsBreed();
    
    this.dog.subscribe( a => {
      a.forEach(element => {
        this.dogBreed.push({name: element.name, val:true});
      });
    });

  }
}
