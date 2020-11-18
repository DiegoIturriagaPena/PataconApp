import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { MapsComponent } from '../user/shared/maps/maps.component';
import { ChoferComponent } from '../user/shared/chofer/chofer.component';
import { ListaChoferesComponent } from '../user/shared/lista-choferes/lista-choferes.component';
import { ModificarCuentaComponent } from '../user/shared/modificar-cuenta/modificar-cuenta.component';
import { AgregarCamionComponent } from '../user/shared/agregar-camion/agregar-camion.component';
import { CamionesComponent } from '../user/shared/lista-camiones/lista-camiones.component';
import {AgregarRutaComponent} from '../user/shared/agregar-ruta/agregar-ruta.component';
import { ListaRutasComponent } from '../user/shared/lista-rutas/lista-rutas.component';
import { DashboardComponent } from '../user/shared/dashboard/dashboard.component';
import { ListarRecorridoComponent } from '../user/shared/listar-recorrido/listar-recorrido.component';
import { CrearRecorridoComponent } from '../user/shared/crear-recorrido/crear-recorrido.component';
import { ListaProductoresComponent } from '../user/shared/lista-productores/lista-productores.component';
import { AgregarProductoresComponent } from '../user/shared/agregar-productores/agregar-productores.component';
import { AdminListComponent } from '../user/superadmin/admin-list/admin-list.component';
import { AdminSetComponent } from '../user/superadmin/admin-set/admin-set.component';
import { AdminAddComponent } from '../user/superadmin/admin-add/admin-add.component';
import { EditarCamionComponent } from '../user/shared/editar-camion/editar-camion.component';
import { EditarChoferComponent } from '../user/shared/editar-chofer/editar-chofer.component';
import { CrearGpsComponent } from '../user/shared/crear-gps/crear-gps.component';
import { ListaFlotaComponent } from '../user/shared/lista-flota/lista-flota.component';
import { ListaGpsComponent } from '../user/shared/lista-gps/lista-gps.component';
import { ListarVinasComponent } from '../user/shared/vinas/listar-vinas/listar-vinas.component';
import { AgregarVinasComponent } from '../user/shared/vinas/agregar-vinas/agregar-vinas.component';
import { EditarGpsComponent } from '../user/shared/editar-gps/editar-gps.component';
import { CrearUsuarioFirebaseComponent } from '../user/shared/crear-usuario-firebase/crear-usuario-firebase.component';
import { ListarUvaComponent } from '../user/shared/uva/listar-uva/listar-uva.component';
import { SuperadminGuard } from '../guards/superadmin.guard';
import { ModificarVinasComponent } from '../user/shared/vinas/modificar-vinas/modificar-vinas.component';
import { EditarRutaComponent } from '../user/shared/editar-ruta/editar-ruta.component';
import { DespachosComponent } from '../user/shared/despachos/despachos/despachos.component';

export const  routes: Routes =
[
  {
  path: '',
  component: SystemComponent,
  children: [
      {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'prefix'
      },
      {
          path: 'dashboard',
          component: DashboardComponent
      },
      {
          path: 'mapa',
          component:  MapsComponent
      },
      {
          path: 'agregarChofer',
          component: ChoferComponent,
      },
      {
          path: 'listaChofer',
          component: ListaChoferesComponent, 
      },
      {
        path: 'modificarCuenta',
        component: ModificarCuentaComponent,
      },
      {
          path: 'agregarCamion',
          component: AgregarCamionComponent,
      },
      {
          path: 'flota',
          component: ListaFlotaComponent,
      },
      {
          path: 'listarRuta',
          component: ListaRutasComponent
      },
      {
        path:'agregarRuta',
        component:AgregarRutaComponent
      },
      {
          path: 'supervisores',
          loadChildren: '../user/superadmin/superadmin.module#SuperadminModule',
          canActivate: [SuperadminGuard]
          // loadChildren: './system/system.module#SystemModule',
      },
        {
        path: 'uva',
        component: ListarUvaComponent,
        canActivate: [SuperadminGuard]
        // loadChildren: './system/system.module#SystemModule',
        },
      {
          path: 'listarProductor',
          component: ListaProductoresComponent
      },
      {
          path: 'agregarProductor',
          component: AgregarProductoresComponent
      },
      {
          path:'listaRecorridos',
          // component: ListarRecorridoComponent
          component: DespachosComponent
      },
      {
          path: 'agregarRecorrido',
          component: CrearRecorridoComponent
      },
      {
          path:'editarCamion',
          component: EditarCamionComponent,
      },
      {
          path: 'editarChofer',
          component: EditarChoferComponent
      },
      {
          path: 'agregarGps',
          component: CrearGpsComponent
      },
      {
          path: 'listaGps',
          component: ListaGpsComponent
      },
      {
          path: 'listaCamiones',
          component: CamionesComponent
      },
      {
          path: 'listavinas',
          component: ListarVinasComponent
      },
      {
          path: 'agregarvina',
          component: AgregarVinasComponent
      },
      {
          path: 'editarGps',
          component: EditarGpsComponent,
      },
      {
          path: 'crearUsuarioFirebase',
          component: CrearUsuarioFirebaseComponent
      },
      {
        path: 'modificarvina',
        component: ModificarVinasComponent
      },
      {
          path: 'modficarRuta',
          component: EditarRutaComponent
      }

  ]
  }
];
