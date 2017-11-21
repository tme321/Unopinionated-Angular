import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { NavigationLink } from '../menu-items/menu-items.components';
import { DropdownInputItemChosenEvent, UATDropdownInputServiceToken } from '../lib/dropdown-input';
import { DemoDropdownInputService } from '../demo-dropdown-service/demo-dropdown-input.service';

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
