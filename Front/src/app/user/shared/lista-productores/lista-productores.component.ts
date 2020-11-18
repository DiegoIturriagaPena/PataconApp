import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ProductorService } from '../../../services/productor.service'
import { AgregarProductoresComponent } from '../agregar-productores/agregar-productores.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import { IProductor } from 'src/app/models/Productor/i-productor';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { IUser } from 'src/app/models/user';
import { ModificarProductorComponent } from '../productor/modificar-productor/modificar-productor.component';
import { Router } from '@angular/router';
import { LstorageService } from 'src/app/storage/lstorage.service';
import { CrearUsuarioFirebaseComponent } from '../crear-usuario-firebase/crear-usuario-firebase.component';

@Component({
  selector: 'app-lista-productores',
  templateUrl: './lista-productores.component.html',
  styleUrls: ['./lista-productores.component.scss']
})
export class ListaProductoresComponent implements OnInit {



  displayedColumns: string[] = ['number', 'rut', 'nombre', 'telefono', 'estado','app', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IProductor>;

  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;

  constructor(
    private dialog: MatDialog,
    private _productor: ProductorService,
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


    this._productor.obtenerProductores().subscribe((response) => {
      this.dataSource =  new MatTableDataSource(response);
    }, error => {

    },
    () => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
   * @summary Abre el modal para la creacion de productires.
   * 
   */
  abrirDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AgregarProductoresComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });
  }


  /**
   * @author Patricio Quezada 
   * @summary Habilita o deshabilita un Productor
   * @param element Productor a habilitar o deshabilitar
   */
  changeState(element: IProductor) {
    const body = element.disponible === true ? '<strong>deshabilitar</strong>' : '<strong>habilitar</strong>';
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Desea ' + body + ' al productor ' + element.nombre + '?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        console.log(data);
        const u: IProductor = {
          rut: element.rut,
          disponible: element.disponible === true ? false : true
        };
        this._productor.setEstado(u).subscribe( data => {
          console.log(data)
        }, error => {
          console.log(error);
        }, () => {
          this.ngOnInit();
        });
      }
    });
  }

  /**
   * @author Patricio Quezada 
   * @summary Modifica los datos de un productor
   * @param element Productor a modificar
   */
  setProductor(element: IProductor) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(ModificarProductorComponent, dialogConfig,
      );

    dialogRef.afterClosed().subscribe(
        data => {
          if ( data === true ) {
            this.ngOnInit();
          }
        }
    );
  }

  /**
   * @author Patricio Quezada
   * @param element productor a consultar
   * @summary evento que permite mostrar la vista de viñas.
   */
  goToVinas(element: IProductor){
    localStorage.setItem(LstorageService.productor_id,element.id_productor + '');
    this.router.navigate(['/pataconsys/listavinas']).then();
  }


  /**
   * @author Raimundo Vásquez, Christian Marchant
   * @summary Abre dialogo para insertar al usuario de fireabase
   */
  crearUsuario(element){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = element;
    const dialogRef = this.dialog.open(CrearUsuarioFirebaseComponent, dialogConfig,
      );

    dialogRef.afterClosed().subscribe(
        data => {
          if ( data === true ) {
            this.ngOnInit();
          }
        }
    );
  }
}
