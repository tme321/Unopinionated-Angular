import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsing-menu-color-widget',
  templateUrl: './collapsing-menu-color-widget.component.html',
  styleUrls: ['./collapsing-menu-color-widget.component.css']
})
export class CollapsingMenuColorWidgetComponent implements OnInit {
  @Input() myColor = 'white';

  constructor() { }

  ngOnInit() {
  }

   setColor(newColor: string) {
      this.myColor = newColor;
  }
}
