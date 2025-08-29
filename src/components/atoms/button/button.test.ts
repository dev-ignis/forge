import { fixture, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import './button';
import type { ForgeButton } from './button';

describe('ForgeButton', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Click me</forge-button>
    `);

    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('renders slot content', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Button Text</forge-button>
    `);

    expect(el).to.have.text('Button Text');
  });

  it('emits forge-click event on click', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Click</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.click();

    expect(clickSpy).to.have.been.calledOnce;
    expect(clickSpy.args[0][0].detail).to.deep.equal({
      variant: 'primary',
      size: 'md'
    });
  });

  it('does not emit click when disabled', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button disabled>Disabled</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.click();

    expect(clickSpy).to.not.have.been.called;
  });

  it('supports keyboard activation', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Press</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.focus();
    await sendKeys({ press: 'Enter' });

    expect(clickSpy).to.have.been.calledOnce;
  });

  it('applies correct variant styles', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button variant="danger">Danger</forge-button>
    `);

    const button = el.shadowRoot!.querySelector('.button');
    expect(button).to.have.class('button--danger');
  });

  it('shows loading spinner when loading', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button loading>Loading</forge-button>
    `);

    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).to.exist;
    expect(el.shadowRoot!.querySelector('.button')).to.have.class('button--loading');
  });
});
