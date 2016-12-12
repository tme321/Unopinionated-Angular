import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATCommonModule } from '../common/common.module';
import { UATCollapsingMenu } from './collapsing-menu.component';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';

@NgModule({
  imports: [
    CommonModule,
    UATCommonModule,
    UATSlidingPanelModule
  ],
  declarations: [UATCollapsingMenu],
  exports: [UATCollapsingMenu]
})
export class UATCollapsingMenuModule { }
