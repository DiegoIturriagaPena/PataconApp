import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import listPlugin from '@fullcalendar/list';
import timePlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChoferService } from 'src/app/services/chofer.service';
import { RecorridoService } from 'src/app/services/recorrido.service';
import { FormBuilder } from '@angular/forms';
import { IRecorrido, CrearRecorridoComponent } from '../../crear-recorrido/crear-recorrido.component';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';

export interface IEvent{
  id?: string;
  title: string;
  date: string;
}

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.scss']
})
export class DespachosComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  eventos: IEvent[];
  draggable : Draggable;
  constructor(
    private dialog: MatDialog,
    private choferService: ChoferService,
    private recorridoService: RecorridoService,
    fb: FormBuilder,
    public datepipe: DatePipe
  ) { 
   
  }

  ngOnInit() {
    this.eventos = [];
    this.calendarComponent.locales = [esLocale];
    this.calendarComponent.timeZone = 'local';
    this.calendarComponent.plugins= [
      dayGridPlugin,
      interactionPlugin,
      listPlugin,
      
    ];

    this.calendarComponent.header = {
      left: 'prev,next today myCustomButton ',
      center: 'title',
      right: 'dayGridMonth,listDay'
    };

    this.calendarComponent.droppable = true;
    this.calendarComponent.editable = true;
    //Evento Draggable
    //this.draggable = new Draggable();

    //Servicio
    this.recorridoService
    .getRecorridosForCalendar()
    .subscribe((res: IRecorrido[]) => {
      res.forEach((element, index) => {
        this.eventos.push({
          id: element.id_recorrido +'',
          title: element.nombre,
          date: (element.fecha_inicio).split("T")[0]
        });
      });
      
      // console.log(res);
    }, error => {

    }, () => {
      // console.log(this.eventos);
    });
  }

  /**
   * @author Patricio Quezada L.
   * @summary Click en el evento
   * @param arg evento entrante (Evento)
   */
  eventClick(arg) {
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(OpcionesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });*/
   // console.log(arg);
  }

  /**
   * @author Patricio Quezada L.
   * @summary Click en el dia
   * @param arg evento entrante (Dia)
   */
  dayClick(arg: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      currentdate: new Date(arg.date),
    }
    const dialogRef = this.dialog.open(CrearRecorridoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });

    // console.log(new Date(arg.date));
    //this.abrirDialog(arg.dateStr);
  }

  /**
   * @author Patricio Quezada L
   * @summary Permite realizar un drag
   * @param arg evento a dragg
   */
  eventDrag(arg){
    // console.log(arg);
  }

  /**
   * @author Patricio Quezada.
   * @param arg evento post drag
   * @summary Obtiene el evento despues que se haya realizado.
   */
  eventDragStop(arg){
    
    // console.log(arg);
    // console.log(this.eventos);
  }


  /**
   * @author Patricio Quezada L.
   * @summary Obtiene la FECHA luego de realizar el drag and drop
   * @param arg Resutado del evento Drag
   */
  drop(arg){
    
    console.log((arg.event.start));
  }

  /**
   * @author Patricio Quezada L.
   * @param datenow Fecha actual.
   * @summary Crea un recorrido con una fecha ingresada o no.
   */
  abrirDialog(datenow: any) {
    // console.log(datenow);
    let dates = new Date(datenow);
    dates.setDate(dates.getDate());
    
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      date: new Date(this.datepipe.transform(dates, 'dd/MM/yyyy')).toUTCString()
    } 
    let dialogRef = this.dialog.open(CrearRecorridoComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.ngOnInit();
    });
  }
}
