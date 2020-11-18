import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { IUva } from 'src/app/models/Vina/i-uva';
import { FormBuilder } from '@angular/forms';
import { UvasService } from 'src/app/services/uvas/uvas.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) data: IUva,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OpcionesComponent>,
    public dialog: MatDialog,
    private uvaService: UvasService
  ) { }

  ngOnInit() {
  }

  close(){

  }

}
