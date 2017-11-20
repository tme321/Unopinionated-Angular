import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CollapsingMenuColorWidgetComponent } from './collapsing-menu-color-widget/collapsing-menu-color-widget.component';
import { DropdownMenuColorWidgetComponent } from './dropdown-menu-color-widget/dropdown-menu-color-widget.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'collapsing', component: CollapsingMenuColorWidgetComponent },
    { path: 'dropdown', component: DropdownMenuColorWidgetComponent },
    { path: 'draganddrop', component: DragAndDropComponent }
];

export const appRoutingProviders: any[] = [
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);