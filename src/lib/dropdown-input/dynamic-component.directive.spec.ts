/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { UATDynamicComponentDirective } from './dynamic-component.directive';
import {
    ComponentFactoryResolver,
    ViewContainerRef } from '@angular/core';

describe('Directive: UATDynamicComponentDirective', () => {
  it('should create an instance', () => {
    let directive = new UATDynamicComponentDirective(
      TestBed.get(ViewContainerRef), 
      TestBed.get(ComponentFactoryResolver));
    expect(directive).toBeTruthy();
  });
});
