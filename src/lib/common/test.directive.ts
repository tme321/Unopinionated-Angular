import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[uat-test]',
})
export class  UATTest {
    //@Input('uat-test') text: string;

    constructor(
        public templateRef: TemplateRef<any>,
        public viewContainer: ViewContainerRef) { }

}