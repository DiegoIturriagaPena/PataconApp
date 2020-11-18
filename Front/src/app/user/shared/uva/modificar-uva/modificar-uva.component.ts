import { Component, OnInit, Inject } from '@angular/core';
import { IUva } from 'src/app/models/Vina/i-uva';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';
import { UvasService } from 'src/app/services/uvas/uvas.service';

@Component({
  selector: 'app-modificar-uva',
  templateUrl: './modificar-uva.component.html',
  styleUrls: ['./modificar-uva.component.scss']
})
export class ModificarUvaComponent implements OnInit {
  auxUva: IUva;
  primaryform: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: IUva,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModificarUvaComponent>,
    public dialog: MatDialog,
    private uvaService: UvasService
  ) { 
    this.auxUva = data;
    this.primaryform = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit() {
    
    this.uvaService.getOneUva(this.auxUva).subscribe((data: IUva) => {
      if(data !== null){
        let tipo = data.tipo_uva + '' || '';
        let descripcion = data.descripcion + '' || '';
        this.primaryform.setValue({
          nombre: tipo,
          descripcion: descripcion
        });
      }else{
        this.dialogRef.close();
      }
    }, error => {
      // console.log(error);
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
        bodyMessage: '¿Esta seguro que desea guardar los cambios?',
        canSaveData: true
      }
    });
    d.afterClosed().subscribe(data => {
      if (data === true) {
       let uva:IUva = {
         id_tipo_uva: this.auxUva.id_tipo_uva,
         tipo_uva: this.primaryform.get('nombre').value,
         descripcion: this.primaryform.get('descripcion').value || ''
       };
       this.uvaService.setOnveUva(uva).subscribe( data => {
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
