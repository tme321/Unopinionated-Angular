import { Component, Input } from "@angular/core";

/**
 * This component is used for testing
 * that things like change detection still
 * work when dealing with various aspects
 * of the angular view system,
 */
@Component({
    selector: 'foo',
    template: `<span>{{cnt}}</span>`
})
export class FooComponent {
    counter = 0;
    @Input() cnt: number = 0;

    @Input() set inc(num: number) {
        console.log('received inc');
        this.counter++;
    }
}
