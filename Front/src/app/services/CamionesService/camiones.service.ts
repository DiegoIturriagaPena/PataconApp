import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CamionesService{
  public static API_ROOT = 'https://osiris-api.tk/api';
  public static flota_GET = CamionesService.API_ROOT + '/camiones'
  public static flota_POST = CamionesService.API_ROOT + '/camiones'
  public static flota_PUT = CamionesService.API_ROOT + '/camiones/'


  constructor(
    private http: HttpClient
  ) { }


// retorna la lista de todos los camiones (flota)
  obtenerCamiones(): Observable<any> {
    // console.log()
    return this.http.get(CamionesService.flota_GET);
  }

  insertarCamion(data:any): Observable<any>{
    return this.http.post(CamionesService.flota_POST, data);
  }

  /**
   * @author Roberto Ureta
   * Obtiene el objeto camion segun la patente de este.
   * @param patente id a buscar
   */
  obtenerCamionPorID(patente:string):Observable<any>{
    return this.http.get(CamionesService.flota_GET+'/'+patente);
  }
  /**
   * @author Roberto Ureta
   * Actualiza un camion especifico segun su patente
   * @param data registro actualizado
   */
  actualizarCamion(patente:string ,data:any):Observable<any>{
    return this.http.put(CamionesService.flota_PUT+patente,data);
  }

  /**
     * @author Roberto Ureta
     * @summary Obtiene los camiones que no han sido asignados a un recorrido.
     * 
     * @version 2
     * @author Patricio Quezada.
     * @summary Obtiene los camiones no asignados segun su disponibilidad.
     * @param inicio Fecha de inicio.
     * @param fin Fecha de fin.
     */
    obtenerCamionesSinAsignar(inicio: any, fin:any):Observable<any>{
      return this.http.post(CamionesService.flota_GET+'/sinAsignar',{
        f_ini: inicio,
        f_fin: fin,
      });
  }

  /**
     * @author Roberto Ureta
     * Obtiene los camiones que no han sido asignados y que pueden transportar lo solicitado.
     */
  obtenerCamionesSegunCarga(carga:number):Observable<any>{
    return this.http.get(CamionesService.flota_GET+'/segunCarga/'+carga);
  }


  actualizarReferenciaGps(id_gps:number) :Observable<any>{
    return this.http.put(CamionesService.flota_PUT+'actualizarRef/'+id_gps,null);
  }
}
