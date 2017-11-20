import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDynamicComponentDirective } from './dynamic-component.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UATDynamicComponentDirective],
  exports: [UATDynamicComponentDirective]
})
export class UATDynamicComponentModule { }
