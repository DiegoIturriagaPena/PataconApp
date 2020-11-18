import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface EventInterfaceState{
    id_evento:number;
    tipo:string;
}

@Injectable({
    providedIn: 'root'
})

export class EventoService {
    public static API_ROOT = 'https://osiris-api.tk/api'; //No eliminar, cuando se pasa a produccion ayudará
    public static evento_GET = EventoService.API_ROOT + '/eventos';
    public static recorrido_GET = EventoService.API_ROOT +'/recorridos';
    public static chofer_GET = EventoService.API_ROOT + '/choferes';
    public static evento_POST = EventoService.API_ROOT + '/eventos';
    public static tipoUva_GET = EventoService.API_ROOT + '/tipo-uvas';
    public static ruta_GET = EventoService.API_ROOT + '/rutas';
    public static evento_SET_TIPO = EventoService.API_ROOT + '/eventos/state'
    public static evento_GET_FECHA = EventoService.API_ROOT + '/eventos/segunFecha/'
    
    constructor(
        private http: HttpClient
    ) { }
    
    ingresarEvento(data: any): Observable<any> {
       return this.http.post(EventoService.evento_POST, data);       
    }

    obtencionEvento(): Observable<any> {

       return this.http.get(EventoService.evento_GET, {});
    }
    /**
     * Metodo para buscar una lista de eventos segun el filtrado requerido por el usuario.
     * @param filtro Corresponde al valor a buscar en la lista de eventos.
     * @param tipoBusqueda Corresponde al filtrado que se esta realizando.
     */
    buscarFiltro(filtro:string, tipoBusqueda: string):Observable<any>{
        let busqueda="";
        switch (tipoBusqueda) {
            case "estado":
                busqueda = filtro === "" ? "" : "?filter[where][tipo]=";
                return this.http.get(EventoService.evento_GET+busqueda+filtro);
            case "carga":
                busqueda = filtro === "" ? "" : "?filter[where][tipo_carga]=";
                return this.http.get(EventoService.recorrido_GET+busqueda+filtro);
            default:
                break;
        }
        return this.http.get(EventoService.evento_GET+busqueda+filtro);
    }

    /**
     * Metodo para buscar la ruta asociada a un id de viña especifico.
     * @param idVina Corresponde al id de la viña
     */
    buscarRutasSegunVina(idVina:number){
        let busqueda = `?filter[where][ref_vinna]=${idVina}&filter[fields][id_ruta]=true`;
        return this.http.get(EventoService.ruta_GET+busqueda);
    }

    /**
     * Metodo para buscar el recorrido segun una ruta especifica.
     * @param idRuta Corresponde al id de la ruta.
     */
    buscarRecorridoSegunRuta(idRuta:number){
        let busqueda = `?filter[where][ref_ruta]=${idRuta}&filter[fields][id_recorrido]=true&filter[fields][ref_chofer]=true&filter[fields][ref_camion]=true`;
        return this.http.get(EventoService.recorrido_GET+busqueda);
    }

    /**
     * Metodo para buscar eventos segun un recorrido especifico.
     * @param idRecorrido Corresponde al id de un recorrido.
     */
    buscarEventoSegunRecorrido(idRecorrido:number){
        let busqueda = `?filter[where][ref_recorrido]=${idRecorrido}`;
        return this.http.get(EventoService.evento_GET+busqueda);
    }

    /**
     * Metodo para obtener la referencia al chofer segun un id de recorrido.
     * @param idRecorrido id del recorrido
     */
    buscarChofer(idRecorrido:number){
        let busqueda = `?filter[where][id_recorrido]=${idRecorrido}&filter[fields][ref_chofer]=true&filter[fields][ref_camion]=true`;
        return this.http.get(EventoService.recorrido_GET+busqueda);
    }

    /**
     * Metodo para obtener la referencia al camion segun el rut del chofer.
     * @param idChofer rut chofer
     */
    buscarPatente(idChofer:string){
        let busqueda = `?filter[where][rut]=${idChofer}&filter[fields][ref_camion]=true`;
        return this.http.get(EventoService.chofer_GET+busqueda);
    }  


    filtrarEventosPorTipo(tipo:string, fecha:string)
    {
        
        return this.http.get(EventoService.evento_GET_FECHA+fecha+'/'+tipo);
    }

    buscarEventos(){
        return this.http.get(EventoService.evento_GET);
    }

    changeTipoEvento(evento: EventInterfaceState) : Observable<any>
    {
            return this.http.post(EventoService.evento_SET_TIPO,evento);
    }
}