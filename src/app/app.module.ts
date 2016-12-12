import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { NavigationLink, MenuInput } from './menu-items.components';

import { HomeComponent } from './home/home.component';

//import { DemoSearchService } from './demo-dropdown-search.service';
import { DemoDropdownInputService } from './demo-dropdown-input.service';

import { UATSlidingPanelModule } from '../lib/sliding-panel/sliding-panel.module';
//import { UATContainersModule }from'../lib/containers/containers.module';
import { UATDropdownMenuModule } from '../lib/dropdown-menu/dropdown-menu.module';
import { UATSlideoutMenuModule } from '../lib/slideout-menu/slideout-menu.module';
import { UATDropdownInputModule } from '../lib/dropdown-input/dropdown-input.module';
import { DropdownInputServiceToken } from '../lib/dropdown-input/dropdown-input.component';
import { UATHamburgerMenuModule } from '../lib/hamburger-menu/hamburger-menu.module';
import { UATCollapsingMenuModule } from '../lib/collapsing-menu/collapsing-menu.module';
import { UATToggleModule }  from '../lib/toggle/toggle.module';
import { UATCommonModule } from '../lib/common/common.module';


import { ColorViewerComponent } from './color-viewer/color-viewer.component';
import { ColorButtonComponent } from './color-button/color-button.component';
import { CollapsingMenuColorWidgetComponent } from './collapsing-menu-color-widget/collapsing-menu-color-widget.component';
import { DropdownMenuColorWidgetComponent } from './dropdown-menu-color-widget/dropdown-menu-color-widget.component';

@NgModule({
  declarations: [
    AppComponent,
	  NavigationLink,
	  MenuInput,
	  HomeComponent,
	  ColorViewerComponent,
	  ColorButtonComponent,
	  CollapsingMenuColorWidgetComponent,
	  DropdownMenuColorWidgetComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
	  ReactiveFormsModule,
    HttpModule,
	  RouterModule,
	  AppRoutingModule,
    UATSlidingPanelModule,
    UATDropdownMenuModule,
    UATSlideoutMenuModule,
    UATDropdownInputModule,
    UATHamburgerMenuModule,
    UATCollapsingMenuModule,
    UATToggleModule,
    UATCommonModule,
  ],

  providers: [
    { provide: DropdownInputServiceToken, useClass: DemoDropdownInputService}
    
  ],

  bootstrap: [AppComponent],

  entryComponents:[
	  NavigationLink, 
	  MenuInput,
  ]
})
export class AppModule { }
//unopinioated angular toolbox - uat