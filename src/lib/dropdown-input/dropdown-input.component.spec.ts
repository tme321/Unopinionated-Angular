/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATDropdownInput } from './dropdown-input.component';

describe('UATDropdownInput', () => {
  let component: UATDropdownInput;
  let fixture: ComponentFixture<UATDropdownInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATDropdownInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATDropdownInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
