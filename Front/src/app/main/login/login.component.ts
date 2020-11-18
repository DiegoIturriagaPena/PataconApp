import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ICredentials } from 'src/app/models/Autentificacion/credentials';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { Router } from '@angular/router';
import { RecoverypassComponent } from '../recoverypass/recoverypass.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginGrourp: FormGroup;
  loginPassValidator:boolean;
  // Permite saber si hay un usuario activo
  isloged:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    ) {
    }

  ngOnInit() {
    const token = this.authService.getToken() || '';
    this.isloged = token === '' ? false : true;



    if (token !== '') {
      this.authService.allowPermitionOnSystem({
        api_token : token
      }).subscribe(x => {
        // this.loaderService.push('login');
        this.authService.setToken(x.api_token);
        this.authService.setUser(x.name);
        this.router.navigate(['/pataconsys']);
      }, error => {
        this.authService.logout();
        this.isloged =  false;
        this.ngOnInit();
      }, () => {
      });
    }

    this.loginPassValidator = false;
    this.loginGrourp = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.minLength(5)]
    });
  }

  login() {
    this.loginPassValidator = true;

    if (this.loginGrourp.get('username').hasError('email') || this.loginGrourp.get('username').hasError('required')
     || this.loginGrourp.get('password').hasError('email') ) {
    return;
    }
    this.isloged = true;
    let credential: ICredentials =  {
       email: this.loginGrourp.get('username').value,
       password: this.loginGrourp.get('password').value
    };

    this.authService.login(credential).subscribe(data => {
      /**
       * Set data 
       */
      this.authService.setToken(data.api_token);
      this.authService.setUser(data.name);

      this.router.navigate(['/pataconsys']);

    },
    error => {
      // console.log(error.status);
      this.isloged = false;
      if (error.status === 401) {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Autentificación no valida.',
            bodyMessage: 'Verifique el usuario o contraseña',
            canSaveData: false
          }
        });
      }
    });
  }

  /**
   * @author Patricio Quezada
   * @summary allow recovery password
   */
  recoveryPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(RecoverypassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });
  }

}
