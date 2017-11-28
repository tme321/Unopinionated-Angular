import { 
  Component,
  Input,
  ViewChild,
  ContentChildren,
  QueryList,
  ElementRef,
  HostBinding,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
 } from '@angular/core';

import { 
  UATSlidingPanel, 
  UATSlidingPanelToggle } from '../sliding-panel';

import {UATMenuItem} from '../common/menu-item.directive';
import {UATMenuItemRight} from './menu-item-right.directive';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/operators/merge';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

/**
 * A hamburger menu is either a div or nav element
 * that has arbitrary items as it's content with the
 * uat-menu-item or uat-menu-item-right directives.
 * 
 * It takes a standard css media query as an input,
 * expandOnQuery, and when that query returns true 
 * the menu will display the items inside it's borders.
 * 
 * If the query is false the menu will be rendered in 
 * the collapsed state where a toggle will be right 
 * justified and when clicked will show and hide the
 * menu item contents in a panel that drops down.
 * 
 * The toggle itself is set by adding the uat-menu-toggle
 * directive to content inside the menu element that 
 * should act as the toggle.
 * 
 * The hamburger menu component is exported as uatHamburgerMenu
 * and provides the state of the panel with isOpen and the 
 * state of the menu itself as expanded.  These can be used 
 * to modify the menu content itself based on the current
 * state of the menu.
 */
@Component({
  selector: 'div[uat-hamburger-menu], nav[uat-hamburger-menu]',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
  host: {
    '[class.expanded]': "expanded",
    '[class.collapsed]': "!expanded",
  },
  exportAs:'uatHamburgerMenu'
})
export class UATHamburgerMenu implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class.uat-hamburger-menu') applyHostClass = true;

  @ViewChild('panel') panel: UATSlidingPanel;
  @ViewChild('toggle') toggle: UATSlidingPanelToggle;

  @ContentChildren(UATMenuItem, { read:ElementRef }) items: QueryList<ElementRef>;
  @ContentChildren(UATMenuItemRight, {read:ElementRef}) rightItems: QueryList<ElementRef>;

  /**
   * Get the items currently being displayed
   * in the hamburger menu.
   */
  public get itemElementRefs(): ElementRef[] {
    return this.items.toArray().concat(this.rightItems.toArray());
  }

  /**
   * Return if the panel is open or not.
   */
  public get isOpen() {
    return this.panel.isShowing;
  }

  /**
   * A css media query as a string that
   * will determine when the hamburger menu
   * should expand the items onto the menu 
   * bar and remove the dropdown toggle
   */
  @Input() expandOnQuery: string;
         
  /**
   * Show the menu if the toggle is hovered
   * over.  Defaults to false.
   */
  @Input() showOnHover = false;

  /**
   * Close the menu if a click happens outside
   * it.  Defaults to true.
   */
  @Input() closeOnClickOutside = true;

  /**
   * Allow the toggle to work on the
   * click event.
   */
  readonly toggleOnClick = true;

  /**
   * Cache for the closeOnClickOutside
   * input.
   */
  private _cocoInit = false;

  /**
   * Use a flag member for the expanded 
   * state because host bindings can't 
   * use the async pipe so we have to 
   * cache the media query results.
   */
  public expanded = false;;

  /**
   * Track the subscription to the window
   * resize event and media query result
   * stream.
   */
  private expandedSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    /*
     * Save the close on click outside
     * state.  This will be toggled so
     * that the panel doesnt enter the
     * closed state when the menu bar 
     * is in the expanded state.
     * 
     * Otherwise the panel collapses and
     * the items disappear with no toggle
     * to bring them back.
     */
    this._cocoInit = this.closeOnClickOutside;
    
    /*
     * Determine the initial expansion state
     * based on the media query.
     */
    this.expanded = window.matchMedia(this.expandOnQuery).matches;

    if(this.expanded) {  
      this.closeOnClickOutside = false;
    }
  }

  ngAfterViewInit() {
    /*
     * Set up the stream
     */
    this.expandedSubscription = 
      fromEvent(window,"resize")
      .pipe(
        map(_=>window.matchMedia(this.expandOnQuery).matches),
        distinctUntilChanged())
      .subscribe(expanded=>{
          this.expanded = expanded;
          this.togglePanelState();
      });  
  }

  ngOnDestroy() {
    if(this.expandedSubscription && !this.expandedSubscription.closed) {
      this.expandedSubscription.unsubscribe();
    }
  }

  /**
   * Set the state of the panel 
   * to showing or hiding based
   * on the cached expanded member
   */
  private togglePanelState() {
    if(this.expanded) {  
      this.closeOnClickOutside = false;
      this.toggle.showPanel();
    }
    else {
      this.closeOnClickOutside = this._cocoInit;
      this.toggle.hidePanel();
    }
  }
}
