/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATDynamicComponentContainer } from './dynamic-component-container.component';

describe('UATDynamicComponentContainer', () => {
  let component: UATDynamicComponentContainer;
  let fixture: ComponentFixture<UATDynamicComponentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATDynamicComponentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATDynamicComponentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
