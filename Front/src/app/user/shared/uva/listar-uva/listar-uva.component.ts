import { Component, OnInit, ViewChild } from '@angular/core';
import { IUva } from 'src/app/models/Vina/i-uva';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductorService } from 'src/app/services/productor.service';
import { Router } from '@angular/router';
import { AgregarUvaComponent } from '../agregar-uva/agregar-uva.component';
import { UvasService } from 'src/app/services/uvas/uvas.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { ModificarUvaComponent } from '../modificar-uva/modificar-uva.component';

@Component({
  selector: 'app-listar-uva',
  templateUrl: './listar-uva.component.html',
  styleUrls: ['./listar-uva.component.scss']
})
export class ListarUvaComponent implements OnInit {
  displayedColumns: string[] = ['number', 'nombre', 'description','actiones' ];

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  dataSource: MatTableDataSource<IUva>;

  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;

  constructor(
    private dialog: MatDialog,
    private uvasService: UvasService,
    fb: FormBuilder,
    private router: Router,
  ) { 
     // Placeholder
     this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }


  ngOnInit() {
    this.dataSource =  new MatTableDataSource();
    this.inputFocus = false;
    this.uvasService.getAllUvas().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
    
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * @author Patricio Quezada L.
   * @summary Abre el modal para la creacion de tipo de uvas.
   * 
   */
  abrirDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AgregarUvaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });
  }

  /**
   * @author Patricio Quezada L.
   * @summary Permite eliminar un tipo de uva.
   * 
   */
  eliminar(element: IUva){
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea eliminar este tipo de uva?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
       let uva:IUva = {
         id_tipo_uva: element.id_tipo_uva
       };
       this.uvasService.deleteUva(uva).subscribe( data => {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La operación ha sido realizado con éxito',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.ngOnInit();
            }); 
        },
        error => {
          const dialog = this.dialog.open(PdialogComponent, {
            data: {
              headerMessage: 'Información',
              bodyMessage: 'No se ha podido realizar la accion.',
              canSaveData: false
            }
          });
          dialog.afterClosed().subscribe(() => {
          });
        }
        );
  
      } else {
      }
    });
  }

  /**
   * @summary Modifica los datos de un tipo de uva
   * @param element Tipo de uva a modificar
   */
  setTiposDeUva(element: IUva){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(ModificarUvaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });
  }


  

}
