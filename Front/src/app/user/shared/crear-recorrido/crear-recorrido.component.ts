import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatStepper, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ChoferService } from 'src/app/services/chofer.service';
import { CamionesService } from 'src/app/services/CamionesService/camiones.service';
import { ICamion } from '../agregar-camion/agregar-camion.component';
import { IChofer } from '../lista-choferes/lista-choferes.component';
import { RutaService } from 'src/app/services/ruta.service';
import { RecorridoService } from 'src/app/services/recorrido.service';
import { EventoService } from 'src/app/services/evento.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { ProductorService } from 'src/app/services/productor.service';
import { HttpHeaders } from '@angular/common/http';
import { elementStart } from '@angular/core/src/render3';
import { VinaService } from 'src/app/services/vina.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';

import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const moment = _moment;



export interface ITipo_Carga {
  value: string;
}
export interface IEnvase {
  value: string;
}

export interface IRuta {
  id_ruta?: number;
  ref_vinna?: number;
  longitud_inicio: number;
  latitud_inicio: number;
  longitud_destino: number;
  latitud_destino: number;
  duracion_aprox: string;
}

export interface IRecorrido {
  id_recorrido?: number;
  nombre?: string;
  nombre_chofer: string;
  tipo_carga: string; //desde acá en el ultimo step
  fecha_inicio?: string;
  hora_inicio?: string;
  fecha_termino?: string;
  hora_termino?: string;
  llegada_estimada?: string; //hasta aca
  ref_chofer: string;
  ref_camion: string;
  ref_ruta: number;
}

export interface IListProductor{
  Productor: string;
  Nombre: string
}

export const DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crear-recorrido',
  templateUrl: './crear-recorrido.component.html',
  styleUrls: ['./crear-recorrido.component.scss'],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
  ]
})
export class CrearRecorridoComponent implements OnInit {
  listTipos: ITipo_Carga[] = [
    { value: 'CARIG' },
    { value: 'TTRO' },
    { value: 'CHARD' },
    { value: 'SEMILLON' },
    { value: 'S.BLANC' },
  ]

  listEnvase: IEnvase[] = [
    {value: 'TINA'},
    {value: 'BINS'}
  ];
  /**
   * Forms
   */
  primaryForm: FormGroup;
  secondForm: FormGroup;
  thridForm: FormGroup;


  /**
   * Banderas para los forms
  */
  isChoferPrimaryForm: boolean;
  isCamionPrimaryForm: boolean;
  isProductorSecondForm: boolean;
  isVinaSecondForm: boolean;
  isValidThridForm:boolean;



  /**
   * Filters
   */
  listaRutas: any[] = [];
  listaProductores: IListProductor[] = [];
  busquedaSeleccionada: string = 'Ninguno';
  disabledSecondary = true;
  rutas2: any[] = [];
  isLinear = true;
  tipo_carga: string = ''; //desde acá en el ultimo step
  envase: string = ''
  fecha_inicio?: string = '';
  hora_inicio?: string;
  fecha_termino?: string = '';
  hora_termino?: string;
  llegada_estimada?: string; //hasta aca
  ref_chofer: any = '';
  ref_camion: string = '';
  ref_ruta: any = -1;

