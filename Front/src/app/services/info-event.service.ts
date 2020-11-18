import { Injectable, Output,EventEmitter } from '@angular/core';
import { CamionesService } from './CamionesService/camiones.service';
import { HttpClient } from '@angular/common/http';
import { ChoferService } from './chofer.service';
import {RecorridoService} from './recorrido.service';
import {RutaService} from './ruta.service';
import {EventoService} from './evento.service';






@Injectable({
  providedIn: 'root'
})
export class InfoEventService {




  isOpen:boolean = false;
  patente:string;
  rut:string;
  name:string;
  telefono:string;
  ruta:number;
  @Output() change = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  toggle(patente:string) {
    this.obtenerRutDuenoSegunPatente(patente).subscribe((rut:any)=>{

           this.rut = rut[0].ref_chofer;
           this.ruta = rut[0].ref_ruta;
           this.obtenerNombreDuenoSegunRutDueno(this.rut).subscribe((nombre)=>{
            console.log(nombre);
            this.name = nombre[0].nombre + " "+ nombre[0].apellido_paterno;
            this.telefono = nombre[0].telefono;
            this.obtenerDatosRuta(this.ruta).subscribe((res:any)=>{
              console.log("ruta",res);
              this.isOpen = !this.isOpen;  
            let data = {
              "nombre": this.name,
              "patente": patente,
              "telefono": +this.telefono,
              "isOpen": this.isOpen,
              "zoom": (this.isOpen) ? 15 : 12,
              "longitud_inicio":res.longitud_inicio,
              "latitud_inicio":res.latitud_inicio,
              "longitud_destino":res.longitud_destino,
              "latitud_destino":res.latitud_destino,
              "waypoints":JSON.parse(res.waypoints)
            }
        
        
            
        
            this.change.emit(data);

            });
            
          });
            
    });


   

    

    
  }


obtenerNombreDuenoSegunRutDueno(rut:string)
{


  let busqueda = `?filter[where][rut]=${rut}&filter[fields][nombre]=true&filter[fields][apellido_paterno]=true&filter[fields][telefono]=true`;
  return this.http.get(ChoferService.chofer_GET + busqueda);
}


  obtenerRutDuenoSegunPatente(patente:string)
  {
      let busqueda = `?filter[where][ref_camion]=${patente}&filter[fields][ref_chofer]=true&filter[fields][ref_ruta]=true`;
      return this.http.get(RecorridoService.recorrido_API + busqueda);
  
  }

  obtenerDatosRuta(ruta: number){
    return this.http.get(RutaService.ruta_GET+'/'+ruta);
  }
  
  obtenerEstadoEvento(id:number){
    let busqueda = `?filter[where][id_evento]=${id}&filter[fields][tipo]=true`
    return this.http.get(EventoService.evento_GET+busqueda)
  }

}
