import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class ChoferService {
    public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
    public static chofer_POST = ChoferService.API_ROOT + '/choferes'
    public static chofer_GET = ChoferService.API_ROOT + '/choferes'
    public static chofer_PUT = ChoferService.API_ROOT + '/choferes/'
    constructor(
        private http: HttpClient
    ) { }

    ingresarChofer(data: any): Observable<any> {
        console.log(data)

       return this.http.post(ChoferService.chofer_POST, data);
       
    }

    obtenerChoferes(): Observable<any> {
        return this.http.get(ChoferService.chofer_GET, {});
    }

    /**
     * @author Roberto Ureta
     * Obtiene un chofer segun su id
     * @param rut RUT del chofer el cual funciona como id.
     */
    obtenerChoferPorID(rut): Observable<any>{
        return this.http.get(ChoferService.chofer_GET+'/'+rut);
    }

    /**
     * @author Roberto Ureta
     * Actualiza un chofer en la BD.
     * @param rut RUT del chofer a actualizar, el cual es su id.
     * @param data datos actualizados obtenidos del formulario.
     */
    actualizarChofer(rut,data): Observable<any>{
        return this.http.put(ChoferService.chofer_PUT+rut,data);
    }

    /**
     * @author Roberto Ureta
     * Obtiene los choferes que no han sido asignados a un recorrido.
     * @version 2
     * @author Patricio Quezada.
     * @summary Obtiene los choferes
     */
    obtenerChoferesSinAsignar(fecha_i,fecha_t):Observable<any>{
        return this.http.post(ChoferService.chofer_GET+'/sinAsignar',
        {
            f_ini: fecha_i,
            f_fin: fecha_t
        });
    }
}
