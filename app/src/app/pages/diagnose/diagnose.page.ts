import { Component, OnInit } from '@angular/core';

import {Diagnose} from '../../interfaces/diagnose.interface';
import {ApiService} from '../../services/api.service';
import { AlertController, ModalController } from '@ionic/angular';
import {DiagnoseAddComponent } from '../../components/diagnose-add/diagnose-add.component'

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})

export class DiagnosePage implements OnInit {

  diagnose:Diagnose;
  commentsNumber:number;

  constructor(
    private api:ApiService,
    private alert:AlertController,
    private modal:ModalController) {
   }

  ngOnInit() {

    this.getDiagnoses();
  }

  createDiagnose(){
    this.api.createDiagnose("Kuža ima rdečico", "rdečica se je pojavila na spodnji strani rebra",["Mogoče bi pomagala krema xyz"],["janez"], 3).subscribe(res => {
      console.log(res);
    })
  }

  getDiagnoses(){
    this.api.getAllDiagnoses().subscribe( res => {
      console.log(res);
      this.diagnose = res;
    })
  }

  async openModal(){
    const modal = await this.modal.create({
      component: DiagnoseAddComponent,
      backdropDismiss: true
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

}
