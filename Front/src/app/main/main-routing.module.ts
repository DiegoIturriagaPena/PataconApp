import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { ContainerComponent } from './container/container.component';

export const  routes: Routes =
[
  {
  path: '',
  component: MainComponent,
  children: [
    /*{
      path: '',
      component: ContainerComponent,
      children: [
        {
          path: 'index',
          component: IndexComponent
        },
        {
          path: 'servicios',
          component: ServicesComponent
        }, 
        {
        path: '',
        redirectTo: 'index',
        pathMatch: 'prefix'
        }
      ]
    },*/
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'prefix'
    },
    {
        path: 'login',
        component: LoginComponent
    }
  ]
  }
];
