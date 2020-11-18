import { Injectable, EventEmitter , Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VinaService } from './vina.service';
import { ProductorService } from './productor.service';

@Injectable({
    providedIn: 'root'
})
export class RutaService {
    public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
    public static ruta_POST = RutaService.API_ROOT + '/rutas';
    public static ruta_GET = RutaService.API_ROOT + '/rutas';
    public static vina_GET = VinaService.API_ROOT + '/vinas';
    public static ruta_ALL_GET = RutaService.API_ROOT + '/rutas/all';
    public static productor_GET = ProductorService.API_ROOT + '/productores';

    @Output() directions: EventEmitter<any> = new EventEmitter();
    constructor(
        private http: HttpClient,
        private _vina: VinaService
    ) { }

    ingresarRuta(data: any): Observable<any> {
        return this.http.post(RutaService.ruta_POST, data);
    }

    obtenerRutas(): Observable<any> {
        return this.http.get(RutaService.ruta_GET, {});
    }


    obtenerRutasPorId(id:number)
    {
        return this.http.get(RutaService.ruta_GET+`/${id}`, {});
    }

    /**
     * Metodo para buscar una Viña asociada a la referencia que esta en una ruta especifica.
     * @param idVina Corresponde al id de la viña
     */
    buscarVinaSegunRuta(idVina:number){
        let busqueda = `?filter[where][id_vina]=${idVina}&filter[fields][ref_productor]=true`;
        return this.http.get(VinaService.API_VINA + busqueda);
    }

    /**
     * Metodo para buscar el productor asociada a la referencia que esta en una Viña especifica.
     * @param idVina Corresponde al id de la viña
     */
    buscarProductoSegunVina(idProductor:number){
        
        let busqueda = `?filter[where][id_productor]=${idProductor}&filter[fields][nombre]=true`;
        return this.http.get(ProductorService.API_ROOT + busqueda);
    }

    buscarIdVinaSegunProductor(idProductor:number){
        
        let busqueda = `?filter[where][ref_productor]=${idProductor}&filter[fields][id_vina]=true`;
        return this.http.get(VinaService.API_VINA + busqueda);
    }

    /**
     * @author Roberto Ureta
     * Peticion get que contiene las rutas asociadas a los productores.
     */
    obtenerRutasAsociadasProductor():Observable<any>{
        return this.http.get(RutaService.ruta_GET+'/rutasAsociadasConProductor');
    }

    getAllRutas(): Observable<any> {
        return this.http.get(RutaService.ruta_ALL_GET);
    }



    obtenerCoordenadasVina(vina:number)
    {

       this._vina.obtenerCoordenadasVina(vina).subscribe((data:any)=>{
        console.log("location_vina: " + data[0].longitud_ubicacion);
            this.directions.emit(data);
       });
            
      

        //console.log("DIRECTION: " + direction);
        //this.directions.emit(direction);
    }

    obtenerCoordenadasRutaPorId(id_ruta:number)
    {
        console.log("ID_RUTA_SERVICIO: " + id_ruta);
        let busqueda = `?filter[where][id_ruta]=${id_ruta}&filter[fields][longitud_inicio]=true&filter[fields][latitud_inicio]=true&filter[fields][longitud_destino]=true&filter[fields][latitud_destino]=true&filter[fields][waypoints]=true`;
        return this.http.get(RutaService.ruta_GET + busqueda);
    }

    actualizarRutaPorId(id:number,data:any) : Observable<any>
    {
        return this.http.put(RutaService.ruta_GET+'/'+id,data);
    }

    eliminarRutaPorId(id:number){
        return this.http.delete(RutaService.ruta_GET+'/'+id);
    }




}
