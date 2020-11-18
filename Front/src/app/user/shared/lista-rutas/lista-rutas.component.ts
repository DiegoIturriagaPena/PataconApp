import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AgregarRutaComponent } from '../agregar-ruta/agregar-ruta.component';
import { RutaService } from 'src/app/services/ruta.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { EditarRutaComponent } from '../editar-ruta/editar-ruta.component';
import { PdialogComponent } from '../../../components/pdialog/pdialog.component';

export interface IRuta {
  id_ruta?: number;
  ref_vina?: number;
  productor?: string;
  /*lugar_origen: string;
  lugar_destino: string;*/
  duracion_estimada?: string;
}


@Component({
  selector: 'app-lista-rutas',
  templateUrl: './lista-rutas.component.html',
  styleUrls: ['./lista-rutas.component.scss']
})
export class ListaRutasComponent implements OnInit/*, AfterViewInit, AfterContentInit*/ {

  displayedColumns: string[] = ['id_ruta', 'productor', /*'lugar_origen', 'lugar_destino',*/ 'duracion_estimada', 'opciones'];
  listRutas: MatTableDataSource<IRuta> = new MatTableDataSource<IRuta>();;
  rutas: IRuta[] = [];
  dataSource: IRuta[];
  editarRuta: any;
  deleteRuta: any;


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
    this.listRutas.sort = this.sort;
    this.listRutas.paginator = this.paginator;

  }
  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;

  constructor(
   // private dialog: MatDialog,
    private rutaService: RutaService,
    fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
    ) {
      this.placeholder = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
      this.dataSource = this.obtenerRutas();
  }

  ngOnInit() {
    this.inputFocus = false;
  }

  ngAfterViewInit(): void {
    
  }

  public filtrar = (value: string) => {
    this.listRutas.filter = value.trim().toLocaleLowerCase();
  }

  /**
   * TODO: hacer este metodo con un solo get
   */
  obtenerRutas(): any {
    this.rutaService.getAllRutas().subscribe(data => {
      console.log(data);
      data.forEach((element, i , array) => {
        this.rutas.push(
          {
            id_ruta: element.id_ruta,
            productor: element.nombre,
            duracion_estimada: element.duracion_aprox
          }
        );
      });
    },
    error => {
      console.log(error);
    },()=>{
      if(this.rutas.length > 0){
        this.listRutas.data = this.rutas;
        this.rutas = [];
      }
    });

  }


   abrirDialog() {

    this.router.navigate(['/pataconsys/agregarRuta']).then();
   


     /**
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '450px';
    dialogConfig.minWidth = '300px';
    let dialogRef = this.dialog.open(AgregarRutaComponent, {
      width: '1000px',
      height: '800px'
    });

    dialogRef.afterClosed().subscribe(data => {

      this.obtenerRutas();
    });*/
  }

  editRoute(elemento:any)
  {
    this.editarRuta = elemento;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.editarRuta;
    dialogConfig.width = '1000px';
    dialogConfig.height = '550px';
    let dialogRef = this.dialog.open(EditarRutaComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerRutas;
    });
  }

  deleteRoute(elemento:any){
       let id  = elemento.id_ruta;

       


        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: '¿Esta seguro que desea eliminar esta ruta?',
            canSaveData: true
          }
        });
        d.afterClosed().subscribe(data =>{
          if(data === true) {
            this.rutaService.eliminarRutaPorId(id).subscribe((res)=>{
              console.log(res);
              this.obtenerRutas();
          })
          }
        });


  }


}
