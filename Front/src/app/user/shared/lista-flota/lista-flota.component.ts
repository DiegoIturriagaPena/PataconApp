import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ListaGpsComponent } from '../lista-gps/lista-gps.component';
import { CamionesComponent } from '../lista-camiones/lista-camiones.component';

@Component({
  selector: 'app-lista-flota',
  templateUrl: './lista-flota.component.html',
  styleUrls: ['./lista-flota.component.scss']
})
export class ListaFlotaComponent implements OnInit {

  @ViewChild(ListaGpsComponent) private gpsComponent: ListaGpsComponent;
  @ViewChild(CamionesComponent) private camionesComponent: CamionesComponent;
  constructor() { }

  ngOnInit() {
  }

  onTabChanged(event: MatTabChangeEvent) 
  {
    if(event.index == 0)
    {
        this.camionesComponent.refresh();//Or whatever name the method is called
    }
    else
    {
        this.gpsComponent.refresh(); //Or whatever name the method is called
    }
  }
}
