import { Component, OnInit } from '@angular/core';
import { DropdownInputItemChosenEvent } from '../../lib/dropdown-input/dropdown-input-item-events.interface';
import { NavigationLink } from '../menu-items.components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearchItemChosen(e: DropdownInputItemChosenEvent) {
    (e.component as NavigationLink).navigate();
  }

}
