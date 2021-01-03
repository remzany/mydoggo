import { Component } from '@angular/core';

import {HttpRequestService} from '../../services/http-request.service';

import { ModalController, AlertController } from '@ionic/angular';

import { Router } from "@angular/router";

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

import { ApiService, User } from '../../services/api.service';

import { TranslateConfigService } from '../../services/translate-config.service';

import {TranslateService} from '@ngx-translate/core';

import {ReminderComponent } from '../../components/reminder/reminder.component';
 
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dogName:string = "/";
  dogBreed:string = "/";
  todos:Array<string> = [];
  user:User;

  selectedLanguage:string;
  todo_label:string = "";

  constructor(
    private alert:AlertController,
    private api:ApiService, 
    private httpReq: HttpRequestService, 
    private modalController: ModalController,
    private router:Router, 
    private secureStorage: SecureStorage,
    private translateConfigService: TranslateConfigService,
    private translate:TranslateService,
    private platform: Platform
    ){}

  ngOnInit(){
    console.log("hello from home page");
    this.loadUserData();

    this.translateConfigService.getDefaultLanguage();
 
  }

  loadUserData(){
    this.api.getUserData().subscribe(a =>{
      console.log(a);
      this.user = a;

      if(a.dogBreed == "" && a.dogName == "" || a.dogBreed == null && a.dogName == null){
        this.openAddDog();
      }else{
        this.dogBreed = this.user.dogBreed;
        this.dogName = this.user.dogName;
        this.todos = this.user.todos;
      }

    })
  }
  
  async openTOdo(){

    const alert = await this.alert.create({
      header: this.translate.instant('HOME.todo_label'),
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
                this.api.updateUser(this.user._id, {"todos": this.todos}).subscribe(a => {
                  console.log(a);
                })
              }
            }
          ]})
          await alert.present();
  }


  signOut() {
    this.api.logout();
  }
  
  delete(todo){
    let index = this.todos.indexOf(todo);

    if(index > -1){
      this.todos.splice(index, 1);
      this.api.updateUser(this.user._id, {"todos": this.todos}).subscribe(a => {
        console.log(a);
      })
    }

  }

  done(todo){
    let index = this.todos.indexOf(todo);

    if(index > -1){
      this.todos.splice(index, 1);
      this.api.updateUser(this.user._id, {"todos": this.todos}).subscribe(a => {
        console.log(a);
      })
    }
  }

  async openAddDog(){
    const alert = await this.alert.create({
      header: `Would you like to add a dog?`,
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.router.navigateByUrl('/dog-form');
            }
          },
          {text: "No"}
        ]})
        await alert.present();
  }

  async reminder(){

    if(this.platform.is('mobile')){
      const modal = await this.modalController.create({
        component: ReminderComponent,
        backdropDismiss: true
      })
      return await modal.present();
    }else{
      const alert = await this.alert.create({
        header: this.translate.instant('REMINDER.useMobile'),
          buttons: [
            {
              text: 'Ok',
            }
          ]})

        await alert.present();
        return null;
    }



  }


  doRefresh(event){
    this.api.getUserData().subscribe(a =>{
      console.log(a);
      this.todos = a.todos;
    });

    setTimeout(() => {
      event.target.complete();
    }, 2000);

  }
  
  
}
