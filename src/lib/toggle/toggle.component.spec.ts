/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATToggle } from './toggle.component';

describe('UATToggle', () => {
  let component: UATToggle;
  let fixture: ComponentFixture<UATToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATToggle ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
