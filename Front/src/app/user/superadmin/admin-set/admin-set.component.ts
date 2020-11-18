import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, IUser } from 'src/app/models/Usuarios/usuario';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';


@Component({
  selector: 'app-admin-set',
  templateUrl: './admin-set.component.html',
  styleUrls: ['./admin-set.component.scss']
})
export class AdminSetComponent implements OnInit {

  // Datos coorporativos
  primaryform: FormGroup;
  // Datos personales
  secondaryform: FormGroup;
  // Credenciales
  thirdform: FormGroup;
  // Password
  passform: FormGroup;
  verifyPass: boolean;
  lastSteep: boolean;

  User: User;
  AuxUser: IUser;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminSetComponent>,
    public dialog: MatDialog,
    private userService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) data: IUser
  ) {
    this.AuxUser = data;
  }

  // Regex Rut (11.111.333-2): '^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$'
  ngOnInit() {
    // Verificaciones para los stepper
    this.verifyPass = false;
    this.lastSteep = false;

    this.User = new User();
    this.User.rut = this.AuxUser.rut;
    this.User.correo = this.AuxUser.correo || '';
    this.User.nombres = this.AuxUser.nombres || '';
    this.User.apellido_paterno = this.AuxUser.apellido_paterno || '';
    this.User.apellido_materno = this.AuxUser.apellido_materno || '';
    this.User.telefono = this.AuxUser.telefono || -1;

    // Primer stepper
    this.primaryform = this.fb.group({
      rut: [{ value: this.User.rut, disabled: true }, [
        // Validators.pattern('^[0-9]{,8}$')
      ]],
      correo: [this.User.correo,
      [Validators.required,
      Validators.email
      ]
      ]
    });
    // Segundo stepper
    this.secondaryform = this.fb.group({
      nombres: [this.AuxUser.nombres || '', [
        Validators.required,
      ]],
      apaterno: [this.User.apellido_paterno],
      amaterno: [this.User.apellido_materno],
      telefono: [this.User.telefono === -1 ? '' : this.User.telefono + '', 
    [Validators.pattern('(9)[0-9]{8}')]],
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
        bodyMessage: '¿Está seguro que desea modificar este supervisor?',
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
          password_set: this.User.password_set,
          password: this.User.password,
          nombres: this.User.nombres,
          telefono: this.User.telefono
        };

        this.userService.updateSupervisor(u).subscribe(d => {
          if (d.data === '200') {
            const dialog = this.dialog.open(PdialogComponent, {
              panelClass: 'custom-dialog-container',
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
                  bodyMessage: 'No se ha logrado modificar.<br>Código de error:'+error.status,
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
        bodyMessage: '¿Está seguro que desea salir?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        this.dialogRef.close();
      }
    });
  }

  goToResume(stepper) {
    this.lastSteep = false;
    this.verifyPass = false;
    this.User = null;
    if ((<string>this.thirdform.get('option').value) === '3') {
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
    this.User.rut = this.primaryform.get('rut').value;
    this.User.nombres = this.secondaryform.get('nombres').value;
    this.User.apellido_paterno = (this.secondaryform.get('apaterno').value as string).trim() || '';
    this.User.apellido_materno = (this.secondaryform.get('amaterno').value as string).trim() || '';
    this.User.telefono = +(this.secondaryform.get('telefono').value as string).trim() || -1;
    this.User.password_generated = this.thirdform.get('option').value === '2' ? true : false;
    this.User.password_set = this.thirdform.get('option').value === '1' ? false : true;
    this.User.password = this.passform.get('pass').value;
    // console.log(this.User.password_generated);
    stepper.next();
  }



}
