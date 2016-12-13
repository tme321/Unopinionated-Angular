import {
  Component,
  Input,
  Renderer,
  ViewChild,
  ElementRef,
  ContentChildren,
  HostBinding,
  QueryList } from '@angular/core';
import {UATMenuItem} from '../common/menu-item.directive';
import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';

@Component({
  moduleId: module.id,
  selector: 'div[uat-dropdown-menu]',
  templateUrl: 'dropdown-menu.component.html',
  styleUrls: ['dropdown-menu.component.css'],
  exportAs:'uatDropdownMenu'
})
export class UATDropdownMenu {
  @HostBinding('class.uat-dropdown-menu') private applyHostClass = true;

  @Input() public showOnHover = false;
  @Input() public toggleOnClick = true;
  @Input() public closeOnClickOutside = true;

  @ViewChild('panel') panel: UATSlidingPanel;

  public get isOpen() {
    return this.panel.isShowing;
  }

  private showOnInit = false;

  constructor() { }

  ngOnInit() {
  }

  private ngAfterViewInit() {
  }
}
