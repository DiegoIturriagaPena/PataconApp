import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { routes } from './main-routing.module';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import {
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule, 
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
 } from '@angular/material';
import { MycarouselComponent } from './mycarousel/mycarousel.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
// bootstrap modules
import { FooterComponent } from './footer/footer.component';
import { TabsModule, CollapseModule } from 'ngx-bootstrap';
import { AuthService } from '../services/auth/auth.service';
import { ComponentsModule } from '../components/components.module';
import { PdialogComponent } from '../components/pdialog/pdialog.component';
import { ContainerComponent } from './container/container.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../interceptor/loader.interceptor';
import { LoaderService } from '../services/loader/loader.service';
import { GlobalModule } from '../global/global/global.module';
import { LoaderComponent } from '../global/loader/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RecoverypassComponent } from './recoverypass/recoverypass.component';

@NgModule({
  declarations: [
    MainComponent,
    IndexComponent,
    LoginComponent,
    MycarouselComponent,
    AboutComponent,
    ServicesComponent,
    FooterComponent,
    ContainerComponent,
    RecoverypassComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
    ComponentsModule,
    CollapseModule,
    DeviceDetectorModule.forRoot(),
    GlobalModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
    provide: ErrorStateMatcher,
    useClass: ShowOnDirtyErrorStateMatcher
    },
    AuthService,
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}

  ],
  entryComponents: [
    PdialogComponent,
    LoaderComponent
  ],
  bootstrap:[
    RecoverypassComponent
  ]
})
export class MainModule { }
