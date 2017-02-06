import { 
  Component, 
  Input,
  Output,
  Inject,
  forwardRef,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OpaqueToken,
  HostListener,
  HostBinding,
  ViewChild  
      } from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import { DropdownInputService, DropdownItemComponentData } from './dropdown-input-service.interface';
import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';
import { UATDropdownInputItemsList } from './dropdown-input-item-list.component';
import { UATDynamicComponentDirective } from './dynamic-component.directive';
import { DropdownInputItemsMouseEvent, DropdownInputItemChosenEvent } from './dropdown-input-item-events.interface';

export const UATDropdownInputServiceToken: OpaqueToken = new OpaqueToken('DdIService');

@Component({
  moduleId: module.id,
  selector: 'div[uat-dropdown-input]',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.css'],
  host: {
    '(focusout)':"onHostFocusOut($event)",
    '(focusin)':"onHostFocusIn($event)",
  },
  exportAs:'uatDropdownInput',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UATDropdownInput {
  @HostBinding('class.uat-dropdown-input') applyHostClass = true;

  /**
   * Set maximum number of items for the service.
   */
  @Input() maxItems: number;

  /**
   * Toggles whether the displayText should be set into the input
   * box when an item is 'chosen'.  Defaults to true. 
   */
  @Input() setTextOnChoice = true;

  /**
   * Set the place holder text on the input element.
   */
  @Input() placeholderText = '';

  /**
   * Sets how long, in ms, the delay is 
   * between updates to the DropdownInputService
   * when the value of the input element
   * has been changed.
   * 
   * Defaults to 400ms.
   */
  @Input() public inputValueChangeDelayms = 400;

  /**
   * The auto selection mode determine which item will be selected if the
   * choose item method is executed when no item has been specifically
   * selected by user interaction.
   * 
   * 'none'    - nothing is chosen without user interaction
   *  
   * 'lazy'    - the first item in the list is chosen
   *  
   * 'exact'   - if any item's displayText matches the input exactly,
   *             ignoring case, the first match is chosen
   * 
   * 'only'    - if there is only a single item in the list it is chosen
   * 
   * 'partial' - math the first item in the list that, ignoring case, 
   *             exactly matches the current value
   */
  @Input() autoSelectionMode: 'none' | 'lazy' | 'exact' | 'only' | 'partial' = 'none'; 

  /**
   * The index of the auto selection mode selection made.
   */
  private autoSelectedIndex = -1;

  private selectedIndex = -1;

  /**
   * Emit the data for the list item selected either through 
   * a mouse click or hitting enter when it is in the selected 
   * state.
   */
  @Output() listItemChosen = new EventEmitter<DropdownInputItemChosenEvent>();

  /**
   * Return true if the service has returned
   * at least 1 item to the component.
   */
  public get hasItems() {
      return this.numItems > 0;
  }

  public get isOpen() {
    return this.panel.isShowing;
  }

  @ViewChild('dropdownInput', {read: ElementRef}) inputElementRef: ElementRef;
  @ViewChild('panel', {read: ElementRef}) panelElementRef: ElementRef;

  @ViewChild('panel') panel: UATSlidingPanel;
  @ViewChild('dropdownList') list: UATDropdownInputItemsList;

  public get inputElement() {
    return (this.inputElementRef.nativeElement as HTMLInputElement);
  }

  // determine the location of clicks
  // to determine if the dropdown should
  // show or not.
  private outsideClick = new EventEmitter();
  private insideClick = new EventEmitter();

  private clickedInside = new BehaviorSubject(false);

  /* user interaction state tracking */
  private wasInsideClicked = false;
  private wasFocused = false;

  // for tracking the state of the panel
  private inputSub: Subscription;

  private itemsSub: Subscription;
  private numItems: number = 0;

  /*
   * Internal list of the dynamic components' containers.
   */
  private dynamicContainers: UATDynamicComponentDirective[];

  public diServ: DropdownInputService;

  constructor(
    @Inject(forwardRef(()=>UATDropdownInputServiceToken)) private _diServ: DropdownInputService,
    private ele: ElementRef,
    private chDetRef: ChangeDetectorRef) {
      this.diServ = _diServ;
  }

  ngOnInit() {

    if(this.maxItems) {
      this.diServ.setMaxItems(this.maxItems);
    }

    /*
     * Track the value changes of the input element
     * without bringing in angular forms to keep
     * the requirements for uat as low as possible.
     */
    this.inputSub = 
      Observable.fromEvent(this.inputElement, 'keyup')
        .map((event:KeyboardEvent)=>(event.target as HTMLInputElement).value)
        .debounceTime(this.inputValueChangeDelayms)
        .distinctUntilChanged()
        .subscribe(
            newText=>{
              this.diServ.setSearchText(newText);
            },
        err=>console.log(err),
        ()=>{/*done*/});

    this.itemsSub = this.diServ.items$
      .map(items=> items? items.length:-1)
      .subscribe(
        num=> {
          this.numItems = num;

          if(this.hasItems){
            this.panel.show();
          }
          else {
            this.panel.hide();
          }
          this.chDetRef.markForCheck();
          this.chDetRef.detectChanges();
        },
        err=>console.log(err),
        ()=>{/*done*/});
  }

  ngOnDestroy(){
    this.inputSub.unsubscribe();
    this.itemsSub.unsubscribe();
    this.diServ.clearItems();
  }

  /**
   * Clear any previous selection criteria and
   * perform a new auto selection.
   */
   onNewItemContainers(
    containers: UATDynamicComponentDirective[]) {
      this.clearAutoSelection();
      this.clearSelection();
      this.dynamicContainers = containers;
      if(this.dynamicContainers && this.dynamicContainers.length > 0){
        this.autoSelectItem();
      }
  }

  /**
   * Choose either the currently selected item or
   * the auto chosen item and emit it.
   */
  private chooseCurrentItem() {
      let currentItem: DropdownInputItemChosenEvent;
      if (this.selectedIndex >= 0) {
            currentItem = this.getCurrentItem(this.selectedIndex);
      }
      else {
          if (this.autoSelectedIndex >= 0) {
            currentItem = this.getCurrentItem(this.autoSelectedIndex);
          }
      }

      if(currentItem){
        if (this.setTextOnChoice) {
          this.inputElement.value = currentItem.matchText;
        }

        this.listItemChosen.emit(currentItem);
        this.clearSelection();
      }
  }

  /**
   * Return a data structure of the dynamic component
   * described by the index value.
   */
  private getCurrentItem(index: number): DropdownInputItemChosenEvent {
    return {
      component: this.dynamicContainers[index].currentCompRef.instance,
      index: index,
      matchText: this.list.dynamicComponentsData[index].matchText,
    }
  }

  /* Soft Selection Handling */
  private autoSelectItem() {
    let index = -1;
    switch (this.autoSelectionMode) {
        case 'none': {
            // do nothing
            break;
        }
        case 'lazy': {
            if (this.dynamicContainers) {
                index = 0;
            }
            break;
        }
        case 'exact': {
          if (this.dynamicContainers) {
            let containerIndex = -1;

            const container = this.list.dynamicComponentsData.find(
            (cnt,i) => {
              if (cnt.matchText.toLowerCase() === 
                this.inputElement.value.toLowerCase()) {
                containerIndex = i;
                return true;
              }
            });
            if (containerIndex >= 0) {
                index = containerIndex;
            }
          }
          break;
        }
        case 'partial': {
          if (this.dynamicContainers) {
            let containerIndex = -1;

            const container = this.list.dynamicComponentsData.find(
            (cnt,i) => {
              if (cnt.matchText.toLowerCase()
                  .substr(0,
                    this.inputElement.value.length) === 
                  this.inputElement.value.toLowerCase()) {
                containerIndex = i;
                return true;
              }
            });
            if (containerIndex >= 0) {
                index = containerIndex;
            }
          }
          break;
        }
        case 'only': {
            if (this.dynamicContainers && this.dynamicContainers.length === 1) {
                index = 0;
            }
            break;
        }
    }

    if (index != this.autoSelectedIndex) {
      this.clearAutoSelection();

      if (index >= 0) {
        this.list.changeAutoSelection(index, true);
      }
      this.autoSelectedIndex = index;
    }
  }

  /**
   * Clear current auto selection
   */
  private clearAutoSelection() {
    if (this.autoSelectedIndex >= 0) {
      this.list.changeAutoSelection(this.autoSelectedIndex, false);
      this.autoSelectedIndex = -1;
    }
  }

  /**
   * Select previous, wrapping
   */
  private selectPreviousListItem(e: KeyboardEvent) {
    this.getNextSelection(-1);
    
  }

  /**
   * Select next, wrapping
   */
  private selectNextListItem(e: KeyboardEvent) {
    this.getNextSelection(1);
  }

  /**
   * Get the next selection based on the indexChange
   * and wrapping around the array of items.
   */
  private getNextSelection(indexChange:number) {
    if (this.dynamicContainers && this.dynamicContainers.length > 0) {
        this.list.changeSelection(this.selectedIndex, false);

        // move selection index
        this.selectedIndex += indexChange;

        // wrap the selection
        if (this.selectedIndex < 0) {
            this.selectedIndex = this.dynamicContainers.length - 1;
        }
        else if (this.selectedIndex >= this.dynamicContainers.length) {
            this.selectedIndex = 0;
        }

        // set the selection
        this.list.changeSelection(this.selectedIndex, true);

        // the container element is considered to be the angular binding comment, so we have to go up 1 level to the li element
        const listElement = this.list.listElements[this.selectedIndex];
        const containerElement = (this.panelElementRef.nativeElement as HTMLDivElement);

        // check if item is in view
        const inViewData = this.elementOffsetFromView(listElement, containerElement);
        if (!inViewData.inView) {
            containerElement.scrollTop += inViewData.scrollBy;
        }
    }
  }

  /**
   * clear current selection
   */
  private clearSelection() {
    if (this.selectedIndex >= 0) {
      this.list.changeSelection(this.selectedIndex, false);
      this.selectedIndex = -1;
    }
  }

  /**
   * Determine if an element is within the view of the container element
   * and if it isn't also determine the vertical offset from being in view
   * it is at.
   * @param listElement the element to determine if it is in view
   * @param container the viewing container of the element
   */
  private elementOffsetFromView(listElement: HTMLElement, container: HTMLElement) {
      const listRec = listElement.getBoundingClientRect();
      const contRec = container.getBoundingClientRect();
      const topViz = listRec.top >= contRec.top;
      const botViz = listRec.bottom <= contRec.bottom;

      const inViewData = {
          inView: topViz && botViz,
          scrollBy: 0 
      }

      if (!botViz) {
          inViewData.scrollBy = listRec.bottom - contRec.bottom;
      }
      else if (!topViz) {
          inViewData.scrollBy = -(contRec.top - listRec.top);
      }
      
      return inViewData;
  }


  /* Event Handlers */

  /**
   * Read for extra control keys pressed, up and down arrows and enter,
   * and take the appropriate action based on them.
   * Up Arrow - select the previous item on the list, or the last item if none has been selected yet
   * Down Arrow - select the next item on the list, or the first if none has been selected 
   * Enter - 'choose' the currently selected item
   * @param e
   */
   onKeyDown(e: KeyboardEvent) {
      switch (e.keyCode) {
          case EventKeys.UPARROW:
              this.clearAutoSelection();
              this.selectPreviousListItem(e);
              e.preventDefault();
              break;
          case EventKeys.DOWNARROW:
              this.clearAutoSelection();
              this.selectNextListItem(e);
              e.preventDefault();
              break;
          case EventKeys.ENTER:
              this.chooseCurrentItem();
              e.preventDefault();
              break;
          default:
              // do nothing
              break;
      }
  }


  @HostListener('document:click',['$event']) 
  onOutsideClick(e: MouseEvent) {
    if(!this.wasInsideClicked) {
      this.wasFocused = false;
      setTimeout(_=>{
        if(!this.wasFocused){
          this.panel.hide();
          this.chDetRef.markForCheck();
          this.chDetRef.detectChanges();
        }},150);
    }
    this.wasInsideClicked = false;
  }

  @HostListener('click',['$event']) 
  onInsideClick(e: MouseEvent) {
    this.wasInsideClicked = true;
    this.wasFocused = true;
  }

  onHostFocusIn(e: FocusEvent) {
    if(this.hasItems){
      this.panel.show();
      this.chDetRef.markForCheck();
      this.chDetRef.detectChanges();
    }
    this.wasFocused = true;
  }

  onHostFocusOut(e: FocusEvent){
    this.wasFocused = false;
    setTimeout(_=>{
      if(!this.wasFocused){
        this.panel.hide();
        this.chDetRef.markForCheck();
      }},150);
  }

  onListItemMouseOver(e: DropdownInputItemsMouseEvent) {
    this.clearAutoSelection();
    this.clearSelection();
    this.selectedIndex = e.index;
    this.list.changeSelection(this.selectedIndex,true);
  }

  onListItemClicked(e: DropdownInputItemsMouseEvent) {
    this.selectedIndex = e.index;
    this.list.changeSelection(this.selectedIndex,true);
    this.chooseCurrentItem();
  }

}

/**
 * Enumerate the desired key codes for key events
 */
enum EventKeys {
    ENTER = 13,
    UPARROW = 38,
    DOWNARROW = 40,
};
