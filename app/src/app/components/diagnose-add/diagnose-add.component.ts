import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnose-add',
  templateUrl: './diagnose-add.component.html',
  styleUrls: ['./diagnose-add.component.scss'],
})
export class DiagnoseAddComponent implements OnInit {

  labels:Array<string> = ["TITLE", "DESCRIPTION"];
  
  constructor() { }

  ngOnInit() {}

}
