/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATContentContainer } from './content-container.component';

describe('UATContentContainer', () => {
  let component: UATContentContainer;
  let fixture: ComponentFixture<UATContentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATContentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATContentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
