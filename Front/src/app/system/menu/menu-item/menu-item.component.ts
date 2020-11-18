import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Router } from '@angular/router';
import { MenuItem } from '../theme/menu-item';
import { MenuItemService } from '../theme/menu-item.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: MenuItem;
  @Input() depth: number;
  constructor(
    public menuItemService: MenuItemService,
    public router: Router
    ) {
    if (this.depth === undefined) {
    this.depth = 0;
    }
}

  ngOnInit() {
    this.menuItemService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: MenuItem) {
    console.log("Item seleccionado ", item )
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.menuItemService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
