import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATSlideoutMenu } from './slideout-menu.component';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';

@NgModule({
  imports: [
    CommonModule,
    UATSlidingPanelModule,
  ],
  
  declarations: [
    UATSlideoutMenu
  ],
  
  exports: [
	  UATSlideoutMenu
  ]
})
export class UATSlideoutMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATSlideoutMenuModule,
      providers: []
    };
  }  
}
