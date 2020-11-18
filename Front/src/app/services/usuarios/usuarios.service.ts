import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IUser } from 'src/app/models/Usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public static API_ROOT = AuthService.API_ROOT + '/'; //No eliminar, cuando se pasa a produccion ayudará
  /**
   *
   * Api supervisores
   */
  public static API_SUPERVISOR = UsuariosService.API_ROOT + 'supervisores';
  public static API_SUPERVISOR_CHANGESTATE = UsuariosService.API_SUPERVISOR + '/state';
  public static API_SUPERVISOR_UPDATE = UsuariosService.API_SUPERVISOR + '/update';
  




  public static API_GET_DATA_USUARIO = UsuariosService.API_ROOT + 'usuarios'

  // public static API_GET_SUPERVISORES = UsuariosService.;
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   *  Supervisores
   *
   */

  /**
   * @returns Una lista de supervisores
   */
  getSupervisores(): Observable<any> {
    return this.http.get(UsuariosService.API_SUPERVISOR);
  }

  /**
   * @returns respuesta del servidor
   * @param usuario usuario a guardar
   */
  newSupervisor(usuario: IUser): Observable<any> {
    return this.http.post(UsuariosService.API_SUPERVISOR, usuario);
  }

  /**
   * 
   * @param usuario usuario del estado a modificar
   */
  changeStateSupervisor(usuario:IUser): Observable<any>{
    return this.http.post(UsuariosService.API_SUPERVISOR_CHANGESTATE, usuario);
  }

  updateSupervisor(usuario: IUser): Observable<any>{
    return this.http.post(UsuariosService.API_SUPERVISOR_UPDATE, usuario);
  }


  getUserById(rut:string): Observable<any>
  {
      return this.http.get(UsuariosService.API_GET_DATA_USUARIO +`/${rut}`);
  }

  getUsersByUserName(userName:string): Observable<any>
  {
    let busqueda = `?filter[where][nombres]=${userName}&filter[fields][rut]=true`;
    return this.http.get(UsuariosService.API_GET_DATA_USUARIO+busqueda);
  }

  actualizarUsuario(rut:string, data:any): Observable<any>
  {
     return this.http.put(UsuariosService.API_GET_DATA_USUARIO+`/${rut}`,data);
  }
}
