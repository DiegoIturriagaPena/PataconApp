import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { ICredentials } from 'src/app/models/Autentificacion/credentials';
import { UserRoles } from 'src/app/models/Autentificacion/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
  public static Login_POST = AuthService.API_ROOT +'/login';
  public static VerifyUser_POST = AuthService.API_ROOT +'/login/verify';
  public static recoverypass_POST = AuthService.API_ROOT + '/usuarios/recoverypass';
  private static FLAG_Auth = false;

  constructor(
    private http: HttpClient
    ) { }

    /**
     * @returns Servicio de login
     * @param credential Interfaz de credencial.
     */
  login(credential:ICredentials): Observable<ICredentials> {
    return this.http.post(AuthService.Login_POST,credential);
  }

  /**
   * Session storage
   */
  /**
   * 
   * @param token set token de la sesion.
   */
  setToken(token){
    sessionStorage.setItem(StorageService.Token,token);
  }

  /**
   * @returns token del usuario actual
   */
  getToken(){
    return sessionStorage.getItem(StorageService.Token);
  }

  /**
   * 
   * @param name Nombre de la actual sesion
   */
  setUser(name){
    sessionStorage.setItem(StorageService.UserName,name);
  }

  /**
   * @returns Nombre de la actual sesion
   */
  getUserName(){
    return sessionStorage.getItem(StorageService.UserName) || 'No definido';
  }

  allowPermitionOnSystem(i:ICredentials):Observable<ICredentials>{
    return this.http.post(AuthService.VerifyUser_POST,i);
  }

  /**
   * 
   * @param rol Parametro que identifica al tipo de usuario en el sistema.
   * @returns Si puede acceder al sistema (true)
   */
  isValidFromLogin(rol) {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      // console.log(payload);
      if (payload) {
        if ( rol === UserRoles.admin || rol === UserRoles.superadmin) {
          AuthService.FLAG_Auth = ((<string>payload.iss).search(AuthService.Login_POST) ||
          (<string>payload.iss).search(AuthService.Login_POST)) ? true : false;
        }
        return AuthService.FLAG_Auth;
      }
    }
    return false;
  }

  /**
   * 
   * @param token enviado del backend
   */
  payload(token) {
    const  payload = token.split('.')[1];
    // console.log('payload ->' + JSON.parse(payload));
    return this.decode(payload);
  }

  /**
   * 
   * @param payload (Informacion codificada) del token.
   */
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  logout(){
    sessionStorage.removeItem(StorageService.UserName);
    sessionStorage.removeItem(StorageService.Token);
  }

  /**
   * Get Current rol
   * TODO: introduce more roles
   */
  getRol() {
    if ( this.getToken()) {
      const payload = this.payload(this.getToken());
      if ( payload ) {
        switch ( payload.rol) {
          case UserRoles.superadmin:
          return UserRoles.superadmin;
          case UserRoles.admin:
          return UserRoles.admin;
          default:
          return UserRoles.unknow;
        }
      }
    }
    return UserRoles.unknow;
  }

  /**
   * @author Patricio Quezada.
   * @summary recupera contraseña
   * @param user usuario a recuperar
   */
  recoveryPass(user: ICredentials){
    return this.http.post(AuthService.recoverypass_POST,user);
  }
}
