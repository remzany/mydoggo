import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
      canActivate: [AutoLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterPageModule),
      canActivate: [AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dog-form',
    loadChildren: () => import('./pages/dog-form/dog-form.module').then( m => m.DogFormPageModule), canActivate:[AuthGuard]
  },
  { path: 'diagnose', loadChildren: './pages/diagnose/diagnose.module#DiagnosePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
