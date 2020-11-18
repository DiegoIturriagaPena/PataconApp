import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
//import { MatCardModule } from '@angular/material';
import {EventoService} from '../../../services/evento.service'
//import { Evento } from '../../../../../../backend/src/models/evento.model';
import { InfoEventService } from '../../../services/info-event.service';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


export interface EventInterface{
  id_evento:number;
  patente:string;
  origen:string;
  destino:string;
  hora:string;
  tipo:string;
  isSelected:string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger ('showEvents', [
      state('active',style({
        transform: 'translateX(287px) translateY(-15px) scale(0.5)'
        
      })),
      state('inactive',style({
        transform: 'translateX(0px) scale(1)'
      })),
      transition('inactive <=> active', animate('250ms'))
    ]),
    trigger ('destacarCard',[
    state('active', style({
      border: 'solid 5px',
      borderColor: 'lightgray',
      transform: 'scale(0.98)'
    })),
    state('inactive',style({
      boxShadow: 'inset 0 0 0 black'
    })),
    transition('inactive <=> active', animate('150ms'))
    
    ])
  
  ]
  
})


export class EventsComponent implements OnInit {


  @Output() infoWindowOpen = new EventEmitter<string>();
  mostrarEventos: Boolean;
  state:string = "";
  stateCard:string = "";
  private isSelected:boolean = false;
  events:EventInterface[]=[];
  @Output() dataRuta = new EventEmitter<any>();
 

  @Input() listEvents: EventInterface[];
  @Input() numerito:boolean=false;
  @Input() set refresh(bool : boolean) {
    if (bool) {
      this.addEvent();
    }
  }
  
  constructor(private evento:EventoService, private _infoEvent:InfoEventService) {  }
  listEventSaliendo: EventInterface[];
  listEventLlegando: EventInterface[];
  listEventEnRuta : EventInterface[];
  listEventPendiente: EventInterface[];
  listEventDesviado: EventInterface[];
  fecha = new Date();
  
  ngOnInit() {
    this.addEvent();


  console.log(this.fecha.toISOString());



    this.filtrarEventoPorTipoSaliendo("Saliendo",this.fecha.toISOString());
    this.filtrarEventoPorTipoLlegando("Llegando",this.fecha.toISOString());
    this.filtrarEventoPorTipoEnRuta("En ruta",this.fecha.toISOString());
    this.filtrarEventoPorTipoPendiente("Pendiente",this.fecha.toISOString());
    this.filtrarEventoPorTipoDesviado("Desviado",this.fecha.toISOString());
    
  }

  onClickShowEvents (){

    this.state = this.state === 'active' ? 'inactive': 'active';
    this.mostrarEventos = !this.mostrarEventos;
  }

  onClickEvent(event:any ,patente:string , index:number)
  {
  
    console.log(event);

    if (event.tipo == 'Pendiente')
    {
      this.listEventPendiente[index].isSelected = this.listEventPendiente[index].isSelected === 'active' ? 'inactive':'active';
    }else if (event.tipo == 'Saliendo')
    {
      this.listEventSaliendo[index].isSelected = this.listEventSaliendo[index].isSelected === 'active' ? 'inactive':'active';
    }else if (event.tipo == 'En ruta')
    {
      this.listEventEnRuta[index].isSelected = this.listEventEnRuta[index].isSelected === 'active' ? 'inactive':'active';
    }else if(event.tipo == 'Desviado')
    {
            this.listEventDesviado[index].isSelected = this.listEventDesviado[index].isSelected === 'active' ? 'inactive':'active';

    }
 
 

    this._infoEvent.toggle(patente);
    this._infoEvent.obtenerRutDuenoSegunPatente(patente).subscribe((rut:any)=>{
      let ruta = rut[0].ref_ruta;
      this._infoEvent.obtenerDatosRuta(ruta).subscribe((res:any)=>{
        console.log("ruta",res);
        let men = {
          ruta: res,
          evento_id: event.id_evento,
          estado : event.tipo
        }
        this.dataRuta.emit(men);
      });    
});




    //this.listEvents[index].isSelected = !this.isSelected;


    //this.infoWindowOpen.emit(patente);
    //alert("Aqui ira la informacion del registro " + index);
    console.log(patente);
  }

  recibirData(){
    this.addEvent();
  }

  addEvent(){
    console.log('entrandi',this.numerito);
    let aux: EventInterface[] = [];
    this.evento.obtencionEvento().subscribe((eventos:any)=>{
      eventos.forEach(elemento => {
        this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
          let eventoNuevo = {
            id_evento: elemento.id_evento,
            patente: responseRec[0].ref_camion,
            origen: "Patacon",
            destino: "Destino",
            hora: elemento.hora,
            tipo: elemento.tipo,
           isSelected: 'inactive'

          };
          aux.push(eventoNuevo);
        })
      });
      this.listEvents = aux;   
      this.numerito=false; 
    });
  }

 /* actualizarEventos(lista:EventInterface[]){
    this.events=lista;
  }*/

