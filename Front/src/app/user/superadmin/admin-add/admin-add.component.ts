import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatStepper } from '@angular/material';
import { IUser, User } from 'src/app/models/Usuarios/usuario';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

  // Datos coorporativos
  primaryform: FormGroup;
  // Datos personales
  secondaryform: FormGroup;
  // Credenciales
  thirdform: FormGroup;
  // Password
  passform: FormGroup;
  verifyPass:boolean;
  lastSteep:boolean;

  User: User;
  u: IUser;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminAddComponent>,
    public dialog: MatDialog,
    private userService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  // Regex Rut (11.111.333-2): '^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$'
  ngOnInit() {
    // Verificaciones para los stepper
    this.verifyPass = false;
    this.lastSteep = false;

    this.User = new User();
    // Primer stepper
    this.primaryform = this.fb.group({
      rut: ['', [
        Validators.required,
        Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}(-)([0-9]|(k|K))')
      ]],
      correo: ['',
      [Validators.required,
        Validators.email
      ]
    ]
    });
    // Segundo stepper
    this.secondaryform =  this.fb.group({
      nombres: ['',[Validators.required]],
      apaterno: [''],
      amaterno: [''],
      telefono: ['', Validators.pattern('(9)[0-9]{8}')],
      // username: [''],
    });
    // Tercer steeper
    this.thirdform = this.fb.group({
      option: ['1'],
    });

    this.passform = this.fb.group({
      pass: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      repass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  save() {

    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea guardar?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        // Guarda los datos
        const u: IUser = {
          correo: this.User.correo,
          rut: this.User.rut,
          apellido_materno: this.User.apellido_materno,
          apellido_paterno: this.User.apellido_paterno,
          password_generated: this.User.password_generated,
          password: this.User.password,
          nombres: this.User.nombres,
          telefono: this.User.telefono
        };

        this.userService.newSupervisor(u).subscribe( data => {
          if (data.data === '200') {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La operación ha sido realizado con éxito',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.dialogRef.close(true);
            });
          }
        },
        error => {
           console.log(error);
           if (error.status === 400) {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'El usuario ya existe.',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
            });
          } else {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'Problemas con el servidor',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
            });
          }
        }
        );

      } else {
        this.dialogRef.close();
      }
    });


    // console.log(this.primaryform.get('rut').errors);
    // this.dialogRef.close(this.form.value);
  }

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

  goToResume(stepper) {
    this.lastSteep = false;
    this.verifyPass = false;
    this.User = null;
    if ( (<string>this.thirdform.get('option').value) === '2') {
      if (!this.passform.valid) {
        return;
      }
      if (!(this.passform.get('pass').value === this.passform.get('repass').value)) {
        this.verifyPass = true;
        return;
      }
    }
    this.lastSteep = true;
    this.User = new User();
    this.User.correo = this.primaryform.get('correo').value;
    this.User.rut =  this.primaryform.get('rut').value;
    this.User.nombres = this.secondaryform.get('nombres').value;
    this.User.apellido_paterno = (this.secondaryform.get('apaterno').value as string).trim() || '';
    this.User.apellido_materno = (this.secondaryform.get('amaterno').value as string).trim() || '';
    this.User.telefono = +(this.secondaryform.get('telefono').value as string).trim() || -1;
    this.User.password_generated = this.thirdform.get('option').value === '1' ? true : false;
    this.User.password = this.passform.get('pass').value;
    stepper.next();
  }

   /**
 * @author Nicolás Hervias
 * @summary Toma el rut desde la vista y valida el dígito verificador
 */
validarRutPrimero() {
  this.u = {
    rut: this.primaryform.get('rut').value
  }
  let dv = this.validarRut();
  if(!(dv.toLocaleLowerCase() === this.u.rut.slice(-1).toLocaleLowerCase())) 
  {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: 'El Rut es incorrecto.'
      }
    });
  }
  else
  {
    this.stepper.next();
  }
}

/**
* @author Nicolás Hervias
* @summary Algoritmo "Módulo 11" para calcular dígito verificador de un rut
*/
validarRut(): string {
  let dv: string;
  // primero usamos los números antes del -
  let rut = this.u.rut.split('').slice(0,-2);

  // invertimos orden de los números
  let revRut = rut.reverse();

  // convertimos los strings en números
  let rutNums: Array<number> = [];
  for(let i = 0; i < rut.length; i++){
    var l = rutNums.push(Number(revRut[i]));
  }

  // luego multiplicamos cada número de atrás hacia adelante por 2, 3, 4, 5, 6 y 7 y sumamos
  let sum = 0;
  var j = 2;
  for(let i = 0; i < rutNums.length; i++){
    if(j > 7) { j = 2; } // al llegar a 8 volvemos al 2
    sum += (rutNums[i]*j); // sumamos todo
    j++;
  }

  // calculamos el mod de 11 de la sumatoria y se lo restamos a 11
  let aux;
  aux = sum % 11;
  aux = 11 - aux;
  // si el resultado es 10, el dv es k, si es 11 el dv es 0
  if(aux == 11) { return "0"; }
  else if(aux == 10) { return "K"; }
  // si no es ni 10 ni 11, retorna el valor como dv
  else {return String(aux);}
}


}
