import { Component } from '@angular/core';

import {HttpRequestService} from '../../services/http-request.service';

import { ModalController } from '@ionic/angular';

import {TodoComponent} from '../../components/todo/todo.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dogName:string = "/";
  dogBreed:string = "/";
  todos:Array<string> = [];

  constructor(private httpReq: HttpRequestService, private modalController: ModalController){
    this.todos = this.httpReq.getTodos();
  }

  ngOnInit(){
    this.dogName = this.httpReq.getDogData().dogName;
    this.dogBreed = this.httpReq.getDogData().dogBreed;
    console.log("hello from home page");
  }

  async openTOdo(){
    const modal = await this.modalController.create({
      component: TodoComponent,
      componentProps: { value: this.todos},
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(() => {
      this.saveTodos();
    })
    return await modal.present();

  }

  saveTodos(){
    this.httpReq.saveUserTodo(this.todos).subscribe(res => {
      console.log(res);
    });
  }


  

}
