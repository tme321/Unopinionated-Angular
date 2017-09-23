import { NgModule, ModuleWithProviders } from '@angular/core';

import { UATSlidingPanelModule } from './sliding-panel/index';
import { UATDropdownMenuModule } from './dropdown-menu/index';
import { UATSlideoutMenuModule } from './slideout-menu/index';
import { UATDropdownInputModule } from './dropdown-input/index';
import { UATHamburgerMenuModule } from './hamburger-menu/index';
import { UATCollapsingMenuModule } from './collapsing-menu/index';
import { UATMultiSelectModule } from './multi-select/index';
import { UATCommonModule } from './common/index';
import { UATDragAndDropModule } from './drag-and-drop/index';

const UAT_MODULES = [
    UATSlidingPanelModule,
    UATDropdownMenuModule,
    UATSlideoutMenuModule,
    UATDropdownInputModule,
    UATHamburgerMenuModule,
    UATCollapsingMenuModule,
    UATMultiSelectModule,
    UATCommonModule,
    UATDragAndDropModule,
];

@NgModule({
  imports: [
    UATSlidingPanelModule.forRoot(),
    UATDropdownMenuModule.forRoot(),
    UATSlideoutMenuModule.forRoot(),
    UATDropdownInputModule.forRoot(),
    UATHamburgerMenuModule.forRoot(),
    UATCollapsingMenuModule.forRoot(),
    UATMultiSelectModule.forRoot(),
    UATCommonModule.forRoot(),
    UATDragAndDropModule.forRoot(),
  ],
  exports: UAT_MODULES
})
export class UATRootModule { }

@NgModule({
  imports: UAT_MODULES,
  exports: UAT_MODULES,
})
export class UATModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: UATRootModule, providers: []};
  }
}
