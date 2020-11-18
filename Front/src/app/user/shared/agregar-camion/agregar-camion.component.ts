import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CamionesService } from 'src/app/services/CamionesService/camiones.service';
import { GpsService } from 'src/app/services/gps.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { CamionInterface, Camion } from 'src/app/models/camion';

export interface IGPS{
  id: number;
  modelo: string;
  numero_chip: number;
  camion: number;
  patente: string;
}

export interface ICamion {
  patente: string;
  estado?: string;
  capacidad_total?: number;
  carga?: number;
  dueno?: string;
  tipo?: string;
  fono_dueno?: number;
  id_gps: number;
}

@Component({
  selector: 'app-agregar-camion',
  templateUrl: './agregar-camion.component.html',
  styleUrls: ['./agregar-camion.component.scss'],
})

export class AgregarCamionComponent implements OnInit {
  
  patente: string;
  gps: number;
  capacidad: number;
  dueno: string;
  tipo: string;
  fono_dueno: string; 
  singps: boolean;

  listaGPS: IGPS;
  addCamionGroup: FormGroup;
  camion: Camion;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgregarCamionComponent>,
    private camionesService: CamionesService, 
    private formBuilder: FormBuilder,
    private gpsService: GpsService
    ) { 
      this.obtenerGPS();
      this.addCamionGroup = this.formBuilder.group({
        patente: [
          '',
          [Validators.required,
            Validators.pattern('([A-Z]|[a-z]){2}(([A-Z]|[a-z]){2}|[0-9]{2})[0-9]{2}')]
        ],
        gpsSelect: [''],
        capacidad: ['', [Validators.required, Validators.pattern("[1-9][0-9]*")]],
        dueno: ['', [Validators.required]],
        fono_dueno: ['', [Validators.required]],
        tipo:['grande', [Validators.required]]
      });

    }

    
  private listaCamiones: CamionInterface[];

  ngOnInit() {
    
    
    
  }
  
  obtenerGPS(){
    this.gpsService
    .obtenerGPSsinAsignar()
    .subscribe((res)=>{
      this.listaGPS = res;
      //console.log("listagps");
      //console.log(this.listaGPS)
    })
  }
  
  insertarCamion()
  {
    //this.camion = new Camion();
    let camion: CamionInterface;

    if(this.addCamionGroup.get('gpsSelect').value !== '')
    {
      camion = {
        "patente" :this.addCamionGroup.get('patente').value,
        "capacidad_total": this.addCamionGroup.get('capacidad').value,
        "estado": "Detenido",
        "carga": "0",
        "dueno": this.addCamionGroup.get('dueno').value,
        "tipo": this.addCamionGroup.get('tipo').value,
        "fono_dueno": this.addCamionGroup.get('fono_dueno').value,
        "id_gps": this.addCamionGroup.get('gpsSelect').value
      }
      
    }
    else
    {
      camion = {
        "patente" :this.addCamionGroup.get('patente').value,
        "capacidad_total": this.addCamionGroup.get('capacidad').value,
        "estado": "Detenido",
        "carga": "0",
        "dueno": this.addCamionGroup.get('dueno').value,
        "tipo": this.addCamionGroup.get('tipo').value,
        "fono_dueno": this.addCamionGroup.get('fono_dueno').value,
        "id_gps": 0
      }
      
    }
  
    console.log(camion)
    

    this.camionesService.obtenerCamionPorID(camion.patente).subscribe(res => {
      // no se guarda
      if(res)
      {
        //console.log("no se guarda");

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
        // console.log("se guarda");
        this.camionesService.insertarCamion(camion).subscribe( (res) => {
        // console.log("res", res);
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

    //this.dialogRef.close();
  }

  actualizarCamion(){
    let camion = {
      "patente" :this.patente,
      "capacidad_total": +this.capacidad,
      "estado": "Detenido",
      "carga": "0",
      "dueno": this.dueno,
      "tipo": this.tipo,
      "fono_dueno": this.fono_dueno,
      "id_gps": this.gps
    }
    this.camionesService.actualizarCamion(this.patente,camion).subscribe(res=>{
      console.log("res update camion",res);
    });
  }

  obtenerCamiones() {
    this.camionesService
      .obtenerCamiones()
      .subscribe((camiones) => {
        this.listaCamiones = camiones as CamionInterface[]
        //console.log(this.listaCamiones);
      });
  }

  guardarEnBD(camion: any)
  {
    this.camionesService.insertarCamion(camion).subscribe( (res) => {
        console.log("res", res);
      })
  }

}
