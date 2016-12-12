import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-viewer',
  templateUrl: './color-viewer.component.html',
  styleUrls: ['./color-viewer.component.css']
})
export class ColorViewerComponent implements OnInit {
  @Input() viewedColor = "white";

  constructor() { }

  ngOnInit() {
  }
}
