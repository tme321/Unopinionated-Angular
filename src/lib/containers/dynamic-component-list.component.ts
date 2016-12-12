import {
    Component,
    ComponentRef,
    Input,
    Output,
    EventEmitter,
    ComponentFactoryResolver,
    HostBinding,
    ReflectiveInjector,
    ViewContainerRef,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { DynamicComponentData } from '../common/dynamic-component-data.interface';
import { UATDynamicComponentContainer } from './dynamic-component-container.component';
import { DynamicContainerMouseEvent } from '../common/dynamic-component-events.interface';

@Component({
    selector:'ul[uat-dynamic-component-list]',
    templateUrl: 'dynamic-component-list.component.html',
})
export class UATDynamicComponentList<T extends DynamicComponentData> {
    @HostBinding('class.uat-dynamic-component-list') private applyHostClass = true;

    @Input() public dynamicComponentsData: T[] = [];

    @Input() index: number;

    public dynamicComponentClasses: any[];

    @ViewChildren('dynamicComponent') public dynamicComponentContainers: QueryList<UATDynamicComponentContainer>;

    @Output() public newContainers = new EventEmitter<UATDynamicComponentContainer[]>();

    @Output() public containerMouseOver = new EventEmitter<DynamicContainerMouseEvent>();

    @Output() public containerClick = new EventEmitter<DynamicContainerMouseEvent>();

    private newContainersSub: Subscription;

    constructor() {
    }

    private ngAfterViewInit() {
        // emit the original list
        this.newContainers.emit(this.dynamicComponentContainers.toArray());

        if (this.newContainersSub) {
            this.newContainersSub.unsubscribe();
        }

        this.newContainersSub =
            this.dynamicComponentContainers
                .changes
                .subscribe(
                    newList => {
                        this.newContainers.emit(newList.toArray());
                    },
                    (error: string) => console.log(error),
                    () => {
                        this.newContainersSub.unsubscribe()
                    });
    }

    private ngOnDestroy() {
        if (this.newContainersSub) {
            this.newContainersSub.unsubscribe();
        }
    }

    private onContainerClick(
        e: MouseEvent, 
        containerData: T, 
        index: number){
        this.containerClick.emit({
            event: e,
            index: index
        });
    }

    private onContainerMouseOver(
        e: MouseEvent, 
        containerData: T, 
        index: number) {
        this.containerMouseOver.emit({
            event: e,
            index: index
        });
    }
}

