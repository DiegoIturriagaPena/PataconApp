import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { RutaService } from '../../../services/ruta.service';

@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.scss']
})
export class EditarRutaComponent implements OnInit {
  public origin: any
  public destination: any
  public waypoints: any = []
  public renderOptions = {
      draggable: false,
  }

  buttonHabilitar:string = "Habilitar edicion";

  visible:boolean = false;
  
  lat: number = -35.0779933;
  lng: number = -71.2595474;
  minZoom:number = 8;
  maxZoom:number = 18;
  zoom:number = 12;
  count:number = 0;
  dataActual: any;
  constructor( 
    @Inject(MAT_DIALOG_DATA) data,
    private _ruta:RutaService,
    public dialogRef: MatDialogRef<EditarRutaComponent>
    ) { 
        this.dataActual = data;
        this.obtenerCoordenadasRuta();
    }

    longitud_inicio:number;
    latitud_inicio:number;
    longitud_destino: number;
    latitud_destino: number;
    duracion_aprox:string;
    ref_vinna:number;

  ngOnInit() {
    
  }

  obtenerCoordenadasRuta()
  {

        
        console.log("DATA_ACTUAL: "+this.dataActual.id_ruta);
        this._ruta.obtenerCoordenadasRutaPorId(this.dataActual.id_ruta).subscribe((data:any)=>{
            this.waypoints = JSON.parse(data[0].waypoints);
            this.origin = {lat: data[0].latitud_inicio , lng: data[0].longitud_inicio}
            this.destination = {lat: data[0].latitud_destino, lng: data[0].longitud_destino}
            this.visible = true;
            
        });
  }

  habilitarEdicion(){



    if (!this.renderOptions.draggable)
    {

      this.buttonHabilitar = "Deshabilitar edicion"
              this.renderOptions = {
                draggable: true,
            }
    }else{


            this.buttonHabilitar = "Habilitar edicion";
           
            this.renderOptions = {
                draggable: false,
            }
    }

  }

  public change(event: any) {
    this.waypoints = event.request.waypoints;
}


saveEdicion()
{

  this._ruta.obtenerRutasPorId(this.dataActual.id_ruta).subscribe((data:any)=>{
    console.log("DATA_ACT:"+ data.longitud_inicio);
     this.longitud_inicio = data.longitud_inicio;
     this.latitud_inicio = data.latitud_inicio;
     this.longitud_destino = data.longitud_destino;
     this.latitud_destino = data.latitud_destino;
     this.duracion_aprox = data.duracion_aprox;
     this.ref_vinna = data.ref_vinna;
    

     let ruta = {
      "longitud_inicio": +this.longitud_inicio,
      "latitud_inicio": +this.latitud_inicio,
      "longitud_destino": +this.longitud_destino,
      "latitud_destino": +this.latitud_destino,
      "waypoints": JSON.stringify(this.waypoints),
      "duracion_aprox": this.duracion_aprox,
      "ref_vinna": +this.ref_vinna
    }
  
    console.log(ruta);
  
    this._ruta.actualizarRutaPorId(this.dataActual.id_ruta, ruta).subscribe((res)=>{
      console.log(res);
    })

    
    this.dialogRef.close();
    

   
    


  })


  
  

}

}