filtrarEventoPorTipoSaliendo(tipo:string, fecha:string)
{
  let aux: EventInterface[] = [];
   this.evento.filtrarEventosPorTipo(tipo, fecha).subscribe((data:any)=>{
    data.forEach(elemento => {
      this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
        let eventoNuevo = {
          id_evento: elemento.id_evento,
          patente: responseRec[0].ref_camion,
          origen: "Patacon",
          destino: "Destino",
          hora: elemento.hora,
          tipo: elemento.tipo,
         isSelected: 'inactive'

        };
        aux.push(eventoNuevo);
      })
    });
    this.listEventSaliendo = aux;  
     console.log(data);
   });
}

filtrarEventoPorTipoLlegando(tipo:string, fecha:string)
{
  let aux: EventInterface[] = [];
   this.evento.filtrarEventosPorTipo(tipo,fecha).subscribe((data:any)=>{
    data.forEach(elemento => {
      this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
        let eventoNuevo = {
          id_evento: elemento.id_evento,
          patente: responseRec[0].ref_camion,
          origen: "Patacon",
          destino: "Destino",
          hora: elemento.hora,
          tipo: elemento.tipo,
         isSelected: 'inactive'

        };
        aux.push(eventoNuevo);
      })
    });
    this.listEventLlegando = aux;  
     console.log(data);
   });
}

filtrarEventoPorTipoEnRuta(tipo:string , fecha:string)
{
  let aux: EventInterface[] = [];
   this.evento.filtrarEventosPorTipo(tipo,fecha).subscribe((data:any)=>{
    data.forEach(elemento => {
      this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
        let eventoNuevo = {
          id_evento: elemento.id_evento,
          patente: responseRec[0].ref_camion,
          origen: "Patacon",
          destino: "Destino",
          hora: elemento.hora,
          tipo: elemento.tipo,
         isSelected: 'inactive'

        };
        aux.push(eventoNuevo);
      })
    });
    this.listEventEnRuta = aux;  
     console.log(this.listEventEnRuta);
   });
}
  

filtrarEventoPorTipoPendiente(tipo:string, fecha:string)
{
  let aux: EventInterface[] = [];
   this.evento.filtrarEventosPorTipo(tipo,fecha).subscribe((data:any)=>{
    data.forEach(elemento => {
      this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
        let eventoNuevo = {
          id_evento: elemento.id_evento,
          patente: responseRec[0].ref_camion,
          origen: "Patacon",
          destino: "Destino",
          hora: elemento.hora,
          tipo: elemento.tipo,
         isSelected: 'inactive'

        };
        aux.push(eventoNuevo);
      })
    });
    this.listEventPendiente = aux;  
     console.log(this.listEventPendiente);
   });
}

filtrarEventoPorTipoDesviado(tipo:string, fecha:string)
{
  let aux: EventInterface[] = [];
   this.evento.filtrarEventosPorTipo(tipo,fecha).subscribe((data:any)=>{
    data.forEach(elemento => {
      this.evento.buscarChofer(elemento.ref_recorrido).subscribe((responseRec:any)=>{
        let eventoNuevo = {
          id_evento: elemento.id_evento,
          patente: responseRec[0].ref_camion,
          origen: "Patacon",
          destino: "Destino",
          hora: elemento.hora,
          tipo: elemento.tipo,
         isSelected: 'inactive'

        };
        aux.push(eventoNuevo);
      })
    });
    this.listEventDesviado = aux;  
     console.log(this.listEventDesviado);
   });
}


  actualizarListaEventos(){
    this.addEvent();
  }


  cambiarEstadoEvento(estado:string, id:number)
  {


        let evento = {
          "id_evento": +id,
          "tipo": estado
        }
        this.evento.changeTipoEvento(evento).subscribe(res=>{

          console.log("CAMBIAR ESTADO EVENTO: " + res);

          this.filtrarEventoPorTipoLlegando("Llegando",this.fecha.toISOString());
          this.filtrarEventoPorTipoSaliendo("Saliendo",this.fecha.toISOString());
          this.filtrarEventoPorTipoEnRuta("En ruta",this.fecha.toISOString());
          this.filtrarEventoPorTipoPendiente("Pendiente",this.fecha.toISOString());
          this.filtrarEventoPorTipoDesviado("Desviado",this.fecha.toISOString());
        })
       
  }


  changeStateEvent(index:number,type:number){

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
 
}
