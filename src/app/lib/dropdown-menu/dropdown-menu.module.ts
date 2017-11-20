import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDropdownMenu } from './dropdown-menu.component';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';

@NgModule({
  imports: [
    CommonModule,
    UATSlidingPanelModule
  ],
  
  declarations: [
    UATDropdownMenu
  ],
  
  exports: [
	  UATDropdownMenu
  ]
})
export class UATDropdownMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATDropdownMenuModule,
      providers: []
    };
  }
 }
