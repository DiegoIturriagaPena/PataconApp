import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatGridListModule} from '@angular/material';
import { AuthService } from './services/auth/auth.service';
import {ChoferService} from './services/chofer.service';
import {EventoService} from './services/evento.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderService } from './services/loader/loader.service';
import { LoaderComponent } from './global/loader/loader/loader.component';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { GlobalModule } from './global/global/global.module';
import { AuthGuard } from './guards/auth.guard';
import { SuperadminGuard} from './guards/superadmin.guard'
import { from } from 'rxjs';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    NgxSpinnerModule,
    GlobalModule,
    MatGridListModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    ChoferService,
    EventoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    AuthGuard,
    SuperadminGuard
  ],
  entryComponents: [
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
