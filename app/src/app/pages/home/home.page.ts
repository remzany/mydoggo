import { Component, OnInit } from '@angular/core';

import {HttpRequestService} from '../../services/http-request.service';
import {PhotoGalleryService} from '../../services/photo-gallery.service';

import { ModalController, AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

import { ApiService, User } from '../../services/api.service';

import { TranslateConfigService } from '../../services/translate-config.service';

import {TranslateService} from '@ngx-translate/core';

import {ReminderComponent } from '../../components/reminder/reminder.component';
 
import { Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  dogName = '/';
  dogBreed = '/';
  todos:Array<string> = [];
  user:User;
  doesUserHaveDog = false;

  selectedLanguage:string;
  todo_label = '';
  ImagePath:string = "";

  constructor(
    private alert:AlertController,
    private api:ApiService,
    private httpReq: HttpRequestService,
    private modalController: ModalController,
    private router:Router,
    private secureStorage: SecureStorage,
    private translateConfigService: TranslateConfigService,
    private translate:TranslateService,
    private platform: Platform,
    private photoLibrary: PhotoGalleryService
    ){}

  async ngOnInit(){
    this.loadUserData();
    let x = await this.api.getLocalDogBaseImage('dog_image');
    this.ImagePath = x == null ? "" : x;
    
    this.translateConfigService.getDefaultLanguage();
  }

  loadUserData(){
    this.api.getUserData().subscribe(a =>{
      this.user = a;
      if(a.dogBreed === undefined && a.dogName === undefined){
        this.openAddDog();
        this.doesUserHaveDog = false;
      }else{
        this.dogBreed = this.user.dogBreed;
        this.dogName = this.user.dogName;
        this.todos = this.user.todos;
        this.doesUserHaveDog = true;
      }
    })
  }
  async openTOdo(){

    const alert = await this.alert.create({
      header: this.translate.instant('HOME.todo_label'),
      inputs:[
        {
          name: 'todo',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (a) => {
            this.todos.push(a.todo);
                this.api.updateUser(this.user._id, {todos: this.todos}).subscribe(a => {
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
    const index = this.todos.indexOf(todo);

    if(index > -1){
      this.todos.splice(index, 1);
      this.api.updateUser(this.user._id, {todos: this.todos}).subscribe(a => {
        console.log(a);
      })
    }

  }

  done(todo){
    const index = this.todos.indexOf(todo);

    if(index > -1){
      this.todos.splice(index, 1);
      this.api.updateUser(this.user._id, {todos: this.todos}).subscribe(a => {
        console.log(a);
      })
    }
  }

  async openGallery(){
    
    this.photoLibrary.openGallery().then(res => {
      this.ImagePath = res;
      this.api.saveLocalDogBaseImage("dog_image", this.ImagePath);
    });
  }

  async openAddDog(){
    const alert = await this.alert.create({
      header: this.translate.instant('HOME.add_dog'),
        buttons: [
          {
            text: this.translate.instant('BUTTON.yes'),
            handler: () => {
              this.router.navigateByUrl('/dog-form');
            }
          },
          {text: this.translate.instant('BUTTON.no'),}
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
      this.todos = a.todos;

      if(a.dogBreed === undefined && a.dogName === undefined){
        this.doesUserHaveDog = false;
      }else{
        this.dogBreed = this.user.dogBreed;
        this.dogName = this.user.dogName;
        this.todos = this.user.todos;
        this.doesUserHaveDog = true;
      }

    });

    setTimeout(() => {
      event.target.complete();
    }, 2000);

  }
}
