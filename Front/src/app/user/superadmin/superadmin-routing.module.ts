import { SuperadminComponent } from './superadmin.component';
import { Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminSetComponent } from './admin-set/admin-set.component';
import { AdminAddComponent } from './admin-add/admin-add.component';

export const  routes: Routes =
[
  {
  path: '',
  component: SuperadminComponent,
  children: [
      {
          path: '',
          redirectTo: 'lista',
          pathMatch: 'prefix'
      },
      {
          path: 'lista',
          component: AdminListComponent
      },
      {
          path: 'modificar',
          component: AdminSetComponent
      },
      {
          path: 'agregar',
          component: AdminAddComponent
      }
  ]
  }
];
