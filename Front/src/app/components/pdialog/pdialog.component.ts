import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-pdialog',
  templateUrl: './pdialog.component.html',
  styleUrls: ['./pdialog.component.scss'],
})
export class PdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  ngOnInit(): void {

    // Desabilita el evento cerrar
    this.dialogRef.disableClose = true;
    // Sobre escribe el evento cerrar retornando un falso
    this.dialogRef.backdropClick().subscribe(result => {
      this.dialogRef.close(false);
    });
  }
  public accept() {
    this.dialogRef.close(true);
  }
  public close() {
    this.dialogRef.close(false);
  }


}
