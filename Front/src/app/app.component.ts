import { Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pataconfront';
  constructor(
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public loadService: LoaderService
    ){
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        // console.log('demo');
        return;
      }
      // console.log('finalizo');
      window.scrollTo(0, 0);
    });
  }
}
