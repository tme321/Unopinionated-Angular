import { NgModule, OpaqueToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATSlidingPanelModule } from '../sliding-panel/sliding-panel.module';
import { UATHamburgerMenu } from './hamburger-menu.component';
import { UATMenuItemRight } from './menu-item-right.directive';
import {UATCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    UATSlidingPanelModule,
    UATCommonModule,
  ],
  
  declarations: [
    UATHamburgerMenu,
    UATMenuItemRight,
  ],
  
  exports: [
    UATHamburgerMenu,
    UATMenuItemRight,
  ]
})
export class UATHamburgerMenuModule { }
