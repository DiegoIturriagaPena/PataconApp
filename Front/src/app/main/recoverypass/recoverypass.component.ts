import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ICredentials } from 'src/app/models/Autentificacion/credentials';

@Component({
  selector: 'app-recoverypass',
  templateUrl: './recoverypass.component.html',
  styleUrls: ['./recoverypass.component.scss']
})
export class RecoverypassComponent implements OnInit {

  primaryform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RecoverypassComponent>,
    public dialog: MatDialog,
    public authService: AuthService
  ){
  }

  ngOnInit() {
    this.primaryform = this.fb.group({
      email: ['',[Validators.email, Validators.required]]
    });
  }

   /**
   * @author Patricio Quezada
   * @summary Cierra el dialogo
   */
  close() {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea salir?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data =>{
      if(data === true) {
        this.dialogRef.close();
      }
    });
  }

/**
 * @author Patricio Quezada
 * @summary Permite restablecer contraseña
 */
save() {
  if(!this.primaryform.valid){
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: 'Debe ingresar su correo para ingresar su recuperar su contraseña',
        canSaveData: false
      }
    });
    d.afterClosed().subscribe(data => {
    });
  }else{
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que este es su correo?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        const user: ICredentials = {
           email: this.primaryform.get('email').value || '',
        }
        this.authService.recoveryPass(user).subscribe(data => {
          const d = this.dialog.open(PdialogComponent, {
            data: {
              headerMessage: 'Información',
              bodyMessage: 'Su contraseña ha sido enviada a su correo.',
              canSaveData: false
            }
          });
          d.afterClosed().subscribe(data =>{
           
              this.dialogRef.close();
           
          });
        }, error => {
          const d = this.dialog.open(PdialogComponent, {
            data: {
              headerMessage: 'Información',
              bodyMessage: 'Ha habido problemas en restablecer su contraseña.<br>Verifique su correo o contacte al administrador.',
              canSaveData: false
            }
          });
          d.afterClosed().subscribe(data =>{
 
          });
        });
      } else {
      
      }
    });
  }
}



}
