import { ViewRef } from "@angular/core";

export interface UATVector {
    offsetX: number;
    offsetY: number;
}

export interface UATDragStartEvent {
    view: ViewRef;
    mouseOffset: UATVector;
}