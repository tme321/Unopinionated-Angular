import { Component, ContentChildren, QueryList, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { NavigationLink, MenuInput } from './menu-items.components';

@Component({
  moduleId: module.id,
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Unopinionated Angular Toolbox';

  constructor() {
  }

  ngOnInit() {
  }
}



