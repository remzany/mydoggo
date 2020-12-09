import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-diagnose-add',
  templateUrl: './diagnose-add.component.html',
  styleUrls: ['./diagnose-add.component.scss'],
})
export class DiagnoseAddComponent implements OnInit {

  lastSelected_01:any = null;
  lastSelected_02:any = null;

  item:{title:string, description:string} = {title:"", description:""};
  selectedTag:string = "";

  ngAfterViewInit(){
  }

  constructor(private renderer:Renderer2, private api:ApiService, private modal:ModalController) { }

  ngOnInit() {}

  click(ev:any){
    let x;

    if(ev.localName == "tspan"){
      let y = ev.id;
      y = y.substr(1);
      this.selectedTag = y;
      x =document.getElementById(y);
      this.renderer.setStyle(ev, 'fill', '#f00');
      this.renderer.setStyle(x, 'fill', '#f00');
    }else{
      this.selectedTag = ev.id;
      x =document.getElementById("_" + ev.id);
      this.renderer.setStyle(ev, 'fill', '#f00');
      this.renderer.setStyle(x, 'fill', '#f00');
    }

    if(this.lastSelected_01 != null && this.lastSelected_01 != ev && this.lastSelected_02 != ev){
      this.renderer.setStyle(this.lastSelected_01, 'fill', '#fff');

      if(this.lastSelected_01.localName == "tspan")
        this.renderer.setStyle(this.lastSelected_01, 'fill', '#000');

    }

    if(this.lastSelected_02 != null && this.lastSelected_01 != ev && this.lastSelected_02 != ev){
      this.renderer.setStyle(this.lastSelected_02, 'fill', '#fff');

      if(this.lastSelected_02.localName == "tspan")
        this.renderer.setStyle(this.lastSelected_02, 'fill', '#000');
    }

      

    this.lastSelected_01 = ev;
    this.lastSelected_02 = x;
    
  }

  save(){
    let x = 0;

    if(this.item.title != "" && this.item.title != null)
      x++;

    if(this.item.description != "" && this.item.description != null)
      x++;

    if(this.selectedTag != "" && this.selectedTag != null)
      x++;

    if(x == 3)
      this.createDiagnose();
  }

  createDiagnose(){
    this.api.createDiagnose(this.item.title, this.item.description, this.selectedTag).subscribe(res => {
      console.log(res);
      this.modal.dismiss();
    })

    
  }

}
