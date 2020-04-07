import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DiagnosePage } from './diagnose.page';
import{ DiagnoseAddComponent} from '../../components/diagnose-add/diagnose-add.component'
const routes: Routes = [
  {
    path: '',
    component: DiagnosePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DiagnosePage, DiagnoseAddComponent],
  entryComponents: [
    DiagnoseAddComponent
  ]
})
export class DiagnosePageModule {}
