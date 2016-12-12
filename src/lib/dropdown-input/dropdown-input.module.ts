import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDropdownInput } from './dropdown-input.component';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';
import { UATDropdownInputDirective } from './dropdown-input.directive';
import { UATContainersModule } from '../containers/containers.module';

import { UATDropdownInputItemsList } from './dropdown-input-item-list.component';
import { UATDynamicComponentDirective } from './dynamic-component.directive';



@NgModule({
  imports: [
    CommonModule,
    UATSlidingPanelModule,
    //UATContainersModule,

  ],
  
  declarations: [
    UATDropdownInput,
    UATDropdownInputDirective,

    // temp 
    UATDropdownInputItemsList,
    UATDynamicComponentDirective
  ],
  
  exports: [
	  UATDropdownInput,
  ]
})
export class UATDropdownInputModule { }
