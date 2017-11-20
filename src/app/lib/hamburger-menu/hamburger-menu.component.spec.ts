/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UATHamburgerMenu } from './hamburger-menu.component';

describe('UATHamburgerMenu', () => {
  let component: UATHamburgerMenu;
  let fixture: ComponentFixture<UATHamburgerMenu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UATHamburgerMenu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UATHamburgerMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
