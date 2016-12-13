import { Component, ContentChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { DynamicComponentData } from '../lib';
import { NavigationLink, MenuInput } from './menu-items.components';
import { DropdownInputItemChosenEvent } from '../lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Unopinionated Angular Toolbox';
}



