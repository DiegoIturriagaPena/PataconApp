import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminSetComponent } from './admin-set/admin-set.component';
import { SuperadminComponent } from './superadmin.component';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { routes } from './superadmin-routing.module';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminAddComponent,
    AdminSetComponent,
    SuperadminComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatStepperModule,
    MatDividerModule,
    ComponentsModule,
    MatTooltipModule
  ],
  exports: [
  ],
  providers: [
    AuthService
  ],
  entryComponents: [
    PdialogComponent
  ]
})
export class SuperadminModule { }
