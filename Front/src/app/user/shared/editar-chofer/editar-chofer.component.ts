import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ChoferService } from 'src/app/services/chofer.service';
import { ChoferInterface, Chofer } from 'src/app/models/chofer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PdialogComponent } from 'src/app/components/pdialog/pdialog.component';

export interface IChofer {
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: number;
}
@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss']
})

export class EditarChoferComponent implements OnInit {
  chofer: Chofer;
  dataActual: ChoferInterface;
  editChoferGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarChoferComponent>,
    public dialog: MatDialog,
    private choferService: ChoferService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
    ) {
    this.dataActual = data;

    this.editChoferGroup = this.fb.group({
      rut: [
        {value: '', disabled: true},
        [Validators.required,
          Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}(-)([0-9]|(k|K))')]
      ],
      nombre_chofer: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: [''],
      num_telefono: ['', [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
    });

    this.choferService.obtenerChoferPorID(this.dataActual.rut).subscribe(res => {
      console.log("res: ", res);
      let name = res.nombre;
      this.dataActual.nombre = name;
      console.log("nombre: ", name, this.dataActual.nombre);
    },
    error => {},
    () => {
      this.editChoferGroup = this.fb.group({
        rut: [
          {value: this.dataActual.rut, disabled: true},
          [Validators.required,
            Validators.pattern('[0-9]{1,2}[0-9]{3}[0-9]{3}(-)([0-9]|(k|K))')]
        ],
        nombre_chofer: [this.dataActual.nombre, [Validators.required]],
        apellido_paterno: [this.dataActual.apellido_paterno, [Validators.required]],
        apellido_materno: [this.dataActual.apellido_materno],
        num_telefono: [this.dataActual.telefono, [Validators.required, Validators.pattern('(9)[0-9]{8}')]]
      });
    });
    }

  ngOnInit() {
    
  }

  actualizarChofer(){
    this.choferService.obtenerChoferPorID(this.dataActual.rut).subscribe(res => {
      console.log("res: ", res);
      let name = res.nombre;
      this.dataActual.nombre = name;
      console.log("nombre: ", name, this.dataActual.nombre);
    });
    let ichofer: ChoferInterface;
    ichofer = {
      //"disponibilidad": "Disponible",
      "rut": this.editChoferGroup.get('rut').value,
      "nombre": this.editChoferGroup.get('nombre_chofer').value,
      "apellido_paterno": this.editChoferGroup.get('apellido_paterno').value,
      "apellido_materno": this.editChoferGroup.get('apellido_materno').value,
      "telefono": +this.editChoferGroup.get('num_telefono').value,
    }

    console.log("ichofer: ", ichofer)
    this.choferService.actualizarChofer(ichofer.rut, ichofer).subscribe((response)=>{
     
      const d = this.dialog.open(PdialogComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          headerMessage: 'Información',
          bodyMessage: '¡Listo!'
        }
      });
      d.afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
    },
    error => {
      const d = this.dialog.open(PdialogComponent, {
        data: {
          headMessage: 'Error',
          bodyMessage: 'No se pudo modificar.'
        }
      });
      d.afterClosed().subscribe(() => {
        this.dialogRef.close();
      });
    });
  }
}
