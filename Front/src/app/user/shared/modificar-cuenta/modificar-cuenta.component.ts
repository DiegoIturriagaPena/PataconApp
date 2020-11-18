import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, IUser } from 'src/app/models/Usuarios/usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { AuthService } from '../../../services/auth/auth.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

@Component({
  selector: 'app-modificar-cuenta',
  templateUrl: './modificar-cuenta.component.html',
  styleUrls: ['./modificar-cuenta.component.scss']
})
export class ModificarCuentaComponent implements OnInit {

  primerGroup: FormGroup;
  segundoGroup: FormGroup;
  tercerGroup: FormGroup;
  pwGroup: FormGroup;
  verifyPass: boolean;
  tercerStep: boolean;
  primerStep:boolean;
  segundoStep:boolean;

  api_token: string;
  name_token: string;

  user: User;
  iUser:IUser;

  //@ViewChild('stepper') stepper: MatStepper;

  constructor(
    public fb: FormBuilder, 
    private _user: UsuariosService, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModificarCuentaComponent>,
    private _auth: AuthService
    //@Inject(MAT_DIALOG_DATA) data: IUser
    ) {
      this.user = {
        rut: '',
        nombres: '',
        apellido_paterno: '',
        apellido_materno: '',
        //telefono: -1,
        correo: '',
        //password: '',
        password_generated: false,
        password_set: false,
        estado: 1
      }

      console.log("user init", this.user);
      this.primerGroup = this.fb.group({
        rut: [{ value: '', disabled: true}],
        correo: ['', [Validators.required, Validators.email]]
      });
  
      this.segundoGroup = this.fb.group({
        nombres: ['', Validators.required],
        apellido_paterno: [''],
        apellido_materno: [''],
        telefono: ['']
      });
  
      this.tercerGroup = this.fb.group({
        opcion: ['1']
      });
  
      // primero obtenemos el nombre del usuario que está en la sesión actual
      this.api_token = this._auth.getToken();
      this.name_token = this._auth.getUserName();
      
      // con el nombre los buscamos para obtener su rut
      this._user.getUsersByUserName(this.name_token).subscribe(
        data => {
        console.log("iuser", this.iUser) ;
        console.log("data1", data);
        this.iUser = {
          rut: data[0].rut
        }
        this.primerGroup.get('rut').setValue(this.iUser.rut);
  
        // ya con su rut, seteamos el resto de sus atributos
        this._user.getUserById(this.iUser.rut).subscribe(
          data => {
          console.log("data2", data);
          this.iUser = {
            rut: data.rut,
            nombres: data.nombres,
            correo: data.correo,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            telefono: data.telefono
          }
          console.log("iuser",this.iUser)

          this.primerGroup.setValue({
            rut: data.rut,
            correo: data.correo
          });

          this.segundoGroup.setValue({
            nombres: data.nombres,
            apellido_paterno: data.apellido_paterno,
            apellido_materno: data.apellido_materno,
            telefono: data.telefono
          });

          this.tercerGroup = this.fb.group({
            opcion: ['1']
          });
        });

        this.pwGroup = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          repassword: ['', [Validators.required, Validators.minLength(6)]]
        });
      });
    }

  ngOnInit() {
    this.verifyPass = false;
    this.tercerStep = false;
  }

  save()
  {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Está seguro que desea modificar sus datos?',
        canSaveData: true
      }
    });

    d.afterClosed().subscribe(res => {
      if(res === true) {
        // guardamos 
        const u: IUser = {
          correo: this.user.correo,
          rut: this.user.rut,
          apellido_materno: this.user.apellido_materno,
          apellido_paterno: this.user.apellido_paterno,
          //password_generated: this.user.password_generated,
          //password_set: this.user.password_set,
          password: this.user.password,
          nombres: this.user.nombres,
          telefono: this.user.telefono,
          estado: this.user.estado,
          rol: this.iUser.rol
        };
        console.log("final", u);

        this._user.actualizarUsuario(u.rut, u).subscribe(res => {
          if(res === null){
            const d = this.dialog.open(PdialogComponent, {
              panelClass: 'custom-dialog-container',
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La operación ha sido realizado con éxito',
                canSaveData: false
              }
            });
            d.afterClosed().subscribe(() => { this.dialogRef.close() });
          }
        },
        error => {
          if(error.status === 400) {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'No se ha logrado modificar.<br>Código de error: '+error.status,
                canSaveData: false
              }
            });
            d.afterClosed().subscribe(() => {});
          }
          else {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'Problemas con el servidor',
                canSaveData: false
              }
            });
            d.afterClosed().subscribe(() => {});
          }
        });
      }
      else {
        this.dialogRef.close();
      }
    });
  }

  close() {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Está seguro que desea salir?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if(data === true) {
        this.dialogRef.close()
      }
    });
  }

  goToResume(stepper) {
    this.tercerStep = false;
    this.verifyPass = false;
    if((<string>this.tercerGroup.get('opcion').value) === '3') {
      if(!this.pwGroup.valid) {
        return;
      }
      if(!(this.pwGroup.get('password').value === this.pwGroup.get('repassword').value)) {
        this.verifyPass = true;
        return;
      }
    }

    this.tercerStep = true;
    this.user = new User();
    this.user.correo = this.primerGroup.get('correo').value;
    this.user.rut = this.primerGroup.get('rut').value;
    this.user.nombres = this.segundoGroup.get('nombres').value;
    this.user.apellido_paterno = (this.segundoGroup.get('apellido_paterno').value as string).trim() || '';
    this.user.apellido_materno = (this.segundoGroup.get('apellido_materno').value as string).trim() || '';
    this.user.telefono = +(this.segundoGroup.get('telefono').value as string) || -1;
    this.user.password_generated = this.tercerGroup.get('opcion').value === '2' ? true : false;
    this.user.password_set = this.tercerGroup.get('opcion').value === '1' ? false : true;
    this.user.password = this.pwGroup.get('password').value;
    console.log(this.user);
    stepper.next();
  }

  /*
  activeEditData(){
    //this.disabledInput = false;
  }

  obtenerRutUsuario()
  {
      this._user.getUsersByUserName(this.nameToken).subscribe((data:any)=>{
       this.rut = data[0].rut;
       this.obtenerDataUsuario();
      })
  }

  obtenerDataUsuario()
  {
      this._user.getUserById(this.rut).subscribe((data:any)=>{
        console.log(data);
        this.nombre = data.nombres;
        this.apellido_paterno = data.apellido_paterno;
        this.apellido_materno = data.apellido_materno;
        this.num_telefono = data.telefono;
        this.password = data.password;
        this.api_token = data.api_token;
        this.correo =  data.correo;
        this.rol = data.rol;
        this.estado = data.estado;
      }
      )
      
  }


  actualizarUsuario()
  {

    let data = {
      "rut": this.rut,
      "nombres": this.nombre,
      "apellido_paterno":this.apellido_paterno,
      "apellido_materno": this.apellido_materno,
      "username": 'generico',
      "password": this.password,
      "correo": this.correo,
      "telefono": +this.num_telefono,
      "api_token": this.api_token,
      "estado": +this.estado,
      "rol": +this.estado


    }
    this._user.actualizarUsuario(this.rut, data).subscribe((data:any)=>{
      console.log("respuesta: " + data);
    });

    this._auth.setUser(this.nombre);

    this.dialogRef.close();


  }
  */
}
