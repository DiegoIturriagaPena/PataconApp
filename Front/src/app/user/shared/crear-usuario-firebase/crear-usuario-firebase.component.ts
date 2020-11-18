import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ProductorService } from 'src/app/services/productor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductorInterface } from 'src/app/models/productor';
import { IProductor } from 'src/app/models/Productor/i-productor';
import { NotificationService } from 'src/app/services/notification.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

export interface Usuario {
  email: string;
  pass: string;
}
@Component({
  selector: 'app-crear-usuario-firebase',
  templateUrl: './crear-usuario-firebase.component.html',
  styleUrls: ['./crear-usuario-firebase.component.scss']
})
export class CrearUsuarioFirebaseComponent implements OnInit {

  email: string;
  pass: string;
  productor: IProductor;
  addUserGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<CrearUsuarioFirebaseComponent>,
    public dialog: MatDialog,
    private _productor: NotificationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
    this.addUserGroup = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
    this.productor = data;
  }

  ngOnInit() {
  }


  /**
   * @author Raimundo Vásquez, Christian Marchant
   * @summary Inserta en firebase utilizando el servicio
   */
  insertarUsuarioFirebase() {
    let usuario: Usuario;
    console.log(this.productor);
    usuario = {
      email: this.addUserGroup.get('email').value,
      pass: this.addUserGroup.get('pass').value
    }
    console.log(usuario);

    this._productor.crearUsuarioFirestore(usuario,this.productor)
      .then(res => {
        this.dialogRef.close();
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: '¡Listo, Usuario Creado Correctamente!'
          }
        });
        d.afterClosed().subscribe(() => {
          this.dialogRef.close();
        });

      }).catch(err => {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Error',
            bodyMessage: 'Ya existe usuario con ese correo '
          }
        });
        d.afterClosed().subscribe(() => { });
      })
  }

  close(){
    this.dialogRef.close();
  }
}
