import { Directive, Input, HostListener, HostBinding, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UATSlidingPanel } from './sliding-panel.component';

/**
 * Control a sliding panels shown or hidden state.
 * Should only be attached to elements that have
 * a click event.
 */
@Directive({
  selector: '[uat-sliding-panel-toggle]',
  host: {
    '[class.open]':'panel.isShowing',
    '[class.closed]':'!panel.isShowing',
    '[class.pinned]':'panel.pinned',
    '(click)':"onClick($event)",
    '(mouseenter)':"onMouseEnter($event)",
    '(mouseleave)':"onMouseLeave($event)",
    '(document:click)':"onOutsideClick($event)",
  },
  exportAs:'uatSlidingPanelToggle'
})
export class UATSlidingPanelToggle {
  @HostBinding('class.uat-sliding-panel-toggle') applyHostClass = true;

  /**
   * The panel that the toggle is attached to.
   * If this value is not set an error will be thrown
   * during init.
   */
  @Input('uat-sliding-panel-toggle') panel: UATSlidingPanel;

  /**
   * Controls whether the panel should open based 
   * on a click event or not.
   */
  @Input() toggleOnClick = false;

  /**
   * Controls whether the panel should open 
   * on mouse over or not.
   */
  @Input() showOnHover = false;

  /**
   * Controls whether the panel should close When
   * clicked outside the toggle or panel or not.
   */
  @Input() closeOnClickOutside = false;


  private onPanelMouseEntered : Observable<MouseEvent>;
  private onPanelMouseLeft : Observable<MouseEvent>;
  private onPanelClicked : Observable<MouseEvent>;

  private panelMouseEnteredSub: Subscription;
  private panelMouseLeftSub: Subscription;
  private panelClickedSub: Subscription;

  private panelWasEntered: boolean;
  private panelWasLeft: boolean;
  private panelWasClicked: boolean;

  // tracks if the mouse is over either the toggle or
  // the panel itself so that the panel does not close
  // when the user is interacting with either.
  private isHovering = false;

  // tracks inside clicks so that the panel is not closed
  // by the onOutsideClick method when the button is clicked
  private toggleWasClicked = false;

  // tracks when the toggle was just clicked so that the mouse
  // entered event is ignored in cases where the toggles template
  // is changed due to the click (swapping out templates for an 
  // expand and hide toggle for instance)
  private clickedNotEntered = false;

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    if(!this.panel){
      throw new ReferenceError('No UATSlidingPanel component supplied to ' + 
                               'the uat-sliding-panel-toggle directive ' + 
                               '([uat-sliding-panel-toggle]="$PanelVariable").');
    }

    this.onPanelMouseEntered = this.panel.mouseEnterPanel.asObservable();
    this.onPanelMouseLeft = this.panel.mouseLeavePanel.asObservable();
    this.onPanelClicked = this.panel.clickPanel.asObservable();

    /*
     * Sync with the panel's events
     */
    this.panelMouseEnteredSub = 
      this.onPanelMouseEntered.subscribe(_=> {
          this.panelWasEntered = true;
          this.panelWasLeft = false;
        });

    this.panelMouseLeftSub = 
      this.onPanelMouseLeft.subscribe(_=> {
          this.panelWasLeft = true;
          this.panelWasEntered = false; 

          if(this.showOnHover) {
            this.hideIfNotOver(100);
          }
        });


    this.panelClickedSub = 
      this.onPanelClicked.subscribe(_=> {
        this.panelWasClicked = true;
      })
  }

  ngOnDestroy() {
    /*
     * Clean up panel event syncing.
     */
    this.panelMouseEnteredSub.unsubscribe();
    this.panelMouseLeftSub.unsubscribe();
    this.panelClickedSub.unsubscribe();
  }


  onClick(e:MouseEvent){
    this.toggleWasClicked = true;
    this.clickedNotEntered = true;

    /*
     * A bit of hairy logic. This will
     * open and close the panel if showOnHover
     * is false.  
     * 
     * If showOnHover is true it follow this logic:
     *   
     * If the menu is opened by hover but not pinned 
     * it will stay open and get pinned and hover 
     * will be ignored until it is unpinned.
     * 
     * If the menu is pinned it will be unpinned and
     * hidden. When the mouse leaves the hover 
     * show/hide functionality will be reenabled.
     */
    if(this.showOnHover) {
      if(this.panel.isShowing && 
         !this.panel.pinned){
        this.panel.pinned = true;
        this.panel.show();
      }
      else{
        if(this.panel.isShowing){
          this.panel.pinned = false;
          this.panel.hide();
        }
        else{
          this.panel.pinned = true;
          this.panel.show();
        }
      }
    }
    else{
      if(this.toggleOnClick){
        this.panel.toggle();
        this.panel.pinned = !this.panel.pinned;
      }
    }
  }

  onOutsideClick(e: MouseEvent) {
    if(this.closeOnClickOutside && 
       !this.panelWasClicked &&
       !this.toggleWasClicked) {
      this.panel.hide();
    }

    if(!this.toggleWasClicked && !this.panelWasClicked) {
      this.panel.pinned = false;
    }

    this.toggleWasClicked = false;
    this.panelWasClicked = false;
  }

  onMouseEnter(e: MouseEvent) {
    this.isHovering = true;

    if(this.showOnHover && !this.clickedNotEntered) {
      this.panel.show();
    }
  }

  onMouseLeave(e: MouseEvent) {
    this.isHovering = false;

    if(this.showOnHover) {
      this.hideIfNotOver(100);
    }
    this.clickedNotEntered = false;
  }

  /**
   * We don't want to hide the panel if the mouse was moved
   * from the toggle to the menu so this function will only
   * be called after a timeout to determine if the 
   * mouse is still on the toggle or the panel, and only 
   * then will it hide the panel.
   */
  private hideIfNotOver(timeoutMs: number)  {
    this.zone.run(()=>
      setTimeout(_=>{
        if(!this.panelWasEntered && 
          !this.isHovering && 
          !this.panel.pinned) {
            this.panel.hide();
        }
      },timeoutMs));
  }

}