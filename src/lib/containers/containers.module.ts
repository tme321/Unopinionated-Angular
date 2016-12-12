import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDynamicComponentContainer } from './dynamic-component-container.component';
import { UATContentContainer } from './content-container.component';
import { UATDynamicComponentList } from './dynamic-component-list.component';

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    UATDynamicComponentContainer,
    UATContentContainer,
    UATDynamicComponentList,
  ],

  exports: [
    UATDynamicComponentContainer,
    UATContentContainer,
    UATDynamicComponentList,
  ]
})
export class UATContainersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATContainersModule,
      providers: []
    };
  }
 }
