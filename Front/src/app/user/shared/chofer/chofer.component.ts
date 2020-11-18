import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChoferService } from '../../../services/chofer.service'
import { CamionInterface } from 'src/app/models/camion';
import { CamionesService } from 'src/app/services/CamionesService/camiones.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Chofer, ChoferInterface } from 'src/app/models/chofer';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.scss'],
})
export class ChoferComponent implements OnInit {

  nombre_chofer: string;
  rut: string;
  apellido_paterno: string;
  apellido_materno: string;
  num_telefono: number;
  ref_camion: string;

  icamion: CamionInterface;
  addChoferGroup: FormGroup;
  chofer: Chofer;
  ichofer: ChoferInterface;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChoferComponent>,
    private _chofer: ChoferService,
    private notification: NotificationService,
    private fb: FormBuilder) {
    this.addChoferGroup = this.fb.group({
      rut: [
        '',
        [Validators.required,
        Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}(-)([0-9]|(k|K))')]
      ],
      nombre_chofer: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: [''],
      num_telefono: ['', [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
    });
  }

  ngOnInit() {

  }

  insertarChofer() {
    this.ichofer = {
      "rut": this.addChoferGroup.get('rut').value,
      "nombre": this.addChoferGroup.get('nombre_chofer').value,
      "apellido_paterno": this.addChoferGroup.get('apellido_paterno').value,
      "apellido_materno": this.addChoferGroup.get('apellido_materno').value,
      "telefono": +this.addChoferGroup.get('num_telefono').value,
      "disponibilidad": "Disponible",
      "estado": true
    }

    this._chofer.obtenerChoferPorID(this.ichofer.rut).subscribe(res => {
      // como lo encontró, no se puede agregar
      if (res) {
        const d = this.dialog.open(PdialogComponent, {
          data: {
            headerMessage: 'Error',
            bodyMessage: 'Ya existe el chofer con ese Rut.'
          }
        });
        d.afterClosed().subscribe(() => { });
      }
    },
      error => {
        // con error 404 (no encontrado) guardamos
        if (error.status === 404) {
          let dv = this.validarRut();
          if (!(dv.toLocaleLowerCase() === this.ichofer.rut.slice(-1).toLocaleLowerCase())) {
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'El Rut es incorrecto.'
              }
            });
            //d.afterClosed().subscribe(() => {});
          }
          else {
            this._chofer.ingresarChofer(this.ichofer).subscribe((response) => {
              //console.log("res", response);
              this.notification.insertarChoferFirestore(this.ichofer, this.ichofer.rut)
                .then(res => {
                  console.log(res)
                })
            });
            const d = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: '¡Listo!'
              }
            });
            d.afterClosed().subscribe(() => {
              this.dialogRef.close();
            });
          }
        }
      });
  }

  validarRut(): string {
    let dv: string;
    // primero usamos los números antes del -
    let rut = this.ichofer.rut.split('').slice(0, -2);

    // invertimos orden de los números
    let revRut = rut.reverse();

    // convertimos los strings en números
    let rutNums: Array<number> = [];
    for (let i = 0; i < rut.length; i++) {
      var l = rutNums.push(Number(revRut[i]));
    }

    // luego multiplicamos cada número de atrás hacia adelante por 2, 3, 4, 5, 6 y 7 y sumamos
    let sum = 0;
    var j = 2;
    for (let i = 0; i < rutNums.length; i++) {
      if (j > 7) { j = 2; } // al llegar a 8 volvemos al 2
      sum += (rutNums[i] * j); // sumamos todo
      j++;
    }

    // calculamos el mod de 11 de la sumatoria y se lo restamos a 11
    let aux;
    aux = sum % 11;
    aux = 11 - aux;
    // si el resultado es 10, el dv es k, si es 11 el dv es 0
    if (aux == 11) { return "0"; }
    else if (aux == 10) { return "K"; }
    // si no es ni 10 ni 11, retorna el valor como dv
    else { return String(aux); }
  }


  actualizarChofer() {
    let data = {
      "rut": this.rut,
      "nombre": this.nombre_chofer,
      "apellido_paterno": this.apellido_paterno,
      "apellido_materno": this.apellido_materno,
      "telefono": +this.num_telefono,
      "disponibilidad": "Disponible",
    }
    this._chofer.actualizarChofer(this.rut, data).subscribe((response) => {
      console.log("res update", response);
    });
  }

  /*
  obtenerCamiones() {
    this.camionesService
      .obtenerCamiones()
      .subscribe((camiones: ICamion) => {
        this.camiones = camiones
        console.log(this.camiones)
      });
  }
  */

}
