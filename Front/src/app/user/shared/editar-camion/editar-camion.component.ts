import { Component, OnInit, Inject } from '@angular/core';
import { Camion, CamionInterface } from 'src/app/models/camion';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CamionesService } from 'src/app/services/CamionesService/camiones.service';
import { GpsService } from 'src/app/services/gps.service';
import { IGPS } from '../agregar-camion/agregar-camion.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

@Component({
  selector: 'app-editar-camion',
  templateUrl: './editar-camion.component.html',
  styleUrls: ['./editar-camion.component.scss']
})
export class EditarCamionComponent implements OnInit {
  dataActual: CamionInterface;
  camion: Camion;
  listaGPS: IGPS;
  editCamionGroup: FormGroup;


  constructor(    
    public dialogRef: MatDialogRef<EditarCamionComponent>,
    public dialog: MatDialog,
    private camionesService: CamionesService, 
    private formBuilder: FormBuilder,
    private gpsService: GpsService,
    @Inject(MAT_DIALOG_DATA) data
    ) { 
      this.dataActual = data;
      this.obtenerGPS();
    } 

  ngOnInit() {
    
    this.obtenerGPSActual();

    console.log(this.dataActual);
    
    this.editCamionGroup = this.formBuilder.group({
      patente: [
        {value: this.dataActual.patente, disabled: true},
        [Validators.required,
          Validators.pattern('([A-Z]|[a-z]){2}(([A-Z]|[a-z]){2}|[0-9]{2})[0-9]{2}')]
      ],
      gpsSelect: [this.dataActual.id_gps,[]],
      capacidad: [this.dataActual.capacidad_total, [Validators.required, Validators.pattern("[1-9][0-9]*")]],
      dueno: [this.dataActual.dueno, [Validators.required]],
      fono_dueno: [this.dataActual.fono_dueno, [Validators.required]],
      tipo:[this.dataActual.tipo, [Validators.required]]
    });    
  }

  obtenerGPS(){
    this.gpsService
    .obtenerGPSsinAsignar()
    .subscribe((res)=>{
      this.listaGPS = res;
      console.log(this.listaGPS)
    })
  }

  obtenerGPSActual() {
    this.gpsService.
    obtenerGPSporId(this.dataActual.id_gps).
    subscribe((res) => {
      this.dataActual.id_gps = res.modelo;
    })
  }

  actualizarCamion(){
    let iCamion: CamionInterface;

    if(this.editCamionGroup.get('gpsSelect').value !== '')
    {
      iCamion = {
        "patente" :this.editCamionGroup.get('patente').value,
        "capacidad_total": this.editCamionGroup.get('capacidad').value,
        "estado": this.dataActual.estado,
        "carga": this.dataActual.carga,
        "dueno": this.editCamionGroup.get('dueno').value,
        "tipo": this.editCamionGroup.get('tipo').value,
        "fono_dueno": this.editCamionGroup.get('fono_dueno').value,
        "id_gps": this.editCamionGroup.get('gpsSelect').value
      }
    }
    else
    {
      iCamion = {
        "patente": this.editCamionGroup.get('patente').value,
        "capacidad_total": this.editCamionGroup.get('capacidad').value,
        "estado": this.dataActual.estado,
        "carga": this.dataActual.carga,
        "dueno": this.editCamionGroup.get('dueno').value,
        "tipo": this.editCamionGroup.get('tipo').value,
        "fono_dueno": this.editCamionGroup.get('fono_dueno').value,
        "id_gps": 0
      }
    }

    this.camionesService.actualizarCamion(iCamion.patente, iCamion).subscribe(res => {
      
      const d = this.dialog.open(PdialogComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          headerMessage: 'Información',
          bodyMessage: '¡Listo!'
        }
      });
      d.afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
    },
    error => {
      if(error.status === 400)
      {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headMessage: 'Error',
            bodyMessage: 'No se pudo modificar.'
          }
        });
        d.afterClosed().subscribe(() => {
          this.dialogRef.close();
        });
      }
      else
      {
        const d = this.dialog.open(PdialogComponent, 
          {
            data: {
              headMessage: 'Error',
              bodyMessage: 'Problemas con el servidor.'
            }
          }
        );
      }
    });

    /*
    this.camionesService.obtenerCamionPorID(iCamion.patente).subscribe(res =>{
      // no se guarda
      if(res)
      {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: 'El camión con esa patente ya se encuentra registrado.'
          }
        });
        d.afterClosed().subscribe(() => {});
      }
    },
    error => {
      // se guarda
      if(error.status === 404)
      {
        this.camionesService.actualizarCamion(this.dataActual.patente, iCamion).subscribe(res=>{
          //console.log("res update camion",res);
          if(res.data === '200'){
            console.log("exito");
          }
        },
        error =>
        {
          console.log("error: " + error);
          if(error.status === 400)
          {
            console.log("error 400");
          }
        });
        this.dialogRef.close();
      }
    });
    */
  }
}
