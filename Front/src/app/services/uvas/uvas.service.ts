import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { IUva } from 'src/app/models/Vina/i-uva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UvasService {
public static API_ROOT = AuthService.API_ROOT;
public static API_UVA = UvasService.API_ROOT + '/tipo-uvas';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary Crea una nueva Uva.
   * @param uva Uva a crear.
   */
  createUva(uva: IUva): Observable<any> {
    return this.http.post(UvasService.API_UVA,uva);
  }

   /**
   * @summary Obtiene todos los tipos de uva
   * @returns lista de Tipos de Uvas
   */
  getAllUvas(): Observable<any>{
    return this.http.get(UvasService.API_UVA);
  }

  /**
   * @summary Permite eliminar 
   * @param element uva a eliminar
   */
  deleteUva(element: IUva): Observable<any>{
    return this.http.delete(UvasService.API_UVA + '/' + element.id_tipo_uva);
  }

  /**
   * @author Patricio Quezada
   * @summary Permite obtener una uva
   * @param element Uva a solicitar
   */
  getOneUva(element: IUva): Observable<any>{
    return this.http.get(UvasService.API_UVA + '/' + element.id_tipo_uva);
  }

  /**
   * @author Patricio Quezada
   * @param element Elemento a modificar
   * @summary Permite modificar un tipo de
   */
  setOnveUva(element:IUva): Observable<any>{
    return this.http.put(UvasService.API_UVA + '/' + element.id_tipo_uva ,element);
  }

}
