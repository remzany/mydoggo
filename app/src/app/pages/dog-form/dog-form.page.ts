import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { HttpRequestService } from '../../services/http-request.service';

import { DogFormData } from '../../interfaces/dog.interface';

import { NavController } from '@ionic/angular';

import {ApiService, User} from '../../services/api.service';

import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.page.html',
  styleUrls: ['./dog-form.page.scss'],
})
export class DogFormPage implements OnInit {

  breadCardHidden:boolean = true;
  requestedData:Array<string> = [];
  breed:Array<string> = [];
  selectedBread: string = "";
  
  dogData:DogFormData = {breed:"",name:""};
  user:User;

  constructor(private navCtrl:NavController, private alert:AlertController, private httpReq: HttpRequestService, private api:ApiService, private router:Router) { }

  ngOnInit() {
    this.api.getBreed().pipe(tap(
      data => {
        this.requestedData = data;
      }
    )).subscribe();

      this.breed = this.requestedData;

      this.loadUserData();

  }

  updateAccount(){
    let data= {"dogName": this.dogData.name, "dogBreed": this.dogData.breed}

    this.api.updateUser(this.user._id, data).subscribe(res =>{
      console.log(res);

      this.router.navigateByUrl('/tabs');

    })
  }

  loadUserData(){
    this.api.getUserData().subscribe(a =>{
      this.user = a;

    })
  }

  selectBread(i){
    console.log(i);
    this.selectedBread = this.breed[i];
    this.breed = [];
    this.breadCardHidden = true;

    this.dogData.breed = this.selectedBread;
  }

  filterDogsBread(ev:any){
    this.filterOut(ev.target.value);
  }

  filterOut(x:string){

    this.breed = this.requestedData;
    
    this.breed = this.breed.filter(item =>{
      return item.toLowerCase().indexOf(x.toLowerCase()) > -1;
    });
  }

  enableDisableBreadCard(){

    this.breadCardHidden = !this.breadCardHidden;

  }

  emptyBreadSelection(){
    this.selectedBread = "";
    this.breed = this.requestedData;
  }

  next(){
    let arr:Array<string> = [];

    if(this.dogData.name == "")
      arr.push("name");
    
    if(this.dogData.breed == "")
      arr.push("breed");
    
      if(arr.length == 0)
        this.updateAccount();
      else
        this.presentAlertPrompt(arr);
  }

  async presentAlertPrompt(arr:Array<string>) {
    const alert = await this.alert.create({
      header: `Prosim izpolni naslednje polja:  \n ${arr.toString()}`,
        buttons: [
          {
            text: 'Ok',
            handler: () => {}
          }
        ]})
        await alert.present();
  }

  skip(){
    this.router.navigateByUrl('/tabs');
  }

}
