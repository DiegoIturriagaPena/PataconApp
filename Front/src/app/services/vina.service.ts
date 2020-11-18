import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { vina } from '../models/Vina/i-vina';
import { ViniasService } from './ViniasService/vinia.service';
@Injectable({
    providedIn: 'root'
})

export class VinaService {
    public static API_ROOT = AuthService.API_ROOT
    public static vina_POST = VinaService.API_ROOT + '/vinas';
    public static vina_GET = VinaService.API_ROOT + '/vinas';
    public static API_VINA = VinaService.API_ROOT + '/vinas';
    public static API_VINA_ADD = VinaService.API_VINA + '/add';
    public static API_VINA_GETALL = VinaService.API_VINA + '/getall';
    public static API_VINA_GET = VinaService.API_VINA + '/get';
    public static API_VINA_SET = VinaService.API_VINA + '/set';
    constructor(
        private http: HttpClient
    ) { }

    /**
     * 
     * @param data Nueva Viña a ingresar
     */
    ingresarVina(data: vina): Observable<any> {
        return this.http.post(VinaService.API_VINA, data);
    }

    obtenerVinas(): Observable<any> {
        return this.http.get(VinaService.API_VINA, {});
    }

    /**
     * @author Patricio Quezada
     * @summary Crea una viña
     * @param data vina a agregar
     */
    nuevaVina(data: vina): Observable<any>{
        return this.http.post(VinaService.API_VINA_ADD,data);
    }

    /**
     * @author Patricio Quezada
     * @summary Obtiene viñas los productores.
     * @param id ID del productor
     */
    obtenerVinaPorProductor(id: number): Observable<any>{
        return this.http.get(VinaService.API_VINA_GETALL +'/'+id);
    }

    /**
     * @author Patricio Quezada
     * @summary Retorna la viña segun su id
     * @param id de la viña
     */
    obtenerVina(id: number): Observable<any>{
        return this.http.get(VinaService.API_VINA_GET+'/'+id);
    }

    setModificar(currentVina: vina): Observable<any>{
        return this.http.post(VinaService.API_VINA_SET,currentVina);
    }


    obtenerCoordenadasVina(vina:number)
  {
    let busqueda = `?filter[where][id_vina]=${vina}&filter[fields][longitud_ubicacion]=true&filter[fields][latitud_ubicacion]=true`;
    return this.http.get(VinaService.API_ROOT+'/vinas'+busqueda);
  }
}