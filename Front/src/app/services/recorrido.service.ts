import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IRecorrido } from '../user/shared/crear-recorrido/crear-recorrido.component';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecorridoService {
  public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
  public static recorrido_POST = RecorridoService.API_ROOT + '/recorridos'
  public static recorrido_GET = RecorridoService.API_ROOT + '/recorridos'
  public static recorrido_API = RecorridoService.API_ROOT + '/recorridos';
  public static recorrido_GET_CALENDAR = RecorridoService.recorrido_API + '/all';

  private viajeCollectionName = 'viaje'

  constructor(
      private http: HttpClient,
      private db : AngularFirestore,

  ) { }

  ingresarRecorrido(data: any): Observable<any> {
      console.log(data);
      return this.http.post(RecorridoService.recorrido_API, data);
  }

  obtenerRecorridos(): Observable<any> {
      return this.http.get(RecorridoService.recorrido_API, {});
  }

  /**
   * @author Patricio Quezada L.
   * @summary obtiene los datos para el calendar
   */
  getRecorridosForCalendar(): Observable<any>{
    return this.http.get(RecorridoService.recorrido_GET_CALENDAR);

  }

}
