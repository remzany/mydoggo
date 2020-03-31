import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes_old: Routes = [
  {
    path: '',
    redirectTo: '/app/users',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../users/users.module').then(m => m.UsersPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../account/account.module').then(m => m.AccountPageModule)
          }
        ]
      }
    ]
  }
];

const routes_new: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'forum',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../forum/forum.module').then(m => m.ForumPageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'training',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../training/training.module').then(m => m.TrainingPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes_new)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
