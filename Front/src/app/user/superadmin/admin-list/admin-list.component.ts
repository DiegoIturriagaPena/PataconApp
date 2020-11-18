import { Component, OnInit, ViewEncapsulation, HostBinding, ViewChild } from '@angular/core';
import {MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { IUser } from 'src/app/models/Usuarios/usuario';
import { AdminAddComponent } from '../admin-add/admin-add.component';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { AdminSetComponent } from '../admin-set/admin-set.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {

  displayedColumns = [
    'number',
    'email' ,
    'names',
    // 'username',
    'phone',
    'state',
    'actions'
  ];
  dataSource: MatTableDataSource<IUser>;
  panelOpenState = false;
  public selection: string;
  // Float Label
  placeholder: FormGroup;
  radiobuttonForm: FormGroup;
  inputFocus: boolean;
  constructor(
    private dialog: MatDialog,
    fb: FormBuilder,
    private userService: UsuariosService,
  ) {

    this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });

    this.radiobuttonForm = fb.group({
      option: ['1']
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.selection  = '1';
    this.dataSource = new MatTableDataSource();
    this.userService.getSupervisores().subscribe(
      data => {
        // console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  /**
   * @param filterValue string a filtrar
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * @param tipo estado a seleccionar
   */
  customFilter(tipo) {
    this.dataSource.filterPredicate = (data: IUser, filter: string) => (
      data.estado === tipo
    );
    this.dataSource.filter = '1';
  }

  /**
   * Crea un nuevo supervisor
   */
  newSupervisor() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AdminAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if ( data === true ) {
            this.ngOnInit();
          }
        }
    );
  }

  /**
   * Cambia el estado del supervisor
   */
  changeState(user: IUser) {
    const body = user.estado === 1 ? '<strong>deshabilitar</strong>' : '<strong>habilitar</strong>';
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Desea ' + body + ' al usuario ' + user.correo + '?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        console.log(data);
        const u: IUser = {
          rut: user.rut,
          correo: user.correo,
          estado: user.estado === 1 ? 0 : 1,
        };
        this.userService.changeStateSupervisor(u).subscribe( d => {
            console.log(d);
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'Se ha modificado con éxito.',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.ngOnInit();
            });
        }, error => {
          console.log(error);
          if (error.status === 400) {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'No se han podido efectuar los cambios.<br>Intente mas tarde.',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.ngOnInit();
            });
          } else {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'Se ha tenido problemas con el poblemas con el servidor.<br>Codigo del error: ' + error.status,
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.ngOnInit();
            });
          }
        }, () => {
          this.ngOnInit();
        });
      }
    });
  }

  /**
   * @author Patricio Quezada
   * @param user Supervisor a modificar
   * @summary Abre un dialogo con los datos del supervisor a modificar
   */
  setSupervisor(user: IUser) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;
    const dialogRef = this.dialog.open(AdminSetComponent, dialogConfig,
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
