import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardGuard } from './guards/auth-guard.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = 
[
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'dog-form',
    loadChildren: () => import('./pages/dog-form/dog-form.module').then( m => m.DogFormPageModule), canActivate:[AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
