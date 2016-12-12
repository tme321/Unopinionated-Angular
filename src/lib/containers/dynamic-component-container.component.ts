import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ChangeDetectionStrategy,
    Input,
    ReflectiveInjector,
    ViewChild,
    ViewContainerRef } from '@angular/core';
import { DynamicComponentData } from '../common/dynamic-component-data.interface';

@Component({
    selector: 'uat-dynamic-component-container',
    templateUrl: 'dynamic-component-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UATDynamicComponentContainer {
    @ViewChild('componentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    public currentCompRef: ComponentRef<any>;

    @Input() public index: number;

    @Input() public set componentData(compData: DynamicComponentData) {
        this.createComponent(compData);
    }

    constructor(protected resolver: ComponentFactoryResolver) { }

    protected createComponent(compData: DynamicComponentData) {
        if (!compData) {
            return;
        }

        if (this.currentCompRef) {
            this.currentCompRef.destroy();
        }

        let inputProviders: any[] = []

        if (compData.providers) {
            inputProviders = Object.keys(compData.providers).map(
                (provName) => {
                    return { provide: provName, useValue: compData.providers[provName] };
                });
        }

        let injector =
            ReflectiveInjector
                .fromResolvedProviders(
                ReflectiveInjector.resolve(inputProviders),
                this.dynamicComponentContainer.parentInjector);
        
        let compRef: ComponentRef<any> =
            this.resolver
                .resolveComponentFactory(compData.component)
                .create(injector);

        this.dynamicComponentContainer.insert(compRef.hostView);

        if (compData.inputs) {
            Object.keys(compData.inputs).map(
                input => {
                    
                    compRef.instance[input] = compData.inputs[input];
                }
            )
        }

        compRef.changeDetectorRef.markForCheck();
        this.currentCompRef = compRef;
    }


}
