/* tslint:disable:no-unused-variable */
import { NgZone } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { UATSlidingPanelToggle } from './sliding-panel-toggle.directive';

describe('Directive: UATSlidingPanelToggle', () => {
  it('should create an instance', () => {
    let directive = new UATSlidingPanelToggle(
      TestBed.get(NgZone));
    expect(directive).toBeTruthy();
  });
});
