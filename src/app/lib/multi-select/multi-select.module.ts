import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATMultiSelectComponent } from './multi-select.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  
  declarations: [
    UATMultiSelectComponent
  ],
  
  exports: [
    UATMultiSelectComponent
  ]
})
export class UATMultiSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATMultiSelectModule,
      providers: []
    };
  }  
}
