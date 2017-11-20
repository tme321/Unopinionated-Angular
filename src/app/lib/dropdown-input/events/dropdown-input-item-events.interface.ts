
export interface DropdownInputItemsEvent {
    event: Event;
    index: number;
}

export interface DropdownInputItemsMouseEvent extends DropdownInputItemsEvent {
        event: MouseEvent;
}

export interface DropdownInputItemChosenEvent {
    component: any;
    index: number;
    matchText: string;
}