  ref_productor: number;
  rutas: IRuta;
  camiones: ICamion[];
  choferes: IChofer;
  cargaTransporte: number = 0;
  data:Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<CrearRecorridoComponent>,
    private choferService: ChoferService,
    private camionService: CamionesService,
    private rutaService: RutaService,
    private recorridoService: RecorridoService,
    private eventoService: EventoService,
    private productorService: ProductorService,
    private vinaService: VinaService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    public datepipe: DatePipe,
  ) {
    // console.log(data);
    if(data !== null){
      // console.log(data);
      this.data = new Date(data.currentdate);
      // this.fecha_inicio = data.date;
    }else{
      this.data = null;
    }
    // this.obtenerCamiones();
    this.ref_chofer = "";
  }

  ngOnInit() {

    // Creacion de formularios
    this.primaryForm = this.fb.group({
      /*carga: ['0', [
        Validators.required,
        Validators.min(0)
      ]],
      camion: [],
      chofer: [],*/
      fecha_inicio: new FormControl('', [Validators.required]),
      fecha_termino:  new FormControl('', [Validators.required]),
      hora_inicio: ['',[Validators.required]],
      hora_termino:['',[Validators.required]]
    });

    if(this.data != null){
      this.primaryForm.get('fecha_inicio').setValue(moment(this.data));

      // console.log(this.primaryForm.value);
    }

    this.secondForm = this.fb.group({
      carga: new FormControl(0,[Validators.required, Validators.min(1)]),
      envase: new FormControl('',[Validators.required]),
      camion: new FormControl('',[Validators.required]),
      chofer: new FormControl('',[Validators.required])
    });

    this.thridForm = this.fb.group({
      productor: new FormControl('',[Validators.required]),
      vina: new FormControl('',[Validators.required])
      /*tipo_carga: [Validators.required],
      fecha_inicio: [Validators.required],
      fecha_termino:  [Validators.required],
      hora_inicio: ['',[Validators.required]],
      hora_termino:['',[Validators.required]]*/
    });

    /*if(this.data !=null){
      this.thridForm.patchValue({
        fecha_inicio: this.data,
        fecha_termino: this.data,
      });
    }*/

    /**
     * Banderas
     */
    // this.obtenerChoferes();
    this.obtenerRutas();
    this.obtenerRutasAsociadasConProductores();
  }

  /**
   * @author Roberto Ureta
   * Metodo que actualiza la lista de camiones segun la carga a transportar solicitada con anterioridad.
   * TODO: MODIFICAR LA LISTA CUANDO SE HA APLICADO UN FILTRO.
   */
  actualizarCamiones() {
    if(this.secondForm.get('carga').valid){
      //console.log("1",this.cargaTransporte);
      //console.log("2",this.secondForm.get('carga').value);
      this.camionService
      .obtenerCamionesSegunCarga(this.secondForm.get('carga').value)
      .subscribe((camiones) => {
        this.camiones = camiones
        // console.log(this.camiones)
      });
    }  
  }

  /**
   * @author Roberto Ureta
   * Metodo que recorre listaRutas la cual contiene un JSON con los productores 
   * y las rutas que tienen asociadas segun la viña que administran.
   * Es utilizado una vez que el productor es seleccionado en el primer mat select para luego 
   * mostrar solo las rutas asociadas al productor seleccionado cambiando disabledSecondary a falso 
   * para que se pueda seleccionar la ruta.
   * @param busqueda contiene la opcion seleccionada en el primer mat select.
   */
  cambiarRutas() {
    let busqueda = this.thridForm.get('productor').value;
    // console.log(busqueda.Productor);
    let dropDownData: any[] = [];
    // console.log(busqueda);
    this.listaRutas.forEach(e => {
      if (e.Productor === busqueda.Productor) {
        dropDownData.push(e)
        this.ref_productor = e.id_productor;
      };
    });
    if (dropDownData) {
      this.rutas2 = [];
      dropDownData.forEach(element => this.rutas2.push(element.Ruta));
      this.disabledSecondary = false;
    } else {
      this.rutas2 = [];
    }

  }
  /**
   * @author Roberto Ureta
   * Metodo que utiliza el servicio para obtener las rutas asociadas al productor
   * y crear un array con los resultados que se necesitan.
   */
  obtenerRutasAsociadasConProductores() {
    this.rutaService.obtenerRutasAsociadasProductor().subscribe(res => {
      res.forEach(element => {
        this.listaRutas.push({
          'id_productor': element.id_productor,
          'Productor': `${element.id_productor} - ${element.nombre}`,
          'Ruta': {
            'id': element.id_ruta,
            'nombre_vina': element.nombre_vina
          }
        });
        this.listaProductores.push({
         Productor: `${element.id_productor} - ${element.nombre}` ,
         Nombre: element.nombre
       });
      });
      this.obtenerProductoresUnicos();
      //console.log(this.listaProductores);
      // console.log(this.listaRutas);
    });
  }
  /**
   * @author Roberto Ureta
   * Metodo que filtra la lista de Productores para eliminar los valores duplicados.
   */
  obtenerProductoresUnicos() {
    const result = [];
    const map = new Map();
    for (const item of this.listaProductores) {
      if (!map.has(item.Productor)) {
        map.set(item.Productor, true);
        result.push({
          Productor: item.Productor,
          Nombre: item.Nombre
        });
      }
    }
    this.listaProductores = result;
  }

  /**
   * @author Roberto Ureta.
   * @author Patricio Quezada.
   * @summary Obtiene los camiones, dependiendo de su fecha.
   */
  obtenerCamiones(fechaInicio, fechaFin) {
    return this.camionService.obtenerCamionesSinAsignar(fechaInicio,fechaFin);
  }

  /**
   * @author Roberto Ureta.
   * @version 2
   * @author Patricio Quezada
   * @summary Obtiene los choferes sin asignar segun la fecha
   */
  obtenerChoferes(fechaInicio, fechaFin) {
   return this.choferService
      .obtenerChoferesSinAsignar(fechaInicio, fechaFin);    
  }

  obtenerRutas() {
    this.rutaService
      .obtenerRutas()
      .subscribe((rutas: IRuta) => {
        this.rutas = rutas;
        // console.log(rutas);
      })
  }

  guardar() {
   
     //console.log(this.thridForm.value);
    let objeto = {
      "tipo_carga": this.tipo_carga,
      "envase": this.envase,
      "fecha_inicio": new Date(this.fecha_inicio).toISOString(),
      "hora_inicio": this.hora_inicio,
      "fecha_termino": new Date(this.fecha_termino).toISOString(),
      "hora_termino": this.hora_termino,
      "ref_camion": this.ref_camion,
      "ref_chofer": this.ref_chofer.rut,
      "ref_ruta": +this.ref_ruta.id,
      "longitud_actual": 0,
      "latitud_actual": 0,
      "llegada_estimada": new Date(),
    };
    // console.log(objeto)

    
    // console.log(this.fecha_inicio);

    this.recorridoService
      .ingresarRecorrido(objeto)
      .subscribe((res) => {
        // console.log(res);
        let eventoAsociado = {
          "fecha": new Date().toISOString(),
          "hora": `${new Date().getHours()}:${new Date().getMinutes()}`,
          "link_mapa": `www.linkmapa${res.id_recorrido}.cl`,
          "descripcion": `Descripcion${res.id_recorrido}`,
          "tipo": 'Pendiente',
          "ref_recorrido": res.id_recorrido
        }

        // console.log("Ref Al productor" + this.ref_productor);  

        // console.log(eventoAsociado);
        this.eventoService.ingresarEvento(eventoAsociado).subscribe(res => {
          // console.log(res);
        });

        this.productorService.obtenerTelefonoProductor(this.ref_productor)
          .subscribe(res => {
            let telefono = "56" + res[0].telefono;
            // console.log(telefono);
            /*const url = 'https://api.connectus.cl/api_v1/send_sms';

            

            let headers_object: HttpHeaders = new HttpHeaders({
            });
            const httpOptions = {
              headers: headers_object
            }*/

            /*this.recorridoService.enviarSms(url, data, httpOptions)
              .subscribe(res => {
                console.log("SMS Envíado")
                console.log(res)
              });*/

              const data = {
                dst_number: +telefono,
                sms_content: `Despacho Pendiente en el Camión ${this.ref_camion} manejado por ${this.ref_chofer.nombre} ${this.ref_chofer.apellido_paterno}`,
  
              }

              /*this.notificationService.enviarSms(data)
              .subscribe(res=>{
                console.log("SMS Enviado");
                console.log(res);
              })*/
          });


        let rut: string;
        this.productorService.obtenerProductorPorID(this.ref_productor)
          .subscribe(res => {
            rut = res.rut;
            // console.log(res)
          })

        this.notificationService.obtenerUsuariosFirebase()
          .subscribe(res => {
            let device: string;
            let uid: string;

            res.documents.forEach(element => {
              if (element.fields.rut["stringValue"] === rut) {
                device = element.fields.keyNot["stringValue"];
                uid = element.fields.uid["stringValue"];
              }
            });

            const data2 = {
              "to": device,
              "notification": {
                "title": "Viaje Planificado",
                "body": `Viaje planificado en el Camión ${this.ref_camion} manejado por ${this.ref_chofer.nombre} ${this.ref_chofer.apellido_paterno}`,
                "sound": "default"
              }
            }
            
            this.notificationService.insertarFirestore(objeto,uid,this.ref_ruta.nombre_vina)
            .then(res => {
              console.log("insertar");
              console.log(res.id);
              let idViaje = res.id;
              this.notificationService.enviarPush(data2)
              .subscribe(res => {
                console.log("notificacion push")
                console.log(res)
                this.notificationService.insertarNotificacionFirestore(data2.notification,uid,idViaje).then(res =>{
                  console.log("Almacenamiento Notificación")
                  console.log(res);
                })
              })

            /*this.recorridoService.insertarFirestore(objeto,uid,this.ref_ruta.nombre_vina)
            .then(res => {
              // console.log(res);
            })*/

          })

      })

    this.dialogRef.close();
  });
}


  close(){
   this.dialogRef.close();
  }

  /**
   * @author Patricio Quezada L.
   * @summary permite validar los datos del stepper
   * @param stepper objeto stepper
   */
  nextToSecondSteep(stepper: MatStepper){
    /*this.isCamionPrimaryForm = true;
    this.isChoferPrimaryForm = true;

    if(this.primaryForm.valid == false){
      // console.log(this.primaryForm.get('camion').value);
      if(this.primaryForm.get('camion').value === null){
        // console.log(2);
        this.isCamionPrimaryForm = false;
      }
      if(this.primaryForm.get('chofer').value === null){
        // console.log(3);
        this.isChoferPrimaryForm = false;
      }
      return;
    }   
    this.isCamionPrimaryForm=true;
    this.isChoferPrimaryForm=true;*/
    // console.log(this.primaryForm);
    if(this.primaryForm.valid === false){
      return;
    }
    
    const fechaI = new Date(this.primaryForm.get('fecha_inicio').value);
    const fechaT = new Date(this.primaryForm.get('fecha_termino').value);
    if(fechaI.getTime()>fechaT.getTime()){
      const dialog = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: 'La fecha de termino es inferior a la fecha de inicio',
          canSaveData: false
        }
      });
      dialog.afterClosed().subscribe(() => {
      });
      return;
    }

    if(fechaI.getTime() === fechaT.getTime()){
      const hourI = + (this.primaryForm.get('hora_inicio').value as string).replace(':','');
      const hourT = + (this.primaryForm.get('hora_termino').value as string).replace(':','');
      if(hourI>=hourT){
        const dialog = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: 'La hora de inicio es inferior a la hora de termino.',
            canSaveData: false
          }
        });
        dialog.afterClosed().subscribe(() => {
        });
        return;
      }
    }
    // let fecha_inicio = this.primaryForm.get('hora_inicio').value;
    let fecha_i = moment(fechaI).format('YYYY-MM-DD') + ' ' + this.primaryForm.get('hora_inicio').value +':00';
    let fecha_f = moment(fechaT).format('YYYY-MM-DD') + ' ' + this.primaryForm.get('hora_termino').value +':00';
    
    // console.log(fecha_i + ' ' + fecha_f);
    this.obtenerCamiones(fecha_i,fecha_f).subscribe((camiones) => {
      this.camiones = camiones;
    },error => {
      console.log(error);
    },
    () => {
      this.obtenerChoferes(fecha_i,fecha_f).subscribe((choferes: IChofer) => {
        this.choferes = choferes;
      }, error => {
        console.log(error);
      },
      () => {
        stepper.next();
      });;
      });
    // stepper.next();
  }

  nextToThridSteep(stepper: MatStepper){
    if(this.secondForm.valid === false){
      return;
    }
    /*this.isProductorSecondForm =true;
    this.isVinaSecondForm = true;
    // console.log(this.secondForm.valid);
    if(this.secondForm.valid === false){
      if(this.secondForm.get('productor').value == null){
        this.isProductorSecondForm = false;
      }

      if(this.secondForm.get('vina').value == null){
        this.isVinaSecondForm = false;
      }
      return;
    }
    this.isProductorSecondForm =true;
    this.isVinaSecondForm = true;*/
    stepper.next();
  }

  nextToFourthSteep(stepper: MatStepper){
    if(this.thridForm.valid === false){
      return;
    }

    const fechaI = new Date(this.primaryForm.get('fecha_inicio').value);
    const fechaT = new Date(this.primaryForm.get('fecha_termino').value);
    let fecha_i = moment(fechaI).format('YYYY-MM-DD') + ' ' + this.primaryForm.get('hora_inicio').value +':00';
    let fecha_f = moment(fechaT).format('YYYY-MM-DD') + ' ' + this.primaryForm.get('hora_termino').value +':00';
    
    this.ref_camion = this.secondForm.get('camion').value;
    this.ref_chofer = this.secondForm.get('chofer').value;
    this.tipo_carga = this.secondForm.get('carga').value;
    this.envase = this.secondForm.get('envase').value;

    this.fecha_inicio = fecha_i;
    this.fecha_termino = fecha_f;
    this.hora_inicio = (this.primaryForm.get('hora_inicio').value as string);
    this.hora_termino = (this.primaryForm.get('hora_termino').value as string);
    this.ref_ruta = this.thridForm.get('vina').value;
    



    // console.log('here');
    /*this.isValidThridForm = true;

    console.log(this.secondForm.value);

    if(this.thridForm.valid === false){
      this.isValidThridForm = false;
      return;
    }
    this.isValidThridForm = true;
    
    const fechaI = new Date(this.thridForm.get('fecha_inicio').value);
    const fechaT = new Date(this.thridForm.get('fecha_termino').value);
    if(fechaI.getTime()>fechaT.getTime()){
      const dialog = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: 'La fecha de termino es inferior a la fecha de inicio',
          canSaveData: false
        }
      });
      dialog.afterClosed().subscribe(() => {
      });
      return;
    }

    if(fechaI.getTime() === fechaT.getTime()){
      const hourI = + (this.thridForm.get('hora_inicio').value as string).replace(':','');
      const hourT = + (this.thridForm.get('hora_termino').value as string).replace(':','');
      if(hourI>=hourT){
        const dialog = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Información',
            bodyMessage: 'La hora de inicio es inferior a la hora de termino.',
            canSaveData: false
          }
        });
        dialog.afterClosed().subscribe(() => {
        });
        return;
      }
    }

    this.ref_camion = this.primaryForm.get('camion').value;
    this.ref_chofer = this.primaryForm.get('chofer').value;
    this.tipo_carga = this.primaryForm.get('carga').value;
    this.fecha_inicio = fechaI.toISOString();
    this.fecha_termino = fechaT.toISOString();
    this.hora_inicio = (this.thridForm.get('hora_inicio').value as string);
    this.hora_termino = (this.thridForm.get('hora_termino').value as string);
    this.ref_ruta = this.secondForm.get('vina').value;

    */
    stepper.next();

  }
}

// 895570249319