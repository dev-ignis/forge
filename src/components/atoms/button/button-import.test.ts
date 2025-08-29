import { expect } from '@open-wc/testing';
import { BaseElement } from '../../../core/BaseElement';

describe('ForgeButton Import Test', () => {
  it('should import BaseElement', () => {
    expect(BaseElement).to.exist;
  });
});