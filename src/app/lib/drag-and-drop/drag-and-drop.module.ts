import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UATDragAndDropContainerComponent } from './drag-and-drop-container/drag-and-drop-container.component';
import { UATDraggableDirective } from './draggable/draggable.directive';
import { UATDragAndDropService } from './drag-and-drop.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UATDragAndDropContainerComponent,
    UATDraggableDirective
  ],
  exports: [
    UATDragAndDropContainerComponent,
    UATDraggableDirective
  ],
  providers: [UATDragAndDropService]
})
export class UATDragAndDropModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UATDragAndDropModule,
      providers: []
    };
  }
 }
