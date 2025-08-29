import { expect } from '@open-wc/testing';
import './button';

describe('ForgeButton Component Import', () => {
  it('should register custom element', () => {
    const button = document.createElement('forge-button');
    expect(button).to.exist;
    expect(button.tagName.toLowerCase()).to.equal('forge-button');
  });
});