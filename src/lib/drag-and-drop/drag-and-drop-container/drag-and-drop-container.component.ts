import { 
  Directive, 
  OnInit, 
  QueryList, 
  AfterContentInit, 
  ContentChildren,  
  ElementRef,
  ViewContainerRef,
  Component,
  ViewChild,
  TemplateRef,
  EmbeddedViewRef,
  ViewRef} from '@angular/core';
import { UATDraggableDirective } from '../draggable';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { uatDnDType } from './../dnd.const';
import { UATDragAndDropService } from '../drag-and-drop.service';
import { UATDragStartEvent, UATVector } from '../dnd.models';

@Component({
  selector: '[uatDnDContainer]',
  templateUrl: './drag-and-drop-container.component.html',
  styleUrls: ['./drag-and-drop-container.component.css']
})
export class UATDragAndDropContainerComponent implements AfterContentInit {
  @ContentChildren(UATDraggableDirective) draggablesQL: QueryList<UATDraggableDirective>;
  @ViewChild("dndContainer", {read: ViewContainerRef}) dndContainer: ViewContainerRef;
  
  private draggingMouseOffset: UATVector;
  private dragStartEvent: UATDragStartEvent;
  private draggableEmbeddedViews: EmbeddedViewRef<any>[] = [];

  private readonly DefaultDragLocationTarget: DragLocationTarget = {
    lowIndex: -1, 
    highIndex: -1,
    viewBeingDragged: null
  };

  private dragLocation : DragLocationTarget = this.DefaultDragLocationTarget;
  
  constructor(
    private dndService: UATDragAndDropService,
    private hostElementRef: ElementRef    
  ) {
  }

  ngOnInit() {
    Observable.fromEvent(this.hostElementRef.nativeElement,"dragenter")
      .subscribe(this.onDragEnter);

    Observable.fromEvent(this.hostElementRef.nativeElement,"dragover")
      .debounceTime(50)
      .subscribe(this.onDragOver);

    Observable.fromEvent(this.hostElementRef.nativeElement,"dragover")
      .subscribe((e:Event)=>{
        e.preventDefault();
      })

    Observable.fromEvent(this.hostElementRef.nativeElement,"drop")
      .subscribe(this.onDrop);
  }

  ngAfterContentInit() {
    this.draggablesQL
      .changes
      .subscribe((draggables:UATDraggableDirective[])=>{
      });
      console.log("container");
      console.log(this.dndContainer);
      this.draggablesQL.map(this.initDraggable);
  }

  /**
   * 
   * @param draggable 
   * @param index 
   */
  initDraggable = (draggable: UATDraggableDirective, index: number) => {
    let embeddedViewRef = 
      this.dndContainer.createEmbeddedView(draggable.draggableTemplateRef)
    this.draggableEmbeddedViews.push(embeddedViewRef);
    draggable.registerDragAndDropEvents(embeddedViewRef);
    draggable.dragStartedOnView.subscribe(this.onDragStart);
    draggable.dragEndedOnView.subscribe(this.onDragEnd);
  }

  /**
   * 
   * @param event 
   */
  onDragStart = (event: UATDragStartEvent) => {
    this.dragStartEvent = event;
    this.draggingMouseOffset = event.mouseOffset;
    let viewIndex = this.dndContainer.indexOf(event.view);
    this.dndContainer.detach(viewIndex);
    this.draggableEmbeddedViews.splice(viewIndex,1);
  }

  /**
   * 
   * @param view 
   */
  onDragEnd = (view: EmbeddedViewRef<any>) => {
    //this.dndContainer.insert(view);
    return;
  }

  onDragEnter = (event:DragEvent) => {
    console.log("dragenter");
    event.dataTransfer.dropEffect = "move";
    event.preventDefault();
  }

  onDragOver = (event:DragEvent) => {
    console.log("dragover");
    // console.log(event.dataTransfer.types);
    let shortestDistance = Number.MAX_SAFE_INTEGER;
    let closestView: EmbeddedViewRef<any> = null;
    let closestIndex = 0; 
    let nextClosestIndex = 0;

    this.draggableEmbeddedViews
      /*
       * TODO: Long term optimization maybe use the item
       * filtered out's index as the starting location
       * for further hit tests since we know that it
       * is the one being dragged.  Ie.  If Index 4 is
       * filtered out then start hit tests at index 3 
       * and 5 instead of starting hit tests at index 
       * 0 and checking all items.
       */
      .filter(view=>view!==this.dragStartEvent.view)
      .map(view=>{
        let element = (view.rootNodes[0] as HTMLElement);
        let rect = element.getBoundingClientRect();
        return {
          view: view,
          x: rect.left + (rect.width / 2),
          y: rect.top + (rect.height / 2)
        }})
      .forEach((centerCoordinates, i) =>{
        let dy = this.calculate1DimensionDistance(
          centerCoordinates.y,
          event.clientY + this.dragStartEvent.mouseOffset.offsetY);

        console.log(`${i} = ${dy} y's: ${centerCoordinates.y} - ${event.clientY} + ${this.dragStartEvent.mouseOffset.offsetY}`)
          
        let distance = Math.abs(dy);

        if(distance < shortestDistance) {
          shortestDistance = distance;
          closestView = centerCoordinates.view;
          closestIndex = i;

          // determine which side of the closest draggable
          // the draggable being dragged is on and set the
          // next closest accordingly
          nextClosestIndex = (dy < 0)? closestIndex + 1: closestIndex - 1;

          this.dragLocation = {
            lowIndex: Math.min(closestIndex,nextClosestIndex),
            highIndex: Math.max(closestIndex,nextClosestIndex),
            viewBeingDragged: this.dragStartEvent.view
          };
        }
      });

    event.preventDefault();

    /* this signifies that the container is a valid drop target  */
    /* TODO: doesn't work at the moment? the uatDnDType is never */
    /* properly attached to the event even though I am setting   */
    /* the type inside the draggable directive event...          */
    if(event.dataTransfer.types.includes(uatDnDType)) {
      console.log('uat transfer detected');
    }
  }

  onDrop = (event:DragEvent) => {
    this.dndContainer.insert(
      this.dragLocation.viewBeingDragged,
      this.dragLocation.highIndex);

    this.draggableEmbeddedViews.splice(
      this.dragLocation.highIndex,
      0,
      this.dragLocation.viewBeingDragged as EmbeddedViewRef<any>);
  }

  /**
   * 
   * @param p1 
   * @param p2 
   */
  private calculate1DimensionDistance(p1: number, p2: number) {
    return p1 - p2;
  }

  /**
   * 
   * @param x1 
   * @param x2 
   * @param y1 
   * @param y2 
   */
  private calculate2DimensionDistance(x1: number,x2: number,y1: number,y2: number) {
    return Math.sqrt(
      this.calculate1DimensionDistance(x1,x2)**2 + 
      this.calculate1DimensionDistance(y1,y2)**2);
  }

    
  
}

export interface DragLocationTarget {
  lowIndex: number;
  highIndex: number;
  viewBeingDragged: ViewRef;
}
