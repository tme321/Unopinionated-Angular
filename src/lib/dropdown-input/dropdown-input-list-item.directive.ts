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
import { DynamicComponentData } from '../common/dynamic-component-data.interface';
import { UATDynamicComponentDirective } from './dynamic-component.directive';

/**
 */
@Directive({
  selector: '[uat-dropdown-input-list-item]',
  exportAs:'dynamicComp',
})
export class UATDropdownListItemDirective extends UATDynamicComponentDirective{

  @Input('uat-dropdown-input-list-item') public set componentData(compData: DynamicComponentData) {
    this.createComponent(compData);
  }

  constructor(protected vcRef: ViewContainerRef,
              protected resolver: ComponentFactoryResolver) {
    super(vcRef,resolver);
  }

}