import { 
  Component,
  Input,
  ViewChild,
  ContentChildren,
  QueryList,
  ElementRef,
  HostBinding,
 } from '@angular/core';

import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';

import {UATMenuItem} from '../common/menu-item.directive';
import {UATMenuItemRight} from './menu-item-right.directive';

@Component({
  selector: 'div[uat-hamburger-menu]',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
  host: {
    '[class.expanded]': "expanded",
    '[class.collapsed]': "!expanded",
    '(window:resize)': "onWindowResize()",
  },
  exportAs:'uatHamburgerMenu'
})
export class UATHamburgerMenu {
  @HostBinding('class.uat-hamburger-menu') applyHostClass = true;

  @ViewChild('panel') panel: UATSlidingPanel;

  @ContentChildren(UATMenuItem, { read:ElementRef }) items: QueryList<ElementRef>;
  @ContentChildren(UATMenuItemRight, {read:ElementRef}) rightItems: QueryList<ElementRef>;

  public get itemElementRefs(): ElementRef[] {
    return this.items.toArray().concat(this.rightItems.toArray());
  }

  public get isOpen() {
    return this.panel.isShowing;
  }

  @Input() expandOnQuery: string;
         
  @Input() showOnHover = false;

  @Input() closeOnClickOutside = true;

  toggleOnClick = true;

  private _cocoInit = false;

  public get expanded() {
    return window.matchMedia(this.expandOnQuery).matches;
  }

  private previousExpansion: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this._cocoInit = this.closeOnClickOutside;

    if(this.expanded) {
      this.closeOnClickOutside = false;
    }
  }

  /* Event handlers */

  /**
   * Evaluate the media query on window resizing.
   */
  onWindowResize() {
    if(this.previousExpansion != this.expanded) {
      if(this.expanded) {
        this.closeOnClickOutside = false;
        this.panel.show();
      }
      else {
        this.closeOnClickOutside = this._cocoInit;
        this.panel.hide();
      }
    }
    this.previousExpansion = this.expanded;
  }

}
