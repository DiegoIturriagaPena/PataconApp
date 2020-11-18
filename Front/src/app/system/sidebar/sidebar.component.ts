import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../menu/theme/menu-item';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItemService } from '../menu/theme/menu-item.service';
import { adminMenu, superAdminMenu } from '../menu/menu-routing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/models/Autentificacion/user-roles';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModificarCuentaComponent } from '../../user/shared/modificar-cuenta/modificar-cuenta.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnDestroy {

  public navItems: MenuItem[];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  userName: string;
  

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private navService: MenuItemService,
    private authService: AuthService,
    private router: Router,
    private dialog:MatDialog
  )
  {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userName = this.authService.getUserName();
    // set Menu with current privilegies
    if(this.authService.getRol() == UserRoles.superadmin){
      this.navItems = superAdminMenu;
    } else {
      this.navItems = adminMenu;
    }
    
  }

  modificarCuenta()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(ModificarCuentaComponent, {});
    dialogRef.afterClosed().subscribe(data => {});
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   *  Borra datos de sesión.
   */
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  editarPerfil()
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
