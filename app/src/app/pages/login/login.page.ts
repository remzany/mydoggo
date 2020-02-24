import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavController } from '@ionic/angular';

import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public createEmail: string;
  public createPassword: string;
  public signInEmail: string = "new@new.com";
  public signInPassword: string = "new";
  public jwt: string;

  constructor(private http: HttpClient, private navCtrl:NavController, private httpReq:HttpRequestService){

  }

  ngOnInit(){

  }

  createAccount(){

    this.httpReq.createAccount(this.createEmail, this.createPassword).subscribe(a =>{
      console.log(a);
    })


  }

  signIn(){

    this.httpReq.signin(this.signInEmail, this.signInPassword);

  }

  testRoute(){

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt)

    this.http.get('http://localhost:3000/users/getlist', {headers: headers}).subscribe((res) => {
      console.log(res);

      //


    },err => {
      console.log("Error" + err);
    });
  }



  logout(){
    this.jwt = null;
  }

}