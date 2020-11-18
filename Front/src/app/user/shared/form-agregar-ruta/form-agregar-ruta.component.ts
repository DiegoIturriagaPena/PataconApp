import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProductor } from '../../../models/Productor/i-productor';
import { ProductorService } from '../../../services/productor.service';
import { RutaService } from '../../../services/ruta.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PdialogComponent } from '../../../components/pdialog/pdialog.component';

@Component({
  selector: 'app-form-agregar-ruta',
  templateUrl: './form-agregar-ruta.component.html',
  styleUrls: ['./form-agregar-ruta.component.scss']
})
export class FormAgregarRutaComponent implements OnInit {
  
  @Input() origin: any
  @Input() destination: any
  @Input() waypoints: any = []
  selected_productor: number;
  selected_vinia: number;
  long_origen:number;
  lat_origen:number;
  long_destino:number;
  lat_destino:number;
  duracion_estimada:string;
  productores: IProductor[];
  vinias:any[];
  addRouteForm: FormGroup;
  constructor(private _productor:ProductorService, private _ruta:RutaService, private router:Router,
    private fb: FormBuilder, private dialog:MatDialog) {
    this.cargarProductores();
    this.addRouteForm = this.fb.group({
      productor: ['', [Validators.required]],
      vina: ['',[Validators.required]],
      duracion: ['',[Validators.required]]
    });
  }

  ngOnInit() {
  }

  createFormControls():void 
  {
    //console.log("inputs:",this.origin);
    //console.log("inputs:",this.destination);

    let duracion;
    if (this.duracion_estimada!= null && this.selected_vinia != null && this.selected_productor != null){
      duracion = (this.duracion_estimada as string).split(":");
      let ruta =
      {  
        "ref_vinna": +this.selected_vinia,
        "longitud_inicio": +this.origin.lng,
        "longitud_destino": +this.destination.lng,
        "latitud_inicio": +this.origin.lat,
        "latitud_destino": +this.destination.lat,
        "waypoints": JSON.stringify(this.waypoints),
        "duracion_aprox": duracion[0] + " h " +  duracion[1] + " min"
      }
      console.log(ruta);
      this._ruta.ingresarRuta(ruta).subscribe( (res) => {
        console.log(res);
      });
      
      this.router.navigate(['/pataconsys/listarRuta']).then(); 
    }
  }
  
  cargarProductores()
  {
    this._productor.obtenerProductoresDisponibles().subscribe((dataProductor:any)=>{
      this.productores = dataProductor;
    }); 
  }
  
  cargarVinias()
  {
    this._productor.buscarIdVinaSegunProductor(this.selected_productor).subscribe((data:any)=>{
      this.vinias = data;
      console.log(this.vinias);
    })
  }
  
  changeProductor()
  {
    this.cargarVinias();
    console.log("VINIAS:" + this.vinias);
  }

  changeVina(){
    this._ruta.obtenerCoordenadasVina(this.selected_vinia);
  }  
}