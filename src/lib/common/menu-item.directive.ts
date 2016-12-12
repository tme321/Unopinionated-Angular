import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[uat-menu-item]',
})
export class  UATMenuItem {
    constructor(
        private _viewContainer: ViewContainerRef) { }
}