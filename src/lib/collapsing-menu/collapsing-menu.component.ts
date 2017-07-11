import { 
  Component,
  Input,
  ContentChildren,
  QueryList,
  ElementRef,
  EventEmitter,
  TemplateRef,
  ViewRef,
  Renderer,
  ViewChild,
  HostBinding,
  NgZone,
 } from '@angular/core';
import { UATMenuItem } from '../common/menu-item.directive';
import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';

@Component({
  selector: 'div[uat-collapsing-menu]',
  templateUrl: './collapsing-menu.component.html',
  styleUrls: ['./collapsing-menu.component.css'],
  host:{
    '(window:resize)': "onWindowResize()",
  },
  exportAs: "uatCollapsingMenu"
})
export class UATCollapsingMenu {
  @HostBinding('class.uat-collapsing-menu') applyHostClass = true;

  /**
   * Controls whether the collapsed items should  
   * open based on a click event or not.
   */
  @Input() toggleOnClick = true;

  /**
   * Controls whether the collapsed items should open 
   * on mouse over or not.
   */
  @Input() showOnHover = false;

  /**
   * Controls whether the collapsed items should close
   * When clicked outside the toggle or panel or not.
   */
  @Input() closeOnClickOutside = true;

  @ContentChildren(UATMenuItem, {read:ElementRef, descendants: false}) 
    items: QueryList<ElementRef>;
  @ViewChild('displayedItems', {read:ElementRef}) 
    displayedItems: ElementRef;
  @ViewChild('collapsedItems', {read:ElementRef}) 
    collapsedItems: ElementRef;
  @ViewChild('toggle', {read:ElementRef}) 
    toggle: ElementRef;

  @ViewChild('panel') panel: UATSlidingPanel;

  public get isOpen() {
    return this.panel.isShowing;
  }

  /**
   * Per issue 10098 ContentChildren currently also adds the host component
   * to a QueryList that it satisfies making it necessary to filter the 
   * host component out of it's own list in case someone wants to nest
   * a collapsing menu inside another UAT component that uses UATMenuItems.
   * 
   * https://github.com/angular/angular/issues/10098#issuecomment-235157642
   */
  private get itemElements(): ElementRef[] {
    return this.items.toArray()
      .filter(el=> el.nativeElement !== this.hostElementRef.nativeElement);
  }

  private get hostDiv(): HTMLDivElement {
    return this.hostElementRef.nativeElement as HTMLDivElement;
  }

  private get displayedDiv(): HTMLDivElement {
    return this.displayedItems.nativeElement as HTMLDivElement;
  }

  private get collapsedDiv(): HTMLDivElement {
    return this.collapsedItems.nativeElement as HTMLDivElement;
  }

  private get toggleDiv(): HTMLDivElement {
    return this.toggle.nativeElement as HTMLDivElement;
  }

  hasOverflow = false;

  constructor(
    private renderer: Renderer, 
    private hostElementRef: ElementRef,
    private zone: NgZone) { }

  ngAfterViewInit() {
    this.calculateOverflow();
  }

  /**
   * Determine which, if any, items need to be 
   * moved into the collapsed panel when they 
   * overflow the menu width.
   */
  private calculateOverflow() {
      this.renderer.projectNodes(this.displayedDiv, 
        this.itemElements.map(el=>{ return el.nativeElement }));

      if(this.areDisplayedItemsToWide()) {

        this.zone.run(()=>{
          setTimeout(()=>{
            this.hasOverflow = true})});

        const hostWidth = this.hostDiv.getBoundingClientRect().width;
        const hostLeft = this.hostDiv.getBoundingClientRect().left;
        const hostRight = this.hostDiv.getBoundingClientRect().right;
        const collapsedWidth = this.collapsedDiv.getBoundingClientRect().width;

        const menuCalcedRight = 
          (this.hostDiv.offsetLeft + 
          this.hostDiv.offsetWidth - 
          this.toggleDiv.offsetWidth);

        let firstOverflowIndex = Number.POSITIVE_INFINITY;
        let overflowAmount = 0;
                   
        // find the first item that is outside the menu's size - toggle size
        for(let i = 0; i < this.itemElements.length; i++) {
          const ele = (this.itemElements[i].nativeElement as HTMLElement);
          const eleCalcedRight = (ele.offsetLeft + this.hostDiv.offsetLeft + ele.offsetWidth);

          // calculate how much an item overflows the container
          // taking the toggles width into account.
          overflowAmount = eleCalcedRight - menuCalcedRight;

          if(overflowAmount > 0) {
            firstOverflowIndex = i;
            break;
          }
        }

        // all items are collapsed
        if (firstOverflowIndex == 0) {
            this.renderer.projectNodes(this.collapsedDiv,
              this.itemElements.map(el=>{return el.nativeElement}));
        }

        // the overflow items make enough room for the toggle
        else {
            this.renderer.projectNodes(this.collapsedDiv,
              this.itemElements
                .filter((el,index)=>{
                  return (index >= firstOverflowIndex)})
                .map(el=>{return el.nativeElement}));
        }
      }
      else {
        this.zone.run(()=>{
          setTimeout(()=>{
            this.hasOverflow = false})});
      }
  }

  /**
   * Determine if the menu content width is larger than the menu width
   */
  private areDisplayedItemsToWide() {
    return this.displayedDiv.getBoundingClientRect().width > 
      this.hostDiv.getBoundingClientRect().width;
  }

  /**
   * Event handlers
   */

  onWindowResize() {
    this.calculateOverflow();
  }

}
