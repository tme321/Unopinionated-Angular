import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { UATModule } from './lib/UAT.module';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NavigationLink, MenuInput } from './menu-items/menu-items.components';
import { HomeComponent } from './home';
import { ColorViewerComponent } from './color-viewer';
import { ColorButtonComponent } from './color-button';
import { CollapsingMenuColorWidgetComponent } from './collapsing-menu-color-widget';
import { DropdownMenuColorWidgetComponent } from './dropdown-menu-color-widget';
import { FooComponent } from './home/foo.component';

import { UATDropdownInputServiceToken } from './lib/dropdown-input/dropdown-input.component';
import { DemoDropdownInputService } from './demo-dropdown-service/demo-dropdown-input.service';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

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
    FooComponent,
    DragAndDropComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  entryComponents: [
    NavigationLink,
    MenuInput,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
