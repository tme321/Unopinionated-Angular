import { DynamicComponentData } from './dynamic-component-data.interface';

export interface DynamicContainerEvent {
    event: Event;
    index: number;
}

export interface DynamicContainerMouseEvent extends DynamicContainerEvent {
        event: MouseEvent;
}

