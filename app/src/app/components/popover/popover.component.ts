import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  text = ""

  constructor(private popover:PopoverController, private translate:TranslateService) { }

  ngOnInit() {
    this.text = this.translate.instant('DIAGNOSE.add_new');
  }

  newPost(){
    this.popover.dismiss("newpost");
  }

  myPosts(){
    this.popover.dismiss("myposts");
  }

}
