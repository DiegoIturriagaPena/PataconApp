import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RutasService{
  public static API_ROOT = 'https://osiris-api.tk/api';
  public static ruta_GET = RutasService.API_ROOT + '/rutas'
  public static ruta_POST = RutasService.API_ROOT + '/rutas'


  constructor(
    private http: HttpClient
  ) { }


// retorna la lista de todas las rutas
  obtenerRutas(): Observable<any> {
    console.log()
    return this.http.get(RutasService.ruta_GET);
  }

  insertarRutas(data:any): Observable<any>{
    return this.http.post(RutasService.ruta_POST, data);

  }
}
