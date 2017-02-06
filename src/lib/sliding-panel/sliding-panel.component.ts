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
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate,
  group,
  AnimationTransitionEvent
} from '@angular/core';

/**
 * A sliding panel is a div element that can be 
 * set to slide horizontally or vertically.
 * 
 * It can be tied to a slidiing panel toggle
 * or can be shown or hidden by calling the
 * public members. 
 */
@Component({
  moduleId: module.id,
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
  },
  // TODO: long term I would like to make the transition timing values
  // variable by an @Input.  
  animations: [
    trigger('horizontalTrigger', [
        state('hide', style({
            width: '0',
            overflow: 'hidden',
            // TODO: using scaleY instead of height for the animation
            // would be a better solution but we cannot toggle between
            // transform-origin values for vertical normal vs reverse
            // expansion of the panel.  So until we can use a variable
            // binding in animations we'll have to use height and width
            // despite their being less than ideal.
            //transform: 'scaleY(0)',
            //'transform-origin': 'top',
        })),
        state('show',   style({
          width: '*',
          //transform: 'scaleY(1)',
          //'transform-origin': 'top',
        })),
        
        
        transition('hide => show', [
          style({ width:'0', overflow:'hidden' }),
          group([
            animate('150ms ease-in', style({
              width: '*',
              overflow: 'hidden'
            })),
            animate('0ms 151ms ease', style({
            }))
          ])
        ]), 

        transition('show => hide', [
          style({ width:'*' }),
          group([
            animate('150ms ease-out', style({
              width: '0',
            })),
            animate('0ms ease', style({
              overflow: 'hidden'
            }))
          ])
        ]), 
        // simple transitions can be using with scale.
        //transition('hide => show', animate('200ms ease-in')),
        //transition('show => hide', animate('200ms ease-out'))
    ]),
    trigger('verticalTrigger', [
        state('hide', style({
            height: '0',
            overflow: 'hidden'
        })),
        state('show',   style({
          height: '*',
        })),
        transition('hide => show', [
          style({ height:'0', overflow:'hidden' }),
          group([
            animate('150ms ease-in', style({
              height: '*',
              overflow: 'hidden'
            })),
            animate('0ms 151ms ease-in', style({
            }))
          ])
        ]), 

        transition('show => hide', [
          style({ height:'*' }),
          group([
            animate('150ms ease-out', style({
              height: '0',
            })),
            animate('0ms ease-out', style({
              overflow: 'hidden'
            }))
          ])
        ]), 

        //transition('hide => show', animate('200ms ease-in')),
        //transition('show => hide', animate('200ms ease-out'))
    ])

  ],
  exportAs: 'uatSlidingPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UATSlidingPanel {
  @HostBinding('class.uat-sliding-panel') applyHostClass = true;

  /**
   * Specify the direction of the panels sliding animation.
   * 'horizontal' or 'veritcal'
   */
  @Input() slideDirection: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Specify whether the menu should initialize in the showing
   * or hidden state.  Defaults to false.
   */
  @Input() showOnInit = false;

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

  public get isShowing() {
    if(this.isHorizontal) {
      return this.horizontalState === 'show'
    }
    else{
      return this.verticalState === 'show'
    }
  }

  public get isHorizontal() {
    return this.slideDirection === 'horizontal';
  }

  horizontalState: 'init' | 'show' | 'hide' = 'init';
  verticalState: 'init' | 'show' | 'hide' = 'init';

  private overflowStyle = 'hidden';

  constructor(private chRef: ChangeDetectorRef, private zone: NgZone) { }

  ngOnInit() {
    if(!this.showOnInit) {
        if(this.isHorizontal) {
          this.zone.run(()=> setTimeout((_:any)=>{
            this.verticalState = 'show';
            this.horizontalState = 'hide';
          }));
        }
        else {
          this.zone.run(()=> setTimeout((_:any)=>{
            this.horizontalState = 'show';
            this.verticalState = 'hide';
          }));
        }
    }
    else {
      this.zone.run(()=> setTimeout((_:any)=>{
        this.verticalState = 'show';
        this.horizontalState = 'show';
      }));
    }
  }

  /**
   * Show the panel with a sliding animation.
   */
  public show() {
    if(this.isHorizontal){
      this.horizontalState = 'show';
    }
    else{
      this.verticalState = 'show';
    }
  }

  /**
   * Hide the panel with a sliding animation.
   */
  public hide() {
    if(this.isHorizontal){
      this.horizontalState = 'hide';
    }
    else{
      this.verticalState = 'hide';
    }
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
