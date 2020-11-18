import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LstorageService } from 'src/app/storage/lstorage.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { IProductor } from 'src/app/models/Productor/i-productor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductorService } from 'src/app/services/productor.service';
import { Router } from '@angular/router';
import { AgregarProductoresComponent } from '../../agregar-productores/agregar-productores.component';
import { AgregarVinasComponent } from '../agregar-vinas/agregar-vinas.component';
import { VinaService } from 'src/app/services/vina.service';
import { vina } from 'src/app/models/Vina/i-vina';

@Component({
  selector: 'app-listar-vinas',
  templateUrl: './listar-vinas.component.html',
  styleUrls: ['./listar-vinas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListarVinasComponent implements OnInit {
  productor: any;
  productorName:string = '';
  displayedColumns: string[] = ['numero', 'nombre', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<vina>;

  // FloatLabel
  placeholder: FormGroup;
  inputFocus: boolean;
  // productor
  p: IProductor
  constructor(
    private dialog: MatDialog,
    fb: FormBuilder,
    private vinaService: VinaService,
    private productorService: ProductorService,
    private router: Router,
  ) { 
    // Placeholder
    this.placeholder = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
    // get productor del local storage
    this.productor = localStorage.getItem(LstorageService.productor_id);
    // TODO: añadir remove
    this.p = {
      nombre:''
    }
    this.productorService.obtenerProductorPorID(this.productor).subscribe(data => {
      this.p = data;
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.dataSource =  new MatTableDataSource();
    this.dataSource.data = [];
    this.inputFocus = false;
    //console.log(this.p)
    this.vinaService.obtenerVinaPorProductor(+this.productor).subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      console.log(error);
    }, () => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * @author Patricio Quezada L.
   * @summary metodo que redirecciona a la ventana de addviña
   */
  addVinna(){
     localStorage.setItem(LstorageService.productor_id,this.productor);
     this.router.navigate(['/pataconsys/agregarvina']).then();
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AgregarVinasComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });*/
  }

  /**
   * @author Patricio Quezada
   * @summary Modifica una viña
   * @param element Viña a modificar
   */
  setVinna(element:vina){
    localStorage.setItem(LstorageService.productor_id,this.productor);
    localStorage.setItem(LstorageService.vina_id,''+element.id_vina);
    this.router.navigate(['/pataconsys/modificarvina']).then();
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
