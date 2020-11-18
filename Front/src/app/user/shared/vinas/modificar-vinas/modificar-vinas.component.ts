import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProductorService } from 'src/app/services/productor.service';
import { UvasService } from 'src/app/services/uvas/uvas.service';
import { VinaService } from 'src/app/services/vina.service';
import { GpsService } from 'src/app/services/gps.service';
import { Router } from '@angular/router';
import { vina } from 'src/app/models/Vina/i-vina';
import { IUva } from 'src/app/models/Vina/i-uva';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { LstorageService } from 'src/app/storage/lstorage.service';

@Component({
  selector: 'app-modificar-vinas',
  templateUrl: './modificar-vinas.component.html',
  styleUrls: ['./modificar-vinas.component.scss']
})
export class ModificarVinasComponent implements OnInit, OnDestroy {

  primaryform: FormGroup;
  typeGrapeFrom: FormGroup;
  vina: vina;
  uvas: IUva[];
  coordinates: any;
  currentLatitude: any;
  currentlLongitude: any;

  productor: any;
  vina_id: any;

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
    this.productor = localStorage.getItem(LstorageService.productor_id) || -1;
    this.vina_id = localStorage.getItem(LstorageService.vina_id) || -1;
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
    this.uvas = [];
    if(this.productor === -1 || this.vina_id === -1 ){
      this.router.navigateByUrl('/pataconsys/listavinas').then();
    }else{
      this.vinaService.obtenerVina(this.vina_id).subscribe((data:vina) => {
       console.log(data);
        this.primaryform.setValue({
          nombre: data.nombre_vina
        });
        this.selectedMarker = {
          lat: data.latitud_ubicacion,
          lng: data.longitud_ubicacion
        };
        this.currentLatitude = data.latitud_ubicacion;
        this.currentlLongitude = data.longitud_ubicacion;
        this.markers = [];
        this.addMarker(data.latitud_ubicacion,data.longitud_ubicacion);
        this.uvas = data.uvas;
      },error => {

      },() => {
      });
    }
  }


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
            ref_productor: +this.productor,
            id_vina: +this.vina_id
          }
         
          this.vinaService.setModificar(new_vina).subscribe(data => {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La viña ha sido modificada con éxito!',
                canSaveData: false
              }
            });
            d.afterClosed().subscribe( data => {
              this.router.navigateByUrl('/pataconsys/listavinas').then();
            });
          }, error => {
            console.log(error);
          }); 
          // console.log(this.markers);
          // this.router.navigate(['/pataconsys/listarvina']).then();
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
      console.log('volver');
      this.router.navigateByUrl('/pataconsys/listavinas').then();
      //this.router.navigate(['/pataconsys/listavinas']).then();
    }

    ngOnDestroy(): void {
     localStorage.removeItem(LstorageService.vina_id);
    }  

 

}
