import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DogSearchPage } from './dog-search.page';

const routes: Routes = [
  {
    path: '',
    component: DogSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DogSearchPageRoutingModule {}
