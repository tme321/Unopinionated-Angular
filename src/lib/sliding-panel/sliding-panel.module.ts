import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UATSlidingPanel } from './sliding-panel.component';
import { UATSlidingPanelToggle } from './sliding-panel-toggle.directive';

@NgModule({
  imports: [
    CommonModule
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
export class UATSlidingPanelModule { }
