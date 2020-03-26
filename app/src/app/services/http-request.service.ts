import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogStats } from '../interfaces/dog.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavController } from '@ionic/angular';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';

import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  uid:string = "";
  jwt:string = "";
  dogName:string = "";
  dogBreed:string = "";
  todos:Array<string> = [];

  constructor(
      private http: HttpClient,
      private navCtrl:NavController,
      private secureStorage:SecureStorage,
      private platform: Platform) {}

  getDogsBreed(): Observable<Array<DogStats>> {
    return this.http.get('api/breed/getBreeds').pipe(map((response: Array<DogStats>) => response));
  }

  signin(email:string, password: string){

    let credentials = {
      email: email,
      password: password
    }

    this.http.post('api/auth', credentials).subscribe((res: any) => {
      console.log(res);

      this.dogName = res.dogName;
      this.dogBreed = res.dogBreed;
      this.todos = res.userTodos;
      this.uid = res._id;
      this.jwt = res.token;
      let x = this.jwt.split('.')[1];

      let userData = atob(x);

      this.platform.ready().then(() => {
        
      })

      if(!res.dogOwner)
        this.navCtrl.navigateRoot('dog-form');
      else
        this.navCtrl.navigateRoot('tabs');

    });

  }

  createAccount(email: string, password: string) {

    let credentials = {
      email: email,
      password: password,
      dogOwner: false,
      dogName: "/",
      dogBreed: "/",
      dogBirthDay: "01/01/2000",
      userTodos: []
    }

    return this.http.post('api/users', credentials).pipe(map((response: any) => {
      this.uid = response.id;
      return response;
    }));
  }

  //something wrong with ID
  updateAccount(dogOwner:boolean, dogName: string, dogBreed: string, dogBirthDay:string){

    let data = {
      uid: this.uid,
      dogOwner: dogOwner,
      dogName: dogName,
      dogBreed: dogBreed,
      dogBirthDay: dogBirthDay
    };

    console.log(data);
    return this.http.post('api/users/updateUser', data).pipe(map((response: any) => {
      return response;
    }));
  }

  getDogData(){
    let data = {
      dogName: this.dogName,
      dogBreed: this.dogBreed
    };
    return data;
  }

  getTodos(){
    return this.todos;  
  }

  saveUserTodo(arr:Array<string>){

    let data = {
      uid: this.uid,
      userTodos: arr
    };

    console.log("console of saveUserTOdo");
    console.log(data);

    return this.http.post('api/users/updateUserTodos', data).pipe(map((res: any) => {
      return res;
    })) 

  }


}
