import { Directive, Input } from '@angular/core';
import { UATSlidingPanel } from '../sliding-panel/sliding-panel.component';

@Directive({
  selector: '[uat-sliding-panel-focus]',
  host: {
    '(focus)':"onFocus($event)",
    '(blur)':"onBlur($event)"
  }
})
export class UATDropdownInputDirective {
  @Input('uat-sliding-panel-focus') panel: UATSlidingPanel;
  @Input() canShow: boolean = false;

  constructor() { }

  onFocus(e: FocusEvent) {
    if(this.canShow) {
      console.log('showing');
      this.panel.show();
    }
  }

  onBlur(e: FocusEvent) {
    this.panel.hide();
  }


}
