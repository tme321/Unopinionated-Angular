import { UATDragAndDropModule } from './drag-and-drop.module';

describe('UATDragAndDropModule', () => {
  let dragAndDropModule: UATDragAndDropModule;

  beforeEach(() => {
    dragAndDropModule = new UATDragAndDropModule();
  });

  it('should create an instance', () => {
    expect(dragAndDropModule).toBeTruthy();
  });
});
