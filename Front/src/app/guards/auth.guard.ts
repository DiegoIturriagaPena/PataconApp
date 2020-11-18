import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserRoles } from '../models/Autentificacion/user-roles';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    //TODO: Falta verificar si el token esta corrrecto.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getRol();
        if (currentUser === +UserRoles.admin || currentUser === +UserRoles.superadmin) {

            return true;
        } else {
            // Usuario no esta logeado.
            this.router.navigate(['/login']);
            return false;
        }
    }
}
