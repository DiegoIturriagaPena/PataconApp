import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ModificarCuentaComponent } from '../../user/shared/modificar-cuenta/modificar-cuenta.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authservice:AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  /**
   * Borra datos de sesión.
   */
  logout(){
    this.authservice.logout();
    this.router.navigate(['/login']);
  }


  modificarCuenta()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(ModificarCuentaComponent, {
      width: '1000px',
      height: '470px'
    });

    dialogRef.afterClosed().subscribe(data => {

      //this.obtenerRutas();
    });
  }

}
