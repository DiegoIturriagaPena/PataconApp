import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ProductorService } from '../../../services/productor.service';
import { IRuta } from '../lista-rutas/lista-rutas.component';
import { RutaService } from '../../../services/ruta.service';
//import { MatDialogRef } from '@angular/material';
import { IProductor } from 'src/app/models/Productor/i-productor';

/*
export interface IProductores{
  id_productor: number;
  nombre: string;
  telefono: number;
}
*/

@Component({
  selector: 'app-agregar-ruta',
  templateUrl: './agregar-ruta.component.html',
  styleUrls: ['./agregar-ruta.component.scss']
})

export class AgregarRutaComponent implements OnInit, AfterContentInit {
  public origin: any
  public destination: any = {lat: -35.0779933, lng: -71.2595474}
  public waypoints: any = []
  public renderOptions = {
      draggable: true,
  }

  visible:boolean = false;
  
  lat: number = -35.0779933;
  lng: number = -71.2595474;
  minZoom:number = 8;
  maxZoom:number = 18;
  zoom:number = 12;
  count:number = 0;

  constructor(private _ruta:RutaService) { 
   
  }

 
public change(event: any) {
 
    this.waypoints = event.request.waypoints;
}
  

  ngAfterContentInit(){
    
  }


 

ngOnInit() {
  this._ruta.directions.subscribe((data:any)=>{


    console.log("AGREGAR_RUTA: " + data);
   this.origin = {lat: data[0].latitud_ubicacion, lng: data[0].longitud_ubicacion}
   console.log("ORIGIN: " + this.origin.lat);
    this.visible = true;
});
}



/*getCoordenadas($event)
{



  
    this.origin = $event.coords;
    console.log(this.origin);
    this.visible = true;
    this.count += 1;
  /*else{

    this.destination = $event.coords;
    console.log(this.destination);
    this.visible = true;
    this.count = 0;

  }

}*/

  
}
