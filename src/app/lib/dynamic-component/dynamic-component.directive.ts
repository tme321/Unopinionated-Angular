import {
    Directive,  
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ChangeDetectionStrategy,
    Input,
    ReflectiveInjector,
    ViewChild,
    ViewContainerRef } from '@angular/core';
import { DynamicComponentData } from './dynamic-component-data.interface';

/**
 */
@Directive({
  selector: '[uat-dynamic-component]',
  exportAs:'dynamicComp',
})
export class UATDynamicComponentDirective {
    public currentCompRef: ComponentRef<any>;

    public dccClasses: any = {};

    @Input('uat-dynamic-component') public set componentData(compData: DynamicComponentData) {
      this.createComponent(compData);
    }

    constructor(protected vcRef: ViewContainerRef,
                protected resolver: ComponentFactoryResolver) {
    }

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
          (provName: any) => {
            return { provide: provName, useValue: compData.providers[provName] };
          });
      }

      let injector =
        ReflectiveInjector
          .fromResolvedProviders(
            ReflectiveInjector.resolve(inputProviders),
            this.vcRef.parentInjector);
      
      let compRef: ComponentRef<any> =
        this.resolver
          .resolveComponentFactory(compData.component)
          .create(injector);

      this.vcRef.insert(compRef.hostView);

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