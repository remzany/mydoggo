import { Component, OnInit } from '@angular/core';

import {Diagnose} from '../../interfaces/diagnose.interface';
import {ApiService} from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import {DiagnoseAddComponent } from '../../components/diagnose-add/diagnose-add.component'

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';


@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})

export class DiagnosePage implements OnInit {

  diagnose:Array<Diagnose>;
  commentsNumber:number;

  constructor(
    private api:ApiService,
    private alert:AlertController,
    private modal:ModalController,
    private popoverController: PopoverController) {
   }

  ngOnInit() {
    this.getDiagnoses();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then(data => {
      console.log(data);

      if(data.data != null || data.data != ""){
        if(data.data == "newpost")
          this.openModal();
      }
    })
    return await popover.present();
  }

  getDiagnoses(){
    this.api.getAllDiagnoses().subscribe( res => {
      this.diagnose = res;
    })
  }

  async openModal(){
    const modal = await this.modal.create({
      component: DiagnoseAddComponent,
      backdropDismiss: true
    })

    modal.onDidDismiss().then(res => {
      console.log(res.data);
      this.diagnose.unshift(res.data);
    })
    return await modal.present();
  }

  async openError(x:any){
    let alert = await this.alert.create({
      header:  x,
      buttons: [
        {
          text: 'Ok',
            }
          ]})
          alert.present();
  }

  doRefresh(event){
    this.api.getAllDiagnoses().subscribe( res => {
      this.diagnose = res;
    });

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  upVote(i){

    let data = {
      "_id" : this.diagnose[i]._id
    }

    this.api.upvoteDiagnose(data).subscribe(res => {
      this.diagnose[i].likeCount = res.likeNumber;
    });
  }

  downVote(i){
    let data = {
      "_id" : this.diagnose[i]._id
    }

    this.api.downvoteDiagnose(data).subscribe(res => {
      this.diagnose[i].likeCount = res.likeNumber;
    });
  }

}
