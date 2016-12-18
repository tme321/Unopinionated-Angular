import { Component, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { DynamicComponentData } from 'unopinionated-angular-toolbox';
import { NavigationLink, MenuInput } from './menu-items.components';
import { DropdownInputItemChosenEvent } from 'unopinionated-angular-toolbox';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Unopinionated Angular Toolbox';

  constructor() {
    console.log('app constructor');
  }

  ngOnInit() {
    console.log('app ngOnInit');
  }
}



