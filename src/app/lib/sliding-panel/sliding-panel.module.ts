import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UATSlidingPanel } from './sliding-panel.component';
import { UATSlidingPanelToggle } from './toggle/sliding-panel-toggle.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  
  declarations: [
    UATSlidingPanel, 
    UATSlidingPanelToggle
  ],

  exports: [
    UATSlidingPanel, 
    UATSlidingPanelToggle
  ]
})
export class UATSlidingPanelModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATSlidingPanelModule,
      providers: []
    };
  }  
}
