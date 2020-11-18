import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-mycarousel',
  templateUrl: './mycarousel.component.html',
  styleUrls: ['./mycarousel.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 6000, noPause: true, showIndicators: true } }
  ]
})
export class MycarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
