import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { UvasService } from 'src/app/services/uvas/uvas.service';
import { IUva } from 'src/app/models/Vina/i-uva';

@Component({
  selector: 'app-agregar-uva',
  templateUrl: './agregar-uva.component.html',
  styleUrls: ['./agregar-uva.component.scss']
})
export class AgregarUvaComponent implements OnInit {

  primaryform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarUvaComponent>,
    public dialog: MatDialog,
    private uvaService: UvasService
  ) { }

  ngOnInit() {
    this.primaryform = this.fb.group({
      nombre: ['', Validators.required],
      descriptcion: [''],
    });
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
 * @summary Permite crear una uva
 */
save() {
  if(this.primaryform.valid){
    const d = this.dialog.open(PdialogComponent, {
      data: {
        headerMessage: 'Información',
        bodyMessage: '¿Esta seguro que desea guardar?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
       let uva:IUva = {
         tipo_uva: this.primaryform.get('nombre').value,
         descripcion: this.primaryform.get('descriptcion').value || ''
       };
       this.uvaService.createUva(uva).subscribe( data => {
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
                bodyMessage: 'El tipo de uva ya existe',
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

}
