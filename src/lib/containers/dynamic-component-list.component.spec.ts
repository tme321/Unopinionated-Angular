/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATDynamicComponentList } from './dynamic-component-list.component';

describe('UATDynamicComponentList', () => {
  let component: UATDynamicComponentList<any>;
  let fixture: ComponentFixture<UATDynamicComponentList<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATDynamicComponentList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATDynamicComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
