import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NavigationLink, MenuInput } from './menu-items.components';
import { DemoDropdownInputService } from './demo-dropdown-input.service';

import { HomeComponent } from '../home/home.component';
import { ColorViewerComponent } from '../color-viewer/color-viewer.component';
import { ColorButtonComponent } from '../color-button/color-button.component';
import { CollapsingMenuColorWidgetComponent } from '../collapsing-menu-color-widget/collapsing-menu-color-widget.component';
import { DropdownMenuColorWidgetComponent } from '../dropdown-menu-color-widget/dropdown-menu-color-widget.component';

import { UATModule } from 'unopinionated-angular-toolbox';
import { UATDropdownInputServiceToken } from 'unopinionated-angular-toolbox';

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
    UATModule.forRoot(),
  ],

  providers: [
    { provide: UATDropdownInputServiceToken, useClass: DemoDropdownInputService}
  ],

  bootstrap: [AppComponent],

  entryComponents:[
	  NavigationLink, 
	  MenuInput,
  ]
})
export class AppModule { }
