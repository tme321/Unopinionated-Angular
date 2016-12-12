import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATMenuItem } from './menu-item.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UATMenuItem,
  ],
  exports: [
    UATMenuItem,
  ]
})
export class UATCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATCommonModule,
      providers: []
    };
  }
 }
