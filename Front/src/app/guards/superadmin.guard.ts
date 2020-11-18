import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserRoles } from '../models/Autentificacion/user-roles';

@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate  {
  constructor(
    private router: Router,
    private authService: AuthService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getRol();
    if (currentUser === +UserRoles.superadmin) {
        return true;
    } else {
        // Usuario no esta logeado.
        this.router.navigate(['/pataconsys']);
        return false;
    }
}
  
}
