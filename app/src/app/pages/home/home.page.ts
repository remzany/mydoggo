import { Component } from '@angular/core';

import {HttpRequestService} from '../../services/http-request.service';

import { ModalController, AlertController } from '@ionic/angular';

import { Router } from "@angular/router";

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dogName:string = "/";
  dogBreed:string = "/";
  todos:Array<string> = [];

  constructor(private alert:AlertController, private httpReq: HttpRequestService, private modalController: ModalController, private router:Router, private secureStorage: SecureStorage){
    this.todos = this.httpReq.getTodos();
  }

  ngOnInit(){
    console.log("hello from home page");

    this.dogName = this.httpReq.getDogData().dogName;
    this.dogBreed = this.httpReq.getDogData().dogBreed;
    
  }

  async openTOdo(){

      const alert = await this.alert.create({
        header: `Please add task`,
        inputs:[
          {
            name: "todo",
            type: "text"
          }
        ],
          buttons: [
            {
              text: 'Ok',
              handler: (a) => {
                this.todos.push(a.todo);
                this.httpReq.saveUserTodo(this.todos);
              }
            }
          ]})
          await alert.present();
  }

  logOut(){
    this.router.navigate(['login']);
  }

  delete(i:number){
    this.todos.splice(i, 1);
  }

  

}
