import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ViniasService{
  public static API_ROOT = 'https://osiris-api.tk/api';
  public static vinias_GET = ViniasService.API_ROOT + '/vinias'
  public static vinias_POST = ViniasService.API_ROOT + '/vinias'


  constructor(
    private http: HttpClient
  ) { }


// retorna la lista de todas las viñas
  obtenerVinias(): Observable<any> {
    console.log()
    return this.http.get(ViniasService.vinias_GET);
  }

  instartarVinia(data:any): Observable<any>{
    return this.http.post(ViniasService.vinias_POST, data);

  }


  
}
