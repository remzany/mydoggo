import { Component, OnInit } from '@angular/core';

import { HttpRequestService} from '../../services/http-request.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {

  title:string = "";

  constructor(private httpReq:HttpRequestService) { }

  ngOnInit() {
    this.title = this.httpReq.getDogData().dogBreed;
  }

}
