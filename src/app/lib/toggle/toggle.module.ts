import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATToggle } from './toggle.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  
  declarations: [
    UATToggle
  ],
  
  exports: [
	  UATToggle
  ]
})
export class UATToggleModule { }
