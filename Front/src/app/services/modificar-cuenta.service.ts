import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VinaService } from './vina.service';
@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
    public static usuario_POST = UsuarioService.API_ROOT + '/usuarios'
    public static usuario_GET = UsuarioService.API_ROOT + '/usuarios'
    public static usuario_PUT = UsuarioService.API_ROOT + '/usuarios'
    constructor(
        private http: HttpClient
    ) { }

    ingresarUsuario(data: any): Observable<any> {
        return this.http.post(UsuarioService.usuario_POST, data);
    }
    
    /**
     * @author Diego Iturriaga
     * Obtiene un usuario segun su id
     * @param rut RUT del chofer el cual funciona como id.
     */
    obtenerUsuario(rut): Observable<any> {
         return this.http.get(UsuarioService.usuario_GET+'/'+rut);
    }
 
    /**
     * @author Diego Iturriaga
     * Actualiza un usuario en la BD.
     * @param rut RUT del usuario a actualizar, el cual es su id.
     * @param data datos actualizados obtenidos del formulario.
     */
    actualizarChofer(rut,data): Observable<any>{
        return this.http.put(UsuarioService.usuario_PUT+rut,data);
    }
}