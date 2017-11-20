import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-color-widget',
  templateUrl: './dropdown-menu-color-widget.component.html',
  styleUrls: ['./dropdown-menu-color-widget.component.css']
})
export class DropdownMenuColorWidgetComponent implements OnInit {
  @Input() myColor = 'white';
  
  constructor() { }

  ngOnInit() {
  }

   setColor(newColor: string) {
      this.myColor = newColor;
  }

}
