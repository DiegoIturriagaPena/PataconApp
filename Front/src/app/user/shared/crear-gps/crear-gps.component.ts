import { Component, OnInit } from '@angular/core';
import { GpsService } from 'src/app/services/gps.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Gps, GpsInterface } from 'src/app/models/gps';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

@Component({
  selector: 'app-crear-gps',
  templateUrl: './crear-gps.component.html',
  styleUrls: ['./crear-gps.component.scss']
})
export class CrearGpsComponent implements OnInit {

  imei: number;
  modelo: string;
  numero_chip: number;

  addGpsGroup: FormGroup;
  gps: Gps;

  constructor(
    public dialogRef: MatDialogRef<CrearGpsComponent>,
    public dialog: MatDialog,
    private gpsService: GpsService,
    private fb: FormBuilder
  ) { 
    this.addGpsGroup = this.fb.group({
      imei: ['', [Validators.required, Validators.pattern('[0-9]{15,17}')]],
      modelo: ['', Validators.required],
      numero_chip: ['', [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
    });
  }

  ngOnInit() {
    
  }


  insertarGps(){
    let gps: GpsInterface;

    gps = {
      "id": +this.addGpsGroup.get('imei').value,
      "modelo": this.addGpsGroup.get('modelo').value,
      "numero_chip": +this.addGpsGroup.get('numero_chip').value
      //"patente": "Sin Asignar"
    }
    console.log(gps);
    this.gpsService.obtenerGPSporId(gps.id).subscribe(res => {
      // como hay respuesta se encontró el imei, por lo tanto ya existe
      if(res)
      {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: 'El GPS con ese IMEI ya se encuentra registrado'
          }
        });
        d.afterClosed().subscribe(() => {});
      }
    },
    error => {
      // si nos da error 404 (no encontrado) guardamos
      if(error.status === 404)
      {
        console.log("hola");
        this.gpsService.ingresarGPS(gps).subscribe((res)=>{
          console.log(res)
        });
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: '¡Listo!'
          }
        });
        d.afterClosed().subscribe(() => {
          this.dialogRef.close();
        });
      }
    });
  }
}
