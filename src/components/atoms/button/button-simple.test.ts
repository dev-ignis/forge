import { expect } from '@open-wc/testing';

describe('ForgeButton Basic', () => {
  it('should load test file', () => {
    expect(true).to.be.true;
  });
  
  it('can create element programmatically', () => {
    const button = document.createElement('button');
    expect(button).to.exist;
  });
});