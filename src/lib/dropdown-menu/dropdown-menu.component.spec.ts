/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATDropdownMenu } from './dropdown-menu.component';

describe('UATDropdownMenu', () => {
  let component: UATDropdownMenu;
  let fixture: ComponentFixture<UATDropdownMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATDropdownMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATDropdownMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
