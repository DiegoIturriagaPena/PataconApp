import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProductorService } from 'src/app/services/productor.service';
import { GpsService } from 'src/app/services/gps.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { IProductor } from 'src/app/models/Productor/i-productor';
import { Router } from '@angular/router';
import { vina } from 'src/app/models/Vina/i-vina';
import { UvasService } from 'src/app/services/uvas/uvas.service';
import { IUva } from 'src/app/models/Vina/i-uva';
import { LstorageService } from 'src/app/storage/lstorage.service';
import { VinaService } from 'src/app/services/vina.service';

@Component({
  selector: 'app-agregar-vinas',
  templateUrl: './agregar-vinas.component.html',
  styleUrls: ['./agregar-vinas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AgregarVinasComponent implements OnInit {

  primaryform: FormGroup;
  typeGrapeFrom: FormGroup;
  vina: vina;
  uvas: IUva[];
  coordinates: any;
  currentLatitude: any;
  currentlLongitude: any;
  productor: any;

  constructor(
    private fb: FormBuilder,
    // private dialogRef: MatDialogRef<AgregarVinasComponent>,
    public dialog: MatDialog,
    private _Productor: ProductorService,
    private uvaService: UvasService,
    private vinaService: VinaService,
    private gpsService:GpsService,
    private router: Router,
  ) {
    this.currentLatitude = -1;
    this.currentlLongitude = -1;
    this.primaryform = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.typeGrapeFrom = this.fb.group({
      uvas: this.fb.array([])
    });
  }
  

  ngOnInit() {
    // this.vina.uvas = [];
    this.uvas = [];
    this.productor = localStorage.getItem(LstorageService.productor_id);
    this.gpsService.getCurrentPosition().subscribe(
      (pos: Position) => {
        this.currentLatitude = +(pos.coords.latitude);
        this.currentlLongitude =  +(pos.coords.longitude)
         // console.log(pos);
    });
    this.uvaService.getAllUvas().subscribe(data => {
      // console.log(data);
      this.uvas = data;
    },
    error => {
      console.log(error);
    },() => {
      if(this.uvas.length>0){
        this.uvas.forEach(data => {
          data.activo = false;
        })
      }
    }
    );

  }
  



  lat = 43.879078;
  lng = -103.4615581;
  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    /*{ lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }*/
  ];

  /**
   * @author Patricio Quezada
   * @summary Agrega marcadores.
   * @param lat 
   * @param lng 
   */
  addMarker(lat: number, lng: number) {
    this.markers = [];
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  /**
   * 
   * @param event when is mark into map
   */
  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  /**
   * @author Patricio Quezada L.
   * @summary Regresa hacia a la lista de las viñas
   */
  backToList() {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea regresar?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe( data => {
      if (data === true) {
        this.router.navigate(['/pataconsys/listavinas ']).then();
      }
    });
  }

  /**
   * @author Patricio Quezada.
   * @summary Guarda los marcadores.
   */
  save(){
    if(this.markers.length<=0){
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: 'Faltán asignar una viña, para continuar',
          canSaveData: false
        }
      });
      d.afterClosed().subscribe( data => {
      });
    } else if(!this.primaryform.valid){

      const d = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: 'Acción no valida, la viña requiere un nombre',
          canSaveData: false
        }
      });
      d.afterClosed().subscribe( data => {
      });
    }else{
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: '¿Esta seguro que desea guardar los cambios?',
          canSaveData: true
        }
      });
      d.afterClosed().subscribe( data => {
        if (data === true) {
          let new_vina:vina ={
            nombre_vina: this.primaryform.get('nombre').value || '',
            uvas: this.uvas,
            longitud_ubicacion: this.markers[0]['lng'],
            latitud_ubicacion: this.markers[0]['lat'],
            ref_productor: +this.productor
          }
          // console.log(new_vina);
          this.vinaService.nuevaVina(new_vina).subscribe(data => {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La viña ha sido agregada con éxito!',
                canSaveData: false
              }
            });
            d.afterClosed().subscribe( data => {
              this.router.navigateByUrl('/pataconsys/listavinas').then();
            });
          }, error => {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'Problemas con el servidor.<br>Código del error: '+error.error,
                canSaveData: false
              }
            });
            d.afterClosed().subscribe( data => {
            });
          });
  
        }
      });
    }
    }

    /**
     * @author Patricio Quezada
     * @summary Borra todos los marcadores.
     */
    eraseAll(){
      this.markers = [];
    }

    /**
     * @author Patricio Quezada.
     * @summary Cambia el estado del Reactive Form
     * @param tipoUva Tipo de uva.
     * @param activo estado del checkbox
     */
    onChange(tipoUva: IUva, activo: any) {
      const form = <FormArray>this.typeGrapeFrom.controls.uvas;
      const estado: boolean =  activo.checked as boolean;
      if (estado) {
        form.push(new FormControl(tipoUva.tipo_uva));
        tipoUva.activo = true;

      } else {
        let index = form.controls.findIndex(x => x.value == tipoUva)
        form.removeAt(index);
        tipoUva.activo = false;
      }
    }

    /**
     * @author Patricio Quezada.
     * @summary Vuelve a la vista productores.
     */
    backToProductor() {
      // console.log('volver');
      this.router.navigateByUrl('/pataconsys/listavinas').then();
      //this.router.navigate(['/pataconsys/listavinas']).then();
    }

    

}
