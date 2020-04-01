import { Component, OnInit } from '@angular/core';

import {Question} from '../../interfaces/diagnose.interface';
import {ApiService} from '../../services/api.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.page.html',
  styleUrls: ['./diagnose.page.scss'],
})

export class DiagnosePage implements OnInit {

  questions:Array<Question> = [{title: "Pes ima rdečico na sprednji tački", comments: 0, upvotes: 3, imageUrl: "/"}];

  constructor(private api:ApiService, private alert:AlertController) {
   }

  ngOnInit() {
    this.api.getDiagnose().subscribe(res => {
      console.log(res);
    }, async err => {
      this.openError(err.error['msg']);
    });
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
