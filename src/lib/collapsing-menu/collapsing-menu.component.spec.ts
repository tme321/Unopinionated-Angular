/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATCollapsingMenu } from './collapsing-menu.component';

describe('UATCollapsingMenu', () => {
  let component: UATCollapsingMenu;
  let fixture: ComponentFixture<UATCollapsingMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATCollapsingMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATCollapsingMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
