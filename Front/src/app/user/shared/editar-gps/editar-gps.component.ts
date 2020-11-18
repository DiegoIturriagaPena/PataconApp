import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GpsService } from 'src/app/services/gps.service';
import { Gps, GpsInterface } from 'src/app/models/gps';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

@Component({
  selector: 'app-editar-gps',
  templateUrl: './editar-gps.component.html',
  styleUrls: ['./editar-gps.component.scss']
})
export class EditarGpsComponent implements OnInit {

  imei: number;
  modelo: string;
  numero_chip: number;

  editGpsGroup: FormGroup;
  dataActual: any;
  gps: Gps;

  constructor(
    public dialogRef: MatDialogRef<EditarGpsComponent>,
    public dialog: MatDialog,
    private gpsService: GpsService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.dataActual = data;
    console.log(this.dataActual);
    console.log(data)
    this.editGpsGroup = this.fb.group({
      imei: ['', [Validators.required, Validators.pattern('[0-9]{15,17}')]],
      modelo: ['', Validators.required],
      numero_chip: ['', [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
    });

    this.gpsService.obtenerGPSporId(this.dataActual.id)
    .subscribe(
      res=>{console.log(res)},
      error=>{console.log(error)},
      ()=>{
        this.editGpsGroup = this.fb.group({
          imei:[
            {value: this.dataActual.id,disabled:true},
            [Validators.required, Validators.pattern('[0-9]{15,17}')]
          ],
          modelo: [this.dataActual.modelo, Validators.required ],
          numero_chip: [this.dataActual.numero_chip, [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
        });
      }
    )
  }

  ngOnInit() {
  }


  actualizarGps(){
    let gps : any;

    gps = {
      "id": +this.editGpsGroup.get('imei').value,
      "modelo": this.editGpsGroup.get('modelo').value,
      "numero_chip": +this.editGpsGroup.get('numero_chip').value
      //"patente": "Sin Asignar"
    }

    this.gpsService.actualizarGPS(gps.id,gps)
    .subscribe(res => {
      console.log(res);
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: '¡Listo!'
        }
      });
      d.afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
    })

  }

}
