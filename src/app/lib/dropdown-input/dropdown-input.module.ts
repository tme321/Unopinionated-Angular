import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDropdownInput } from './dropdown-input.component';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';
import { UATDropdownInputDirective } from './dropdown-input.directive';
import { UATDynamicComponentModule } from '../dynamic-component/dynamic-component.module';
import { UATDropdownInputItemsList } from './item-list/dropdown-input-item-list.component';

@NgModule({
  imports: [
    CommonModule,
    UATSlidingPanelModule,
    UATDynamicComponentModule,
  ],
  
  declarations: [
    UATDropdownInput,
    UATDropdownInputDirective, 
    UATDropdownInputItemsList,
  ],
  
  exports: [
	  UATDropdownInput,
  ]
})
export class UATDropdownInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATDropdownInputModule,
      providers: []
    };
  }
}
