import { Component, Input, HostBinding, ViewChild } from '@angular/core';
import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';

@Component({
  selector: 'div[uat-slideout-menu]',
  templateUrl: './slideout-menu.component.html',
  styleUrls: ['./slideout-menu.component.css'],
  host: {
    '[class.slide-left]':"slideLeft",
    '[class.slide-right]':"!slideLeft"
  }
})
export class UATSlideoutMenu {
  @HostBinding('class.uat-slideout-menu') private applyHostClass = true;

  @Input() public showOnMouseOver = true;
  @Input() public pinOnClick = true;
  @Input() public closeOnClickOutside = true;
  @Input() slideDirection: "left" | "right" = "right";

  @ViewChild('panel') panel: UATSlidingPanel;

  public get isOpen() {
    return this.panel.isShowing;
  }

  private applyMenuClass = true;

  private get slideLeft() {
    return this.slideDirection === "left";
  }

  private showOnInit = false;

  constructor() { }
}
