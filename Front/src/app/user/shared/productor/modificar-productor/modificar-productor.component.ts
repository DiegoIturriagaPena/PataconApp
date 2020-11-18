import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ProductorService } from 'src/app/services/productor.service';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { IProductor } from 'src/app/models/Productor/i-productor';

@Component({
  selector: 'app-modificar-productor',
  templateUrl: './modificar-productor.component.html',
  styleUrls: ['./modificar-productor.component.scss']
})
export class ModificarProductorComponent implements OnInit {
  
  primaryform: FormGroup;
  secondaryform: FormGroup;

  auxProductor: IProductor;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModificarProductorComponent>,
    public dialog: MatDialog,
    private productorService: ProductorService,
    @Inject(MAT_DIALOG_DATA) data: IProductor
  ) { 
    this.auxProductor = data;
    // console.log(data);
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
    
    this.productorService.obtenerProductorPorID(this.auxProductor.id_productor).subscribe((data:IProductor) => {
      console.log(data);
      this.primaryform.get('rut').setValue(data.rut);
      this.primaryform.get('razon_social').setValue(data.razon_social || '');
      this.primaryform.get('direccion').setValue(data.direccion || '');
      this.secondaryform.get('nombre').setValue(data.nombre || '');
      this.secondaryform.get('apellidos').setValue(data.apellidos || '');
      this.secondaryform.get('telefono').setValue(data.telefono == -1 || data.telefono == null? '' :data.telefono+'');
      this.secondaryform.get('telefono2').setValue(data.telefono2 == -1 || data.telefono2 == null? '' : data.telefono2+'');
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    

  }


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
    d.afterClosed().subscribe(data =>{
      if(data === true) {
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
        let p: IProductor = {
          id_productor: this.auxProductor.id_productor,
          nombre: this.secondaryform.get('nombre').value ,
          rut: this.primaryform.get('rut').value,
          razon_social: this.primaryform.get('razon_social').value,
          apellidos: this.secondaryform.get('apellidos').value ,
          telefono: +this.secondaryform.get('telefono').value ,
          telefono2: +this.secondaryform.get('telefono2').value || -1,
          direccion: this.primaryform.get('direccion').value || ''
        };

        this.productorService.setProductor(p).subscribe( data => {
          if (data.data === '200') {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'La operación ha sido realizado con éxito',
                canSaveData: false
              }
            });
            dialog.afterClosed().subscribe(() => {
              this.dialogRef.close(true);
            });
          }
        },
        error => {
           console.log(error);
           if (error.status === 400) {
            const dialog = this.dialog.open(PdialogComponent, {
              data: {
                headerMessage: 'Información',
                bodyMessage: 'No se puede modificar este rut.<br>Un usuario ya lo tiene asignado.',
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
        }
        );

      } else {
        this.dialogRef.close();
      }
    });

  }


}
