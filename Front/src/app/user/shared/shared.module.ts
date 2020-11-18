import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { EventsComponent } from './events/events.component';
import { MatIconModule, MatSelectModule, MatCheckboxModule, MatPaginatorModule, MatTableDataSource, MatSortModule, MatDialogModule, MatTabsModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatPaginatorIntl, MatGridListModule, MatAutocompleteModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material';
import { ChoferComponent } from './chofer/chofer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTable, MatTableModule } from '@angular/material';
import { ListaChoferesComponent } from './lista-choferes/lista-choferes.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CamionesComponent } from './lista-camiones/lista-camiones.component';
import { ModificarCuentaComponent } from './modificar-cuenta/modificar-cuenta.component';
import { AgregarCamionComponent } from './agregar-camion/agregar-camion.component';
import { FilterComponent } from './filter/filter.component';
import { AgregarRutaComponent } from './agregar-ruta/agregar-ruta.component';
import { ListaRutasComponent } from './lista-rutas/lista-rutas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { ListaProductoresComponent } from './lista-productores/lista-productores.component';
import { AgregarProductoresComponent } from './agregar-productores/agregar-productores.component';
import { CrearRecorridoComponent } from './crear-recorrido/crear-recorrido.component';
import { ListarRecorridoComponent } from './listar-recorrido/listar-recorrido.component';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { spanishPaginator } from '../spanish-paginator-intl';
import { EditarCamionComponent } from './editar-camion/editar-camion.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { EditarChoferComponent } from './editar-chofer/editar-chofer.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CrearGpsComponent } from './crear-gps/crear-gps.component';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { ListaGpsComponent } from './lista-gps/lista-gps.component';
import { ListaFlotaComponent } from './lista-flota/lista-flota.component';
import { ProductoresService } from 'src/app/services/ProductoresService/productores.service';
import { ModificarProductorComponent } from './productor/modificar-productor/modificar-productor.component';
import { ListarVinasComponent } from './vinas/listar-vinas/listar-vinas.component';
import { ModificarVinasComponent } from './vinas/modificar-vinas/modificar-vinas.component';
import { AgregarVinasComponent } from './vinas/agregar-vinas/agregar-vinas.component';
import { LstorageService } from '../../storage/lstorage.service';
import {AgmDirectionModule} from 'agm-direction';
import { EditarGpsComponent } from './editar-gps/editar-gps.component';
import { FormAgregarRutaComponent } from './form-agregar-ruta/form-agregar-ruta.component';
import { ModificarUvaComponent } from './uva/modificar-uva/modificar-uva.component';
import { ListarUvaComponent } from './uva/listar-uva/listar-uva.component';
import { AgregarUvaComponent } from './uva/agregar-uva/agregar-uva.component';
import { UvasService } from 'src/app/services/uvas/uvas.service';
import { SuperadminGuard } from 'src/app/guards/superadmin.guard';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common'

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { CrearUsuarioFirebaseComponent } from './crear-usuario-firebase/crear-usuario-firebase.component';
import { MatDialogRef } from '@angular/material/dialog';
import { EditarRutaComponent } from './editar-ruta/editar-ruta.component';
import { DespachosComponent } from './despachos/despachos/despachos.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OpcionesComponent } from './despachos/opciones/opciones.component';




@NgModule({
  declarations: [
    MapsComponent,
    ChoferComponent,
    ListaChoferesComponent,
    EventsComponent,
    CamionesComponent,
    ModificarCuentaComponent,
    FilterComponent,
    AgregarCamionComponent,
    CamionesComponent,
    AgregarRutaComponent,
    ListaRutasComponent,
    DashboardComponent,
    CrearRecorridoComponent,
    ListaProductoresComponent,
    ListarRecorridoComponent,
    AgregarProductoresComponent,
    EditarCamionComponent,
    EditarChoferComponent,
    CrearGpsComponent,
    ListaGpsComponent,
    ListaFlotaComponent,
    ModificarProductorComponent,
    ListarVinasComponent,
    ModificarVinasComponent,
    AgregarVinasComponent,
    EditarGpsComponent,
    FormAgregarRutaComponent,
    CrearUsuarioFirebaseComponent,
    ModificarUvaComponent,
    ListarUvaComponent,
    AgregarUvaComponent,
    EditarRutaComponent,
    DespachosComponent,
    OpcionesComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjYehZgzIWJS8WceZM5qwWXVrqfAvfu8o'
    }),
    AgmDirectionModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCarouselModule,
    ComponentsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    FullCalendarModule,
    MatAutocompleteModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebase),
    FullCalendarModule
  ],
  exports: [
    MapsComponent,
    ChoferComponent,
    ListaChoferesComponent,
    AgregarCamionComponent,
    CamionesComponent,
    CrearRecorridoComponent,
    ListarRecorridoComponent,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    ModificarCuentaComponent,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    ListaProductoresComponent,
    AgregarProductoresComponent,
    ListaRutasComponent,
    AgregarRutaComponent,
    EditarCamionComponent,
    EditarChoferComponent,
    CrearGpsComponent,
    ListaGpsComponent,
    ListaFlotaComponent,
    ModificarProductorComponent,
    MatGridListModule,
    MatCarouselModule,
    ListarVinasComponent,
    AgregarVinasComponent,
    EditarGpsComponent,
    CrearUsuarioFirebaseComponent,
    AgregarVinasComponent,
    ModificarUvaComponent,
    ListarUvaComponent,
    DespachosComponent
  ],
  providers: [
    ProductoresService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MatPaginatorIntl, useValue: spanishPaginator() },
    LstorageService,
    UvasService,
    SuperadminGuard,
    DatePipe
  ],
  entryComponents:[
    PdialogComponent
  ],
  bootstrap:[
    ModificarProductorComponent,
    AgregarUvaComponent,
    ModificarUvaComponent,
    OpcionesComponent
  ]
})
export class SharedModule { }
