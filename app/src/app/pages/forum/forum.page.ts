import { Component, OnInit } from '@angular/core';

import { HttpRequestService} from '../../services/http-request.service';

import { ModalController } from '@ionic/angular';
import {BreedSelectionComponent} from '../../components/breed-selection/breed-selection.component';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  title:string = "";

  constructor(private httpReq:HttpRequestService, private modal:ModalController) { }

  ngOnInit() {
    this.title = this.httpReq.getDogData().dogBreed;

  }

  async openSelection() {
    const modal = await this.modal.create({
      component: BreedSelectionComponent
    });
    return await modal.present();
  }

}
