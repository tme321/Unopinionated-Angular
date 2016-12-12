import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATMenuItem } from './menu-item.directive';

//import { UATTest } from './test.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UATMenuItem,
    //UATTest
  ],
  exports: [
    UATMenuItem,
    //UATTest
  ]
})
export class UATCommonModule { }
