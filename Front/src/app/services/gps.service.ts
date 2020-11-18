import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
    public static gps_POST = GpsService.API_ROOT + '/gps'
    public static gps_GET = GpsService.API_ROOT + '/gps'
    public static datos_gps_GET = GpsService.API_ROOT + '/datos_gps'
    public static gps_GET_IN = GpsService.API_ROOT + '/gps'
    public static gps_PUT = GpsService.API_ROOT + '/gps/'
    public static gps_DELETE = GpsService.API_ROOT+ '/gps/'
    constructor(
        private http: HttpClient
    ) { }


  obtenerGPS(): Observable<any> {
      return this.http.get(GpsService.gps_GET, {});
  }
  obtenerGPSporId(id:number): Observable<any>{
    let solicitud = GpsService.gps_GET + `/${id}`;
    return this.http.get(solicitud,{})
  }

  /**
   * Agrega un Gps a la bd
   * @param data contiene el resgistro a insertar.
   */
  ingresarGPS(data): Observable<any> {
    return this.http.post(GpsService.gps_POST,data);
  }

  actualizarGPS(id, data){
    return this.http.put(GpsService.gps_PUT+id,data);
  }

  /**
   * @author Roberto Ureta
   * Obtiene los gps que no han sido asignados a ningun camion.
   */
  obtenerGPSsinAsignar():Observable<any>{
    return this.http.get(GpsService.gps_GET+'/sinAsignar');
  }

  /**
   * @author Roberto Ureta
   * Obtiene los gps asignados a un camion junto con su patente ademas de los gps que no han sido asignados.
   */
  obtenerTodosLosGPS():Observable<any>{
    return this.http.get(GpsService.gps_GET+'/allGPS');
  }

  /**
   * @author Roberto Ureta
   * Actualiza el estado de un evento segun la ubicacion del gps.
   * @param data objeto JSON necesario para validar el lugar donde se encuentra el gps y la ruta.
   */
  revisarEstadoGPS(data:any):Observable<any>{
    console.log("Service: "+data);
    return this.http.get(GpsService.gps_GET+'/revisarEstado/'+data);
  }

  /**
   * @author Diego Iturriaga
   * Obtiene la posicion actual del gps.
   */
  obtenerPosicionGPS():Observable<any>{
    return this.http.get(GpsService.gps_GET_IN+'/in');
  }

  /**
   * 
   * @author Raimundo Vásquez
   * @param id el id para eliminar el gps
   * Método para eliminar el GPS
   */
  eliminarGps(id){
    return this.http.delete(GpsService.gps_DELETE+id);
  }

  /**
   * @author Patricio Quezada
   * @summary
   */
  getCurrentPosition(): Observable<Position>{
    return Observable.create(
      (observer) => {
      navigator.geolocation.watchPosition((pos: Position) => {
        console.log('Pocision'+pos);
        observer.next(pos);
      }),
      () => {
          console.log('Position is not available');
      },
      {
        enableHighAccuracy: true
      };
    });
  }
  

  /** */

  obtenerCoordenadasGPS():Observable<any>{
    return this.http.get(GpsService.datos_gps_GET);
  }
}
