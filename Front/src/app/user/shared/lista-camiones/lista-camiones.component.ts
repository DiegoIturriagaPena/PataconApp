import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CamionesService } from '../../../services/CamionesService/camiones.service'
import { GpsService } from 'src/app/services/gps.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AgregarCamionComponent, IGPS } from '../agregar-camion/agregar-camion.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditarCamionComponent } from '../editar-camion/editar-camion.component';
import { CrearGpsComponent } from '../crear-gps/crear-gps.component';
//import { CamionInterface } from '../../../models/camion'

export interface CamionInterface {
  patente?: string;
  estado?: string
  capacidad_total?: number;
  carga?: number;
  dueno?: string;
  fono_dueno?: number;
  tipo?: string;
  id_gps?: number;
  modelo_gps?: string;
}



@Component({
  selector: 'app-lista-camiones',
  templateUrl: './lista-camiones.component.html',
  styleUrls: ['./lista-camiones.component.scss']
})
export class CamionesComponent implements OnInit {

  displayedColumns: string[] = ['patente', 'estado', 'capacidad_total',
    'carga', 'modelo_gps', 'accion'];
  // private listCamiones: CamionInterface[];
  listCamiones = new MatTableDataSource<CamionInterface>();
  private camionClicked: CamionInterface;


  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.listCamiones.paginator = this.paginator;
    this.listCamiones.sort = this.sort;

  }


  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;

  constructor(
    private dialog: MatDialog,
    private camionesService: CamionesService,
    private gpsService: GpsService,
    fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    // Placeholder
    this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

  }



  ngOnInit() {
    this.inputFocus = false;
    this.obtenerCamiones();
  

  }

  refresh(){
    this.inputFocus = false;
    this.obtenerCamiones();
  }
  

  public filtrar = (value: string) => {
    this.listCamiones.filter = value.trim().toLocaleLowerCase();
  }

  

  camionClickedEvt(evt: any): void {
    this.camionClicked = evt;
    console.log(this.camionClicked)
  }

  obtenerCamiones() {
    this.camionesService
      .obtenerCamiones()
      .subscribe((camiones) => {
        this.listCamiones.data = camiones as CamionInterface[]
        console.log(this.listCamiones.filteredData);
        this.listCamiones.sort = this.sort;
        this.listCamiones.paginator = this.paginator;
        this.listCamiones.filteredData.forEach(key => {
          let id = key.id_gps;
          this.gpsService
            .obtenerGPSporId(id)
            .subscribe(res => {
              key.modelo_gps = res.modelo;
            })
        })
      }, error => {

      },
        () => {

        });
  }

  abrirDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '450px';
    dialogConfig.minWidth = '300px';
    let dialogRef = this.dialog.open(AgregarCamionComponent, {
      width: '550px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerCamiones();
    });
  }

  abrirEditar(evt: any) {
    console.log(evt);
    this.camionClicked = evt;
    console.log(this.camionClicked);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.camionClicked;
    dialogConfig.width = '550px';
    dialogConfig.height = '600px';
    let dialogRef = this.dialog.open(EditarCamionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerCamiones();
    });
  }

  

  /*_setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.listCamiones.paginator ? this.listCamiones.paginator = this.paginator : null;
          break;
        case 1:
          
          
      }
    });
  }*/
}
