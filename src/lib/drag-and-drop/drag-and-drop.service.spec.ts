import { TestBed, inject } from '@angular/core/testing';

import { UATDragAndDropService } from './drag-and-drop.service';

describe('UATDragAndDropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UATDragAndDropService]
    });
  });

  it('should be created', inject([UATDragAndDropService], (service: DragAndDropService) => {
    expect(service).toBeTruthy();
  }));
});
