import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Route, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  
  isCollapsed:boolean;
  isMobile:boolean;
  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router
    ){ }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        // console.log('demo');
        return;
      }
      // console.log('finalizo');
      window.scrollTo(0, 0);
    });

    //this.isMobile = this.deviceService.isMobile();
    this.isCollapsed = true;
    this.initView();
    // this.isCarrouselEnable = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.initView();
  }

  initView(){
    this.isMobile = window.innerWidth > 992 ?false:true;
  }
}
