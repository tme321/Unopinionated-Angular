import { Component, OnInit } from '@angular/core';
import { DropdownInputItemChosenEvent } from 'unopinionated-angular-toolbox';
import { NavigationLink } from '../app/menu-items.components';

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

  onItemSelected(item: any){ console.log(item); }
  onItemUnselected(item: any){ console.log(item); }


}
