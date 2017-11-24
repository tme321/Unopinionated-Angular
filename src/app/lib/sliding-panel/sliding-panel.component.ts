import { 
  Component, 
  Input, 
  Output, 
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  NgZone,
  HostBinding,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate,
  group
} from '@angular/animations';

import { 
  verticalSlideAnimations, 
  horizontalSlideAnimations } from './sliding-panel.animations';
import { SlideAnimationDirections, SlideDirections } from './sliding-panel.enums';



/**
 * A sliding panel is a div element that can be 
 * set to slide up, down, left, or right.
 * 
 * It can be tied to a slidiing panel toggle
 * or can be shown or hidden by calling the
 * public members show, hide, or toggle. 
 */
@Component({
  selector: 'div[uat-sliding-panel]',
  templateUrl: './sliding-panel.component.html',
  styleUrls: ['./sliding-panel.component.css'],
  host: {
    '[@horizontalTrigger]':'horizontalState',
    '[@verticalTrigger]':'verticalState',
    '[class.open]':'isShowing',
    '[class.closed]':'!isShowing',
    '[class.pinned]':'pinned',
    '(mouseenter)':'mouseEnterPanel.emit($event)',
    '(mouseleave)':'mouseLeavePanel.emit($event)',
    '(mouseover)':'mouseOverPanel.emit($event)',
    '(click)':'clickPanel.emit($event)',
    '[class.uat-sliding-panel]':"'true'"
  },
  animations: [
    verticalSlideAnimations(), 
    horizontalSlideAnimations(),
  ],
  exportAs: 'uatSlidingPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UATSlidingPanel {
  /**
   * Specify the direction of the panels sliding animation.
   * Valid values: 'up', 'down', 'left', or 'right'
   */
  @Input() slideDirection: SlideDirections = SlideDirections.DOWN;

  /**
   * Event for when the mouse enters the panel.
   */
  @Output() mouseEnterPanel= new EventEmitter<MouseEvent>();

  /**
   * Event for when the mouse leaves the panel.
   */
  @Output() mouseLeavePanel= new EventEmitter<MouseEvent>();

  /**
   * Event for when the mouse is over the panel.
   */
  @Output() mouseOverPanel= new EventEmitter<MouseEvent>();

  /**
   * Event for when the panel is clicked.
   */
  @Output() clickPanel= new EventEmitter<MouseEvent>();

  public pinned = false;


  /**
   * Trigger for the horizontal animations.
   */
  private horizontalState : SlideAnimationDirections = SlideAnimationDirections.CLOSE;

  /**
   * Trigger for the vertical animations.
   */
  private verticalState : SlideAnimationDirections = SlideAnimationDirections.CLOSE;

  constructor() { }

  /**
   * Returns whether the panel is open or closed.
   */
  public get isShowing() {
    return (this.horizontalState !== SlideAnimationDirections.CLOSE ||
        this.verticalState !== SlideAnimationDirections.CLOSE);
  }

  /**
   * Show the panel with a sliding animation.
   */
  public show() {
    switch(this.slideDirection) {
      case SlideDirections.LEFT: {
        this.horizontalState = SlideAnimationDirections.SLIDE_LEFT;
        break;
      }
      case SlideDirections.RIGHT: {
        this.horizontalState = SlideAnimationDirections.SLIDE_RIGHT;
        break;
      }
      case SlideDirections.UP: {
        this.verticalState = SlideAnimationDirections.SLIDE_UP;
        break;
      }
      case SlideDirections.DOWN: {
        this.verticalState = SlideAnimationDirections.SLIDE_DOWN;
        break;
      }
      default: {
        this.horizontalState = SlideAnimationDirections.CLOSE;
        this.verticalState = SlideAnimationDirections.CLOSE;
        break;
      }
    }
  }

  /**
   * Hide the panel with a sliding animation.
   */
  public hide() {
    this.horizontalState = SlideAnimationDirections.CLOSE;
    this.verticalState = SlideAnimationDirections.CLOSE;

  }

  /**
   * Toggle the panel state with a sliding animation.
   */
  public toggle() {
    if(this.isShowing){
      this.hide();
    }
    else{
      this.show();
    }
  }

}
