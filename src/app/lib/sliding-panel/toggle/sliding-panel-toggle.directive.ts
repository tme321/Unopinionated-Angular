import { 
  Directive, 
  Input, 
  HostListener, 
  HostBinding, 
  NgZone, 
  ElementRef } from '@angular/core';
import { UATSlidingPanel } from '../sliding-panel.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { merge } from 'rxjs/operators/merge';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { of } from 'rxjs/observable/of';

/**
 * Control a sliding panels shown or hidden state.
 * 
 * Should only be attached to elements that have
 * a click event.
 */
@Directive({
  selector: '[uat-sliding-panel-toggle]',
  host: {
    '[class.open]':'panel.isShowing',
    '[class.closed]':'!panel.isShowing',
    '[class.pinned]':'panel.pinned',
    '[class.uat-sliding-panel-toggle]':"'true'"
  },
  exportAs:'uatSlidingPanelToggle'
})
export class UATSlidingPanelToggle {

  /**
   * The panel that the toggle is attached to.
   * 
   * If this value is not set an error will be 
   * thrown during init.
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

  /**
   * Keep track of the previous pin state.
   * This is needed to determine if the 
   * new pin state should actually cause a
   * transition or not.
   */
  private previousPinnedState: boolean = false;
  
  /**
   * Save he subscription so the stream
   * can be properly closed.
   */
  private showHideSubscription: Subscription;
  
  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    if(!this.panel){
      throw new Error('No UATSlidingPanel component supplied to ' + 
                      'the uat-sliding-panel-toggle directive ' + 
                      '([uat-sliding-panel-toggle]="$PanelVariable").');
    }

    if(this.showHideSubscription && !this.showHideSubscription.closed) {
      this.showHideSubscription.unsubscribe();
    }

    /*
     * Streams of the events necessary 
     * for the logic of the toggle.
     */

    let documentClick$: Observable<MouseEvent> = fromEvent(document, 'click');
    
    let toggleClick$: Observable<MouseEvent> = fromEvent(this.element.nativeElement, 'click');
    let toggleMouseEnter$: Observable<MouseEvent> = fromEvent(this.element.nativeElement, 'mouseenter');
    let toggleMouseLeave$: Observable<MouseEvent> = fromEvent(this.element.nativeElement, 'mouseleave');

    let panelMouseEntered$ = this.panel.mouseEnterPanel.asObservable();
    let panelMouseLeft$ = this.panel.mouseLeavePanel.asObservable();
    let panelClick$ = this.panel.clickPanel.asObservable();

    /*
     * Reduce both leaving events to 
     * a false emission.
     */
    let leaveBoth$ = toggleMouseLeave$
      .pipe(
        merge(panelMouseLeft$),
        filter(_=>this.showOnHover), 
        map(_=>false));

    /*
     * Reduce both enter events to 
     * a true emission.
     */
    let enterEither$ = toggleMouseEnter$
      .pipe(
        merge(panelMouseEntered$),
        filter(_=>this.showOnHover),
        map(_=>true));

    /*
     * When the toggle is clicked 
     * stop the event from bubbling
     * and toggle the pinned state.
     */
    let toggleClicked$ = toggleClick$
      .pipe(
        map(_=> {
          /*
           * should probably be done with
           * a do operator, once it works again,
           * for both toggle clicked and panel
           * clicked
           */
          event.stopPropagation();
          return !this.previousPinnedState }));

    /*
     * When the panel is clicked
     * stop the event from bubbling
     * and just continue to emit the
     * previous pinned state.
     */
    let panelClicked$ = panelClick$
      .pipe(map(_=>{
        event.stopPropagation();
        return this.previousPinnedState }));

    /*
     * A document click is only
     * triggered when the panel
     * and the toggle don't prevent
     * the bubbling so just emit 
     * false as the next pinned state.
     */
    let documentClicked$ = documentClick$
      .pipe(
        filter(_=>this.closeOnClickOutside),
        map(_=>false));
    
    /*
     * Combine all the pinned state
     * streams.
     */
    let nextPinnedState$ = of(false)
      .pipe(
        merge(toggleClicked$, panelClicked$, documentClicked$));

    /*
     * Combine all the mouse movement
     * streams.
     */
    let isHovering$ = of(false)
      .pipe(
        merge(leaveBoth$, enterEither$),
        /*
         * 50 here is arbitrary but 
         * seems to be below the 
         * human threshhold for noticing
         * the delay while letting 
         * slower systems have plenty of
         * time to process the events.
         * 
         * Maybe it should be configurable?
         */
        debounceTime(50));

    /*
     * Combine the hover and pinned state
     * streams into a stream that determines
     * whether the panel state needs to change.
     */
    this.showHideSubscription = 
      isHovering$
        .pipe(
          combineLatest(nextPinnedState$),
          map(states=>({hover:states[0],pin:states[1] })))
        .subscribe(this.onNextState);
  }

  ngOnDestroy() {
    if(this.showHideSubscription && !this.showHideSubscription.closed) {
      this.showHideSubscription.unsubscribe();
    }
  }

  /**
   * Determine what the next panel state
   * should be based on the new hover and
   * pin states.
   */
  onNextState = (nextStates:{hover: boolean, pin: boolean}) => {
    if(nextStates.hover ) {
      if(this.previousPinnedState && !nextStates.pin) { 
        this.panel.hide();  
      }
      else {
        this.panel.show();
      }
    }
    else {
      if(!this.previousPinnedState && nextStates.pin) {
        this.panel.show();
      }
      else if(!nextStates.pin){
        this.panel.hide();
      }
    }
    this.previousPinnedState = nextStates.pin;
    this.panel.pinned = nextStates.pin;
  }

  
}