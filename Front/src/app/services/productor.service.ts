import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VinaService } from './vina.service';
import { IProductor } from '../models/Productor/i-productor';

import { AuthService } from './auth/auth.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class ProductorService {
    public static API_ROOT = AuthService.API_ROOT; //No eliminar, cuando se pasa a produccion ayudará
    public static API_PRODUCTOR = ProductorService.API_ROOT + '/productores';
    public static API_PRODUCTOR_SET_ESTADO = ProductorService.API_PRODUCTOR + '/state';
    public static API_PRODUCTOR_SET = ProductorService.API_PRODUCTOR + '/set' ;
    private productoresCollectionName = 'usuario'
    public static productor_POST = ProductorService.API_ROOT + '/productores'
    public static productor_GET = ProductorService.API_ROOT + '/productores'
    public static productor_GET_DISPONIBLE = ProductorService.API_ROOT + '/productores/disponibles'
    public static productor_PUT = ProductorService.API_ROOT + '/productores/'
    constructor(
        private http: HttpClient,
        private db : AngularFirestore,
        
    ) { }

    /**
     * @summary Crea un productor
     * @param data productor
     */
    ingresarProductor(data: any): Observable<any> {
       return this.http.post(ProductorService.productor_POST, data);
    }

    obtenerProductores(): Observable<any> {
        return this.http.get(ProductorService.productor_GET, {});
    }

    obtenerProductoresDisponibles(): Observable<any> {
        return this.http.get(ProductorService.productor_GET_DISPONIBLE, {});
    }

    buscarIdVinaSegunProductor(idProductor: number) {

        let busqueda = `?filter[where][ref_productor]=${idProductor}&filter[fields][id_vina]=true&filter[fields][nombre_vina]=true&filter[fields][longitud_ubicacion]=true&filter[fields][latitud_ubicacion]=true`;
        return this.http.get(VinaService.API_VINA + busqueda);
    }

    /**
     * @author Roberto Ureta
     * Obtiene el objeto productor segun su id asociado.
     * @param id id a buscar
     */
    obtenerProductorPorID(id: number): Observable<any> {
        return this.http.get(ProductorService.productor_GET + '/' + id);
    }

    /**
     * Metodo que retorna el telefono de un productor especifico en base a su id.
     * @param idProductor id del productor objetivo
     */
    obtenerTelefonoProductor(idProductor: number):Observable<any>{
        let busqueda = `?filter[where][id_productor]=${idProductor}&filter[fields][telefono]=true`;
        return this.http.get(ProductorService.productor_GET+busqueda);
    }

    /**
     * @author Roberto Ureta
     * Actualiza un productor especifico segun su id
     * @param data registro actualizado
     */
    actualizarProductor(id: number, data: any): Observable<any> {
        return this.http.put(ProductorService.productor_PUT + id, data);
    }

    /**
     * @author Patricio Quezada L.
     * @summary Actualiza el estado del productor
     * @param productor Objecto a actualizar
     */
    setEstado(productor: IProductor): Observable<any>{
        return this.http.post(ProductorService.API_PRODUCTOR_SET_ESTADO, productor);
    }

     /**
     * @author Patricio Quezada L.
     * @summary Actualiza la informacion del productor
     * @param productor Objecto a actualizar
     */
    setProductor(productor: IProductor): Observable<any>{
        return this.http.post(ProductorService.API_PRODUCTOR_SET, productor);
    }



  

}
