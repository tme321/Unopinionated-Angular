import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DragAndDropComponent implements OnInit {
  inc = new Subject<number>();
  blah = 0;

  constructor() { }

  ngOnInit() {
  }

  onInc() {
    console.log('inc');
    this.blah++;
    this.inc.next();
  }
  

}
