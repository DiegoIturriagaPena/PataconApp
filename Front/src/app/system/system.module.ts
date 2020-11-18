import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import {
  MatIconModule,
  MatChipsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
} from '@angular/material';
import { routes } from './system-routing.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuItemService } from './menu/theme/menu-item.service';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../user/shared/shared.module';
import { MapsComponent } from '../user/shared/maps/maps.component';
import { EventsComponent } from '../user/shared/events/events.component';
import { ChoferComponent } from '../user/shared/chofer/chofer.component';
import { FormsModule } from '@angular/forms';
import { ListaChoferesComponent } from '../user/shared/lista-choferes/lista-choferes.component';
import { AuthService } from '../services/auth/auth.service';
import { LoaderService } from '../services/loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../interceptor/loader.interceptor';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../global/loader/loader/loader.component';
import { GlobalModule } from '../global/global/global.module';
import { ListarRecorridoComponent } from '../user/shared/listar-recorrido/listar-recorrido.component';
import { SuperadminModule } from '../user/superadmin/superadmin.module';
import { AdminListComponent } from '../user/superadmin/admin-list/admin-list.component';
import { AdminAddComponent } from '../user/superadmin/admin-add/admin-add.component';
import { AdminSetComponent } from '../user/superadmin/admin-set/admin-set.component';
import { SuperadminGuard } from '../guards/superadmin.guard';


@NgModule({
  declarations: [
    SystemComponent,
    SidebarComponent,
    MenuItemComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    SharedModule,
    GlobalModule,
    
  ],
  providers: [
    MenuItemService,
    AuthService,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    SuperadminGuard
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    MapsComponent,
    ChoferComponent,
    ListaChoferesComponent,
    ListarRecorridoComponent,
    EventsComponent,
    LoaderComponent
  ]
})
export class SystemModule { }
