/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATSlidingPanel } from './sliding-panel.component';

describe('SlidingPanelComponent', () => {
  let component: UATSlidingPanel;
  let fixture: ComponentFixture<UATSlidingPanel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATSlidingPanel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATSlidingPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
