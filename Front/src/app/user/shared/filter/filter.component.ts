import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { EventInterface, EventsComponent } from '../events/events.component';
import { MatDialog } from "@angular/material";
import { element } from '@angular/core/src/render3';
import { Observable, forkJoin, zip, Subject } from 'rxjs';
import { trigger } from '@angular/animations';
//import { Evento } from '../events/events.component';
import { InfoEventService } from '../../../services/info-event.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  mostrarFiltros: Boolean;
  filterShow: number;
  isSelected:boolean = false;
 

  dataEventos: EventInterface[];

  filtrado:any = [
    {
      'tipoBusqueda':'Estado',
      filtros:[
        'Pendiente','Saliendo', 'Llegando', 'En ruta', 'Desviado','Cancelado','Terminado'
      ]
    },
    /*{
      'tipoBusqueda':'Origen',
      filtros:[
        'Vinicola Patacon', 'Viña San Pedro', 'Viña Miguel Torres', 'Viña Concha y Toro'
      ]
    },
    {
      'tipoBusqueda':'Destino',
      filtros:[
        'Vinicola Patacon', 'Viña San Pedro', 'Viña Miguel Torres', 'Viña Concha y Toro'
      ]
    },*/
    {
      'tipoBusqueda':'Carga',
      filtros:[
        'CARIG', 'TTRO', 'CHARD', 'SEMILLON', 'S.BLANC'
      ]
    }
    
  ]
  //tipoBusqueda: string[] = ['Estado', 'Origen', 'Destino', 'Carga'];
  busquedaSeleccionada: string = 'Ninguno';
  selected: string = 'Ninguno';
  filtros: string[] = [];
  disabledSecondary=true;

  @Output() eventos = new EventEmitter<EventInterface[]>();
  listEvents: EventInterface[] = [];
  eventosEstado:EventInterface[] = [];
  eventosCarga:EventInterface[] = [];
  @ViewChild(EventsComponent) actualizar:EventsComponent;
  constructor(private _evento: EventoService, private dialog: MatDialog, private _infoEvents:InfoEventService) {

  }


  ngOnInit() {



  }
  /**
   * @author Roberto Ureta
   * Metodo que recorre la variable filtrado (de tipo JSON) segun la opcion seleccionada 
   * en el primer mat select, para buscar la lista con la que se llenara el segundo
   * mat select.
   * Se carga la lista a la variable filtros y se cambia disabledSecondary a false 
   * para que se pueda seleccionar el siguiente mat select.
   * @param busqueda contiene la opcion seleccionada en el primer mat select.
   */
  cambiarFiltros(busqueda) {
    let dropDownData = this.filtrado.find((data: any) => data.tipoBusqueda === busqueda);
    if (dropDownData) {
      this.filtros = dropDownData.filtros;
      this.disabledSecondary=false;
    } else {
      this.filtros = [];
    }

  }

  /**
   * @author Roberto Ureta
   * Metodo que limpia los mat select usados para filtrar, 
   * ademas deshabilita el segundo mat select y limpia la lista de resultados.
   */
  unselect() {
    this.busquedaSeleccionada = 'Ninguno';
    this.selected= 'Ninguno';
    this.disabledSecondary=true;
    this.listEvents = [];
  }


  /**
   * @author Roberto Ureta
   * Metodo usado para determinar el filtrado a realizar segun el tipo de busqueda seleccionada.
   */
  determinarFiltrado(){
    console.log(this.busquedaSeleccionada);
    console.log(this.selected);
    switch (this.busquedaSeleccionada) {
      case 'Estado':
        this.buscarFiltro();
        break;
      case 'Origen':
        break;
      case 'Destino':
        break;
      case 'Carga':
        this.buscarFiltroSegunCarga();
        break;
      default:
        break;
    }
  }
  /**
   * @author Roberto Ureta
   * Metodo que usa el servicio de Evento para filtrar los resultados de los eventos segun su estado.
   */
  buscarFiltro() {
    let filtro = "";
    if (this.selected != "Ninguno") {
      filtro = this.selected;
      console.log("Entre a buscar filtro " + filtro);
      this.obtenerEventosSegunEstado(filtro).add(() => this.listEvents = this.eventosEstado);
    }
  }

  /**
   * @author Roberto Ureta
   * Filtro de eventos segun la carga que lleva el camion segun el tipo de uva que transporta.
   */
  buscarFiltroSegunCarga() {
    let filtro = "";
    if ( this.selected != "Ninguno") {
      filtro = this.selected;
      this.obtenerEventosSegunCarga(filtro).add(() => this.listEvents = this.eventosCarga);
    }
  }

  /**
   * @author Roberto Ureta
   * Metodo que crea los objetos evento siguiendo los parametros solicitados para el filtrado segun el estado.
   * @param filtro 
   */
  obtenerEventosSegunEstado(filtro: any) {
    this.eventosEstado = [];
    return this._evento.buscarFiltro(filtro, "estado").subscribe((response) => {
      response.forEach(element => {
        this._evento.buscarChofer(element.ref_recorrido).subscribe((responseRec: any) => {
          //console.log("recorrido: ", responseRec[0].ref_chofer);
          let evento = {
            id_evento: element.id_evento,
            patente: responseRec[0].ref_camion,
            origen: "Patacon",
            destino: "Destino",
            hora: element.hora,
            tipo: element.tipo,
            isSelected: 'inactive'
          };
          this.eventosEstado.push(evento);
        });
      });
    });
  }

  /**
   * @author Roberto Ureta
   * Metodo que crea los objetos eventos siguiendo los parametros solicitados para el filtrado segun la carga. 
   * @param filtro 
   */
  obtenerEventosSegunCarga(filtro: any) {
    this.eventosCarga = [];
    return this._evento.buscarFiltro(filtro, "carga").subscribe((response) => {
      response.forEach(element => {
        this._evento.buscarEventoSegunRecorrido(element.id_recorrido).subscribe((responseEvento) => {
          let evento = {
            id_evento: responseEvento[0].id_evento,
            patente: element.ref_camion,
            origen: "Patacon",
            destino: "Destino",
            hora: responseEvento[0].hora,
            tipo: responseEvento[0].tipo,
            isSelected: 'inactive'
          };
          this.eventosCarga.push(evento);
        }).add(() => console.log("evento agregado"));
      });
    });
  }

  cambiarEstadoEvento(estado:string, id:number)
  {


        let evento = {
          "id_evento": +id,
          "tipo": estado
        }
        this._evento.changeTipoEvento(evento).subscribe(res=>{

          this.determinarFiltrado();
        })
       
  }

  changeStateEvent(index:number,type:number){
    console.log("filter",index + ' - '+ type);
    switch(type)
    {
      case 1: this.cambiarEstadoEvento('Llegando', index);  
      break;
      case 2: this.cambiarEstadoEvento('Saliendo', index);
      break;
      case 3: this.cambiarEstadoEvento('Desviado', index);
      break;
      case 4: this.cambiarEstadoEvento('Pendiente', index);
      break;
      case 5: this.cambiarEstadoEvento('Cancelado', index);
      break;
      case 6: this.cambiarEstadoEvento('Terminado', index);
      break;
      case 7: this.cambiarEstadoEvento('En ruta', index);
      break;
    }

  }


  onClick(patente:string){

    
    this._infoEvents.toggle(patente);
  }

}




