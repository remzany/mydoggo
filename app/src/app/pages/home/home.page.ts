import { Component } from '@angular/core';

import {HttpRequestService} from '../../services/http-request.service';

import { ModalController, AlertController } from '@ionic/angular';

import { Router } from "@angular/router";

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

import { ApiService, User } from '../../services/api.service';

import { TranslateConfigService } from '../../services/translate-config.service';
 

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

  constructor(
    private alert:AlertController,
    private api:ApiService, 
    private httpReq: HttpRequestService, 
    private modalController: ModalController,
    private router:Router, 
    private secureStorage: SecureStorage,
    private translateConfigService: TranslateConfigService
    ){}

  ngOnInit(){
    console.log("hello from home page");

    this.loadUserData();
    // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.translateConfigService.setLanguage("en");
  }

  loadUserData(){
    this.api.getUserData().subscribe(a =>{
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
                this.api.updateUser(this.user._id, {"todos": this.todos}).subscribe(a => {
                  console.log(a);
                })
              }
            }
          ]})
          await alert.present();
        }
        
  logOut(){
    this.router.navigate(['']);
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
  
  
}
