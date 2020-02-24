import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogFormPage } from './dog-form.page';

const routes: Routes = [
  {
    path: '',
    component: DogFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogFormPageRoutingModule {}
