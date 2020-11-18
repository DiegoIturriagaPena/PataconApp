import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdialogComponent } from './pdialog/pdialog.component';
import { MatDialogModule, MatIconModule, MatCardModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PdialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    PdialogComponent
  ]
})
export class ComponentsModule { }
