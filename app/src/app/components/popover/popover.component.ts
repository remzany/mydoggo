import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popover:PopoverController) { }

  ngOnInit() {}

  newPost(){
    this.popover.dismiss("newpost");
  }

  myPosts(){
    this.popover.dismiss("myposts");
  }

}
