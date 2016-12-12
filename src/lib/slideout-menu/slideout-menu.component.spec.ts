/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATSlideoutMenu } from './slideout-menu.component';

describe('UATSlideoutMenu', () => {
  let component: UATSlideoutMenu;
  let fixture: ComponentFixture<UATSlideoutMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATSlideoutMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATSlideoutMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
