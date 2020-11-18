import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { CrearRecorridoComponent, IRecorrido } from '../crear-recorrido/crear-recorrido.component';
import { ChoferService } from 'src/app/services/chofer.service';
import { RecorridoService } from 'src/app/services/recorrido.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IChofer } from '../lista-choferes/lista-choferes.component';

@Component({
  selector: 'app-listar-recorrido',
  templateUrl: './listar-recorrido.component.html',
  styleUrls: ['./listar-recorrido.component.scss']
})
export class ListarRecorridoComponent implements OnInit {
  displayedColumns = ['nombrechofer', 'camion', 'tipo_carga', 'ruta'];
  dataSource: IRecorrido[];

  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;
  constructor(
    private dialog: MatDialog,
    private choferService: ChoferService,
    private recorridoService: RecorridoService,
    fb: FormBuilder
  ) {
    this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    this.dataSource = this.obtenerRecorridos();
  }

  listRecorridos = new MatTableDataSource<IRecorrido>();
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
    this.listRecorridos.paginator = this.paginator;
    this.listRecorridos.sort = this.sort;

  }
  ngOnInit() {
    this.inputFocus = false;
  }

 

  public filtrar = (value: string) => {
    this.listRecorridos.filter = value.trim().toLocaleLowerCase();
  }

  abrirDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '450px';
    dialogConfig.minWidth = '300px';
    let dialogRef = this.dialog.open(CrearRecorridoComponent, {
      width: '700px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.obtenerRecorridos();
    });
  }

  obtenerRecorridos(): any {
    this.recorridoService
      .obtenerRecorridos()
      .subscribe((res) => {
        this.listRecorridos.data = res as IRecorrido[];
        console.log(this.listRecorridos.data);
        this.listRecorridos.data.forEach(element => {
          this.choferService
            .obtenerChoferPorID(element.ref_chofer)
            .subscribe((res: IChofer) => {
              let chofer = res;
              let nombre = chofer.nombre + " " + chofer.apellido_paterno + " " + chofer.apellido_materno;
              element.nombre_chofer = nombre;
            })
        });
      })
  }
}
