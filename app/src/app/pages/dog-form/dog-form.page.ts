import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { HttpRequestService } from '../../services/http-request.service';

import { DogStats, DogFormData } from '../../interfaces/dog.interface';

import { NavController } from '@ionic/angular';


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
  
  dogData:DogFormData = {breed:"",name:"",date:""};

  constructor(private navCtrl:NavController, private alert:AlertController, private httpReq: HttpRequestService) { }

  ngOnInit() {
    //.subscribe(dogData => console.log(dogData))
    console.log("listing dog data");
    this.httpReq.getDogsBreed().subscribe((data: Array<DogStats>) => {
      data.map(a => {
        console.log(a.name);
        this.requestedData.push(a.name);
      })
      this.breed = this.requestedData;
    });
  }

  updateAccount(){
    this.httpReq.updateAccount(true, this.dogData.name, this.dogData.breed, this.dogData.date).subscribe(res => {
      console.log(res);

      this.navCtrl.navigateRoot('tabs');
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
    
    if(this.dogData.date == "")
      arr.push("date");

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

}
