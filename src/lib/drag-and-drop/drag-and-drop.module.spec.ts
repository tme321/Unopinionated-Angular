import { DragAndDropModule } from './drag-and-drop.module';

describe('DragAndDropModule', () => {
  let dragAndDropModule: DragAndDropModule;

  beforeEach(() => {
    dragAndDropModule = new DragAndDropModule();
  });

  it('should create an instance', () => {
    expect(dragAndDropModule).toBeTruthy();
  });
});
