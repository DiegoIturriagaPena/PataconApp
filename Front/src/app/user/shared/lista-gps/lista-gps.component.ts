import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { IGPS } from '../agregar-camion/agregar-camion.component';
import { CamionesService } from 'src/app/services/CamionesService/camiones.service';
import { GpsService } from 'src/app/services/gps.service';
import { CrearGpsComponent } from '../crear-gps/crear-gps.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditarGpsComponent } from '../editar-gps/editar-gps.component';
import { Gps } from 'src/app/models/gps';

@Component({
  selector: 'app-lista-gps',
  templateUrl: './lista-gps.component.html',
  styleUrls: ['./lista-gps.component.scss']
})
export class ListaGpsComponent implements OnInit {
  displayedColumns2: string[] = ['modelo', 'numero_chip', 'camion', 'accion'];
  listGps = new MatTableDataSource<IGPS>();
  placeholder: FormGroup;
  inputFocus: boolean;
  private paginator: MatPaginator;
  private sort: MatSort;

  gps: Gps;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.listGps.paginator = this.paginator;
    this.listGps.sort = this.sort;

  }


  constructor(private dialog: MatDialog,
    private camionesService: CamionesService,
    private gpsService: GpsService,
    fb: FormBuilder, ) {
    this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.obtenerGps();
  }

  ngOnInit() {

  }

  refresh(){
    this.obtenerGps();
  }
  public filtrar2 = (value: string) => {
    this.listGps.filter = value.trim().toLocaleLowerCase();
  }

  abrirDialogGPS() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '450px';
    dialogConfig.minWidth = '300px';
    let dialogRef = this.dialog.open(CrearGpsComponent, {
      width: '550px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerGps();
    });
  }

  obtenerGps() {
    this.gpsService
      .obtenerTodosLosGPS()
      .subscribe((gps) => {
        this.listGps.data = gps as IGPS[];
        console.log(this.listGps.filteredData);

        this.listGps.filteredData.forEach(key => {
          let id = key.patente;
          if (id != null) {
            key.patente = id;
          } else {
            key.patente = "Sin Asignar";
          }

        })
      }, error => {

      },
        () => {

        });
  }

  eliminarGPS(element: any) {
    console.log("Intentando Eliminar", element);
    let id = element.id;
    this.camionesService.actualizarReferenciaGps(id)
      .subscribe(res => {
        console.log("Se intenta actualizar la referencia");
        console.log(res);
        this.gpsService.eliminarGps(id)
          .subscribe(res => {
            console.log("Se eliminó correctamente");
            console.log(res);
            this.obtenerGps();
          });
      })


  }


  abrirEditar(element: any ){
    this.gps = element;
    console.log(this.gps)
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.gps;
    dialogConfig.width = '500px';
    dialogConfig.height = '470px';
    let dialogRef = this.dialog.open(EditarGpsComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerGps();
    });
  }
  
}
