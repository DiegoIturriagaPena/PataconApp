import { Component, OnInit, Output, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { EventInterface, EventsComponent } from '../events/events.component';
import { InfoEventService } from '../../../services/info-event.service';
import {GpsService} from '../../../services/gps.service';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  isOpen:boolean = false;
  public nombre:string;
  public telefono:string;
  public patente:string;
  title: string = 'My first AGM project';
  lat: number = -35.0779933;
  lng: number = -71.2595474;
  zoom:number = 12;
  iconUrl:string = "../../../../assets/camion1.png";
  markerClickable:boolean = false;
  minZoom:number = 8;
  maxZoom:number = 18;
  dataEventos: EventInterface[]=[];
  origin: any = { lat: 0, lng: 0 }
  destination: any = { lat:0, lng: 0 }
  waypoints:any=[]
  selectedMarker:any = { lat:0, lng: 0 }
  markers = [];
  idInterval: any = 0;
  rutaObtenidaDesdeEvento:any ="";
  @ViewChild(EventsComponent) actualizar:EventsComponent;
  constructor( private _infoEvent:InfoEventService,private _gpsService:GpsService) { }

  ngOnInit() {
   /*this.getPosition().then(data => {
     this.lat = data.lat;
     this.lng = data.lng;
     this.marcador = false;
   });*/
   this.idInterval=window.setInterval(this.cambioEstados, 5000);

   this._infoEvent.change.subscribe((data:any)=>{
     console.log(data);
    this.nombre = data.nombre;
    this.patente = data.patente;
    this.telefono = data.telefono;
    this.zoom = data.zoom;
    //this.origin = { lat: +data.longitud_inicio, lng: +data.latitud_inicio }
    this.origin = { lat: +data.latitud_inicio, lng: +data.longitud_inicio }
    //this.destination = { lat: +data.longitud_destino, lng: +data.latitud_destino }
    this.destination = { lat: +data.latitud_destino, lng: +data.longitud_destino }
    this.waypoints = data.waypoints
    this.isOpen = data.isOpen;
   // this.lng = +data.latitud_incio;
   // this.lat = +data.longitud_inicio;
    console.log(data);
  });

  }

  cambioEstados(){
    this.getPosition().subscribe(data =>{
      console.log(data);
      if (data!=null) {
        this.lat = data.lat;
        this.lng = data.lng;
        this.revisarEstado(this.lat,this.lng);
      }
   })
  }

  ngOnDestroy() {
    clearInterval(this.idInterval);
  }


  /**
   * Metodo momentaneo utilizado para probar la actualizacion de estado de un evento segun donde se encuentre el gps.
   * Dibuja un marcador en el mapa.
   * @param lat latitud marcada
   * @param lng longitud marcada
   */
  addMarker(lat: number, lng: number) {
    this.markers = [];
    let obj = { lat, lng, alpha: 0.4 };
    console.log(obj);
    /**
     * Cuando esta marcada una ruta se crea el objeto JSON para ser usado por el servicio que actualizara el estado de un evento.
     */
    this.revisarEstado2(lat,lng);
    this.markers.push(obj);
  }
  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  /**
   * @author Roberto Ureta
   * Actualiza el estado del evento asociado al gps.
   * @param lat latitud del GPS
   * @param lng longitud del GPS
   */
  revisarEstado(lat:number,lng:number){
    let obj = { lat, lng, alpha: 0.4 };
    console.log(obj);
    /**
     * Cuando esta marcada una ruta se crea el objeto JSON para ser usado por el servicio que actualizara el estado de un evento.
     */
    if (this.rutaObtenidaDesdeEvento!=="") {
      this._infoEvent.obtenerEstadoEvento(this.rutaObtenidaDesdeEvento.evento_id).subscribe((res:any)=>{
        console.log('res',res);
        let data ={
          ruta: {
            latitud_inicio:this.rutaObtenidaDesdeEvento.ruta.latitud_inicio,
            longitud_inicio:this.rutaObtenidaDesdeEvento.ruta.longitud_inicio,
            latitud_destino:this.rutaObtenidaDesdeEvento.ruta.latitud_destino,
            longitud_destino:this.rutaObtenidaDesdeEvento.ruta.longitud_destino,
          },
          waypoints: JSON.parse(this.rutaObtenidaDesdeEvento.ruta.waypoints),
          lat: obj.lat,
          lng: obj.lng,
          estado: res[0].tipo,
          evento: this.rutaObtenidaDesdeEvento.evento_id,
        }
        console.log(data);
      this._gpsService.revisarEstadoGPS(JSON.stringify(data)).subscribe((res)=>{
        console.log(res);
        this.actualizar.ngOnInit();
      });  
      })
    }
  }

  /**
   * @author Roberto Ureta
   * Actualiza el estado del evento asociado al gps.
   * @param lat latitud del GPS
   * @param lng longitud del GPS
   */
  revisarEstado2(lat:number,lng:number){
    let obj = { lat, lng, alpha: 0.4 };
    console.log(obj);
    /**
     * Cuando esta marcada una ruta se crea el objeto JSON para ser usado por el servicio que actualizara el estado de un evento.
     */
    if (this.rutaObtenidaDesdeEvento!=="") {
      let pa = String.fromCharCode(92);
      let rem = "";
      this.rutaObtenidaDesdeEvento = this.rutaObtenidaDesdeEvento.replace(pa,rem);
      console.log(this.rutaObtenidaDesdeEvento);
      this._infoEvent.obtenerEstadoEvento(this.rutaObtenidaDesdeEvento.evento_id).subscribe((res:any)=>{
        console.log('res',res);
        let data ={
          ruta: {
            latitud_inicio:this.rutaObtenidaDesdeEvento.ruta.latitud_inicio,
            longitud_inicio:this.rutaObtenidaDesdeEvento.ruta.longitud_inicio,
            latitud_destino:this.rutaObtenidaDesdeEvento.ruta.latitud_destino,
            longitud_destino:this.rutaObtenidaDesdeEvento.ruta.longitud_destino,
          },
          waypoints: JSON.parse(this.rutaObtenidaDesdeEvento.ruta.waypoints),
          lat: obj.lat,
          lng: obj.lng,
          estado: res[0].tipo,
          evento: this.rutaObtenidaDesdeEvento.evento_id,
        }
        console.log(data);
      this._gpsService.revisarEstadoGPS(JSON.stringify(data)).subscribe((res)=>{
        console.log(res);
        this.actualizar.addEvent();
        this.actualizar.numerito=true;
      });  
      })
    }
  }

  /**
   * @author Roberto Ureta
   * Metodo que se utiliza cuando sucede un cambio en el componente hijo app-event.
   * @param ruta onjeto en formato JSON que contiene la ruta asociada a un evento.
   */
  obtenerRuta(ruta){
    console.log(ruta);
    this.rutaObtenidaDesdeEvento=ruta;
  }
 
  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
  }
  /**
   * TODO: Cambiar Por localizacion de Patacon y llevarlo a servicio
   * @returns localizacion 
   */
  getPosition(): any {
    return new Promise((resolve, reject) => {
      this._gpsService.obtenerCoordenadasGPS().subscribe((res: any) => {
        if (res['124'].longitude!==undefined && res['124'].latitude!== undefined) {
          resolve({lng: res['124'].longitude, lat: res['124'].latitude}); 
        }
      });
    });
  }

  recibirData($event){
    this.dataEventos = $event;
  }


  showInfoWindow(patente){
    console.log(patente);
  }

  closeWindow()
  {
    this.isOpen = !this.isOpen;
  }


 

}
