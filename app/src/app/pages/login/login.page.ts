import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavController } from '@ionic/angular';

import {HttpRequestService} from '../../services/http-request.service';
import {ProtectLoginService} from '../../services/protect-login.service';

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

  register:boolean = false;

  constructor(private http: HttpClient, private navCtrl:NavController, private httpReq:HttpRequestService, private protectLogin:ProtectLoginService){

  }

  ngOnInit(){

  }

  segmentChanged(ev:any){

    this.register = !this.register;
    console.log(ev);
  }

  createAccount(){
    if(this.createEmail != "email"){
      this.httpReq.createAccount(this.createEmail, this.createPassword).subscribe(a =>{
        console.log("error");
        console.log(a);
      })
    }

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

  checkIfUserKnowsSecretPassphase(){
    if(this.createEmail == "email" && this.createPassword == "bernski_plansar1")
      this.protectLogin.setPassphase(true);
  }

  logout(){
    this.jwt = null;
  }

}