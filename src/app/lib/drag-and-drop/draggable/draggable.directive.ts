import { 
  Directive, 
  OnInit, 
  ElementRef, 
  ViewRef, 
  ViewContainerRef, 
  TemplateRef, 
  EmbeddedViewRef, 
  OnDestroy,
  EventEmitter,
  Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { uatDnDType } from './../dnd.const';
import { closeSubscription } from '../../common';
import { UATDragAndDropService } from '../drag-and-drop.service';
import { UATVector, UATDragStartEvent } from './../dnd.models';

/**
 * UAT Draggable Structural Directive
 */
@Directive({
  selector: '[uatDraggable]'
})
export class UATDraggableDirective implements OnInit, OnDestroy {
  @Output() dragStartedOnView = new EventEmitter<UATDragStartEvent>();
  @Output() dragEndedOnView = new EventEmitter<ViewRef>();
  
  /**
   * 
   */
  public get isBeingDragged() {
    return this._isBeingDragged;
  }

  /**
   * 
   */
  public get draggableTemplateRef() {
    return this.templateRef;
  }

  /**
   * 
   */
  private draggableViewRef: ViewRef;

  /**
   * 
   */
  private embeddedTemplateRef: EmbeddedViewRef<any>;

  /**
   * 
   */
  private dragStartSubscription: Subscription;

  /**
   * 
   */
  private dragEndSubscription: Subscription;

  /**
   * 
   */
  private set isDragged(dragged: boolean) {
    this._isBeingDragged = dragged;

    if(this._isBeingDragged) {
      //this.dragStartedOnView.next(this.draggableViewRef);
      //this.viewContainer.detach();
    } else {
      //this.dragEndedOnView.next(this.draggableViewRef);
      //this.viewContainer.insert(this.draggedViewRef);
    }
  }

  /**
   * 
   */
  private _isBeingDragged = false;

  /**
   * 
   */
  private context = new DraggableContext();

  /**
   * 
   * @param dndService 
   * @param templateRef 
   */
  constructor(
    private dndService: UATDragAndDropService,    
    private templateRef: TemplateRef<any>
  ) {
  }

  /**
   * 
   */
  ngOnInit() {
    /*
    this.embeddedTemplateRef = 
      this.viewContainer.createEmbeddedView(this.templateRef);
    this.registerDragAndDropEvents(this.embeddedTemplateRef.rootNodes[0]);
    this.draggedViewRef = this.viewContainer.get(0);
    */
  }

  /**
   * 
   */
  ngOnDestroy() {
    closeSubscription(this.dragStartSubscription);
    closeSubscription(this.dragEndSubscription);
  }

  /**
   * 
   * @param target 
   */
  registerDragAndDropEvents(view: EmbeddedViewRef<any>) {
    this.draggableViewRef = view;
    let target = view.rootNodes[0] as HTMLElement;

    target.setAttribute("draggable","true");

    this.dragStartSubscription = 
      fromEvent<DragEvent>(target,"dragstart")
        .subscribe((event: DragEvent)=>{
          event.dataTransfer.setData(uatDnDType,'uatdraggable');
          //event.dataTransfer.effectAllowed = "move";
          //event.dataTransfer.setDragImage(
          //  target.cloneNode(true) as HTMLElement,0,0);

          let rect = event.srcElement.getBoundingClientRect();
          let y = rect.top + (rect.height / 2);
          let x = rect.left + (rect.width / 2);
          console.log(x,y);

          let e: UATDragStartEvent = {
            view: this.draggableViewRef,
            mouseOffset: {
              offsetX: event.clientX - x,
              offsetY: event.clientY - y
            }
          }

          /*
          let center = document.createElement("div") as HTMLDivElement;
          center.style.position = 'absolute';
          center.style.left = `${mouseOffset.offsetX}px`;
          center.style.top = `${mouseOffset.offsetY}px`;
          center.style.borderRadius= "20px"
          center.style.height = "20px";
          center.style.width= "20px";
          
          let i = new Image();
          
          let clone = event.srcElement.cloneNode(true) as HTMLLIElement;
          clone.appendChild(center);
          i.appendChild(clone);
          console.log(i);
          event.dataTransfer.setDragImage(
             i,event.pageX, event.pageY);
          */

          /*
          event.dataTransfer.setDragImage(
            event.srcElement,event.clientX, event.clientY);
          */

          /* Chrome calls dragend if the dom is changed during  */
          /* drag start so in order to not call dragend         */
          /* immediately we have to fire the dom manipulations  */
          /* outside of the event                               */
          setTimeout(()=>{
            this.dragStartedOnView.next(e)
          });
        },
        err=>console.log(err),
        ()=>{});

    this.dragEndSubscription = 
    fromEvent(target,"dragend")
        .subscribe((event: DragEvent)=>{
          //this.isDragged = false;
          this.dragEndedOnView.next(this.draggableViewRef);
        },
        err=>console.log(err),
        ()=>{});
  }


}

export class DraggableContext {
  public implicit$: any = null;
}
