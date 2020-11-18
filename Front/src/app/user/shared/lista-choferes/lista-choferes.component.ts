import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChoferService } from '../../../services/chofer.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog ,MatDialogConfig} from '@angular/material';
import { ChoferComponent } from '../chofer/chofer.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import { EditarChoferComponent } from '../editar-chofer/editar-chofer.component';


export interface IChofer {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  num_telefono: number;
}

export interface INombreChofer {
  nombre: string;
  num_telefono: number;
}


@Component({
  selector: 'app-lista-choferes',
  templateUrl: './lista-choferes.component.html',
  styleUrls: ['./lista-choferes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListaChoferesComponent implements OnInit {
  displayedColumns: string[] = ['nombre','num_telefono','accion'];
  dataSource: INombreChofer[];
  choferClicked: IChofer;
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
    this.listChoferes.sort = this.sort;
    this.listChoferes.paginator = this.paginator;
  }

  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;

  constructor(
    private dialog: MatDialog,
    private _chofer: ChoferService,
    fb: FormBuilder
    ) {
      this.placeholder = fb.group({
        hideRequired: false,
        floatLabel: 'auto',
      });
      this.dataSource = this.obtenerChoferes();
  }
  listChoferes = new MatTableDataSource<INombreChofer>();
  ngOnInit() {
    this.inputFocus = false;
  }

  ngAfterViewInit(): void {
    
  }

  public filtrar = (value: string) => {
    this.listChoferes.filter = value.trim().toLocaleLowerCase();
  }

  obtenerChoferes(): any {
    this._chofer.obtenerChoferes().subscribe((response) => {
      let aux = response;
      let i:number = 0;
      aux.forEach(element => {
        let nombre = element.nombre + " " + element.apellido_paterno + " " + element.apellido_materno;
        aux[i].nombre = nombre;
        i++;
      });
      this.listChoferes.data = aux as INombreChofer[];
      console.log(this.listChoferes.data);
    });
  }

  abrirDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '450px';
    dialogConfig.minWidth = '300px';
    let dialogRef = this.dialog.open(ChoferComponent,{
      width: '550px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerChoferes();
    });
  }
  abrirEditar(evt: any){
    this.choferClicked = evt;

    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.choferClicked;
    dialogConfig.width = '500px';
    dialogConfig.height = '470px';
    let dialogRef = this.dialog.open(EditarChoferComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerChoferes();
    });
  }
}
