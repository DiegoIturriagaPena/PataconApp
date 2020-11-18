import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ProductorService } from 'src/app/services/productor.service';
import { Productor, ProductorInterface } from 'src/app/models/productor'
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { IProductor } from 'src/app/models/Productor/i-productor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-agregar-productores',
  templateUrl: './agregar-productores.component.html',
  styleUrls: ['./agregar-productores.component.scss']
})
export class AgregarProductoresComponent implements OnInit {


  primaryform: FormGroup;
  secondaryform: FormGroup;
  p: IProductor;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarProductoresComponent>,
    public dialog: MatDialog,
    private _Productor: ProductorService) { }

  ngOnInit() {
    this.primaryform = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}(-)([0-9]|(k|K))')]],
      razon_social: [''],
      direccion: [''],
    });

    this.secondaryform = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('(9)[0-9]{8}')]],
      telefono2: ['', Validators.pattern('(9)[0-9]{8}')],
    });




  }

  /*insertarProductor() {
    let data = {
      "nombre": this.nombre_productor,
      "variedad": this.selectedVariedad,
      "cosecha": this.selectedCosecha,
      "calidad": this.selectedCalidad,
      "telefono": +this.num_telefono,
    }


    this._Productor.ingresarProductor(iproductor).subscribe((response) => {
      console.log("res", response);
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headMessage: 'Información',
          bodyMessage: '¡Listo!'
        }
      });
      d.afterClosed().subscribe(() => this.dialogRef.close());
    });

    this.dialogRef.close();
  }*/

  /*actualizarProductor() {
    let data = {
      "nombre": this.nombre_productor,
      "variedad": this.selectedVariedad,
      "cosecha": this.selectedCosecha,
      "calidad": this.selectedCalidad,
      "telefono": +this.num_telefono,
    }
    this._Productor.actualizarProductor(this.id_productor,data).subscribe(res=>{
      console.log("res update productor", res);
    });
  }*/

  /**
   * @author Patricio Quezada
   * @summary Cierra el dialogo
   */
  close() {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea salir?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        this.dialogRef.close();
      }
    });
  }

  /**
   * @author Patricio Quezada
   * @summary Permite crear un productor
   */
  save() {
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea guardar?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
        this.p = {
          nombre: this.secondaryform.get('nombre').value,
          rut: this.primaryform.get('rut').value,
          razon_social: this.primaryform.get('razon_social').value,
          apellidos: this.secondaryform.get('apellidos').value,
          telefono: +this.secondaryform.get('telefono').value,
          telefono2: +this.secondaryform.get('telefono2').value || -1,
          direccion: this.primaryform.get('direccion').value || ''
        };
        console.log(this.p);
        this._Productor.ingresarProductor(this.p).subscribe(data => {
          if (data.data === '200') {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La operación ha sido realizado con éxito',
                canSaveData: false
              }
            });
            /*this._Productor.insertarProductorFirestore(this.p)
            .then(response => 
              console.log(response))
              .catch(err => console.error(err));
            dialog.afterClosed().subscribe(() => {
              this.dialogRef.close(true);
            });*/
          }
        },
          error => {
            console.log(error);
            if (error.status === 400) {
              const dialog = this.dialog.open(PdialogComponent, {
                data: {
                  headerMessage: 'Información',
                  bodyMessage: 'El usuario ya existe.',
                  canSaveData: false
                }
              });
              dialog.afterClosed().subscribe(() => {
              });
            } else {
              const dialog = this.dialog.open(PdialogComponent, {
                data: {
                  headerMessage: 'Información',
                  bodyMessage: 'Problemas con el servidor',
                  canSaveData: false
                }
              });
              dialog.afterClosed().subscribe(() => {
              });
            }
          });

      } else {
        this.dialogRef.close();
      }
    });

  }

  /**
 * @author Nicolás Hervias
 * @summary Toma el rut desde la vista y valida el dígito verificador
 */
  validarRutPrimero() {
    this.p = {
      rut: this.primaryform.get('rut').value,
    }
    let dv = this.validarRut();
    if (!(dv.toLocaleLowerCase() === this.p.rut.slice(-1).toLocaleLowerCase())) {
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headerMessage: 'Información',
          bodyMessage: 'El Rut es incorrecto.'
        }
      });
    }
    else {
      this.stepper.next();
    }
  }

  /**
 * @author Nicolás Hervias
 * @summary Algoritmo "Módulo 11" para calcular dígito verificador de un rut
 */
  validarRut(): string {
    let dv: string;
    // primero usamos los números antes del -
    let rut = this.p.rut.split('').slice(0, -2);

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

}
