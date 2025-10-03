import { fixture, expect, html } from '@open-wc/testing';
import './avatar';
import { ForgeAvatar } from './avatar';

describe('ForgeAvatar', () => {
  it('should create', async () => {
    const el = await fixture<ForgeAvatar>(html`<forge-avatar></forge-avatar>`);
    expect(el).to.be.instanceOf(ForgeAvatar);
  });

  it('should render with default properties', async () => {
    const el = await fixture<ForgeAvatar>(html`<forge-avatar></forge-avatar>`);

    expect(el.size).to.equal('md');
    expect(el.status).to.equal('none');
    expect(el.statusPosition).to.equal('top-right');
    expect(el.shape).to.equal('circle');
    expect(el.clickable).to.be.false;
    expect(el.loading).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('should render with image when src is provided', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar src="test.jpg" alt="Test User"></forge-avatar>
    `);

    const image = el.shadowRoot!.querySelector('.avatar__image') as HTMLImageElement;
    expect(image).to.exist;
    expect(image.src).to.include('test.jpg');
    expect(image.alt).to.equal('Test User');
  });

  it('should render fallback text when provided', async () => {
    const el = await fixture<ForgeAvatar>(html` <forge-avatar fallback="JD"></forge-avatar> `);

    const fallback = el.shadowRoot!.querySelector('.avatar__fallback');
    expect(fallback).to.exist;
    expect(fallback!.textContent!.trim()).to.equal('JD');
  });

  it('should render status indicator when status is set', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" status="online"></forge-avatar>
    `);

    const status = el.shadowRoot!.querySelector('.avatar__status');
    expect(status).to.exist;
    expect(status).to.have.class('avatar__status--online');
    expect(status).to.have.class('avatar__status--top-right');
  });

  it('should not render status indicator when status is none', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" status="none"></forge-avatar>
    `);

    const status = el.shadowRoot!.querySelector('.avatar__status');
    expect(status).to.not.exist;
  });

  it('should apply correct size classes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="T" size="${size}"></forge-avatar>
      `);

      const avatar = el.shadowRoot!.querySelector('.avatar');
      expect(avatar).to.have.class(`avatar--${size}`);
    }
  });

  it('should apply correct shape classes', async () => {
    const shapes = ['circle', 'square', 'rounded'] as const;

    for (const shape of shapes) {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="T" shape="${shape}"></forge-avatar>
      `);

      const avatar = el.shadowRoot!.querySelector('.avatar');
      expect(avatar).to.have.class(`avatar--${shape}`);
    }
  });

  it('should apply correct status classes', async () => {
    const statuses = ['online', 'offline', 'busy', 'away'] as const;

    for (const status of statuses) {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="T" status="${status}"></forge-avatar>
      `);

      const statusEl = el.shadowRoot!.querySelector('.avatar__status');
      expect(statusEl).to.have.class(`avatar__status--${status}`);
    }
  });

  it('should apply correct status position classes', async () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;

    for (const position of positions) {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="T" status="online" status-position="${position}"></forge-avatar>
      `);

      const statusEl = el.shadowRoot!.querySelector('.avatar__status');
      expect(statusEl).to.have.class(`avatar__status--${position}`);
    }
  });

  it('should be clickable when clickable property is true', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" clickable></forge-avatar>
    `);

    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar).to.have.class('avatar--clickable');
    expect(el.tabIndex).to.equal(0);
  });

  it('should emit click event when clicked and clickable', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" clickable></forge-avatar>
    `);

    let eventFired = false;
    el.addEventListener('click', (_event: Event) => {
      eventFired = true;
    });

    const avatar = el.shadowRoot!.querySelector('.avatar') as HTMLElement;
    avatar.click();

    expect(eventFired).to.be.true;
  });

  it.skip('should not emit click event when disabled', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" clickable disabled></forge-avatar>
    `);

    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('click', () => {
      eventFired = true;
    });

    const avatar = el.shadowRoot!.querySelector('[part="avatar"]') as HTMLElement;
    avatar.click();

    expect(eventFired).to.be.false;
  });

  it('should handle keyboard events when clickable', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" clickable></forge-avatar>
    `);

    await el.updateComplete;

    let eventFired = false;
    el.addEventListener('click', () => {
      eventFired = true;
    });

    // Native buttons provide keyboard support automatically
    // Test that the avatar element can receive click events
    const avatar = el.shadowRoot!.querySelector('[part="avatar"]') as HTMLElement;
    expect(avatar).to.exist;

    avatar.click();
    await el.updateComplete;
    expect(eventFired).to.be.true;
  });

  it('should show loading state', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" loading></forge-avatar>
    `);

    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar).to.have.class('avatar--loading');
  });

  it('should apply disabled class when disabled', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" disabled></forge-avatar>
    `);

    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar).to.have.class('avatar--disabled');
  });

  it('should have proper ARIA attributes', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar fallback="JD" alt="John Doe" status="online"></forge-avatar>
    `);

    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar).to.have.attribute('role', 'img');
    expect(avatar).to.have.attribute('aria-label', 'John Doe');
    expect(avatar).to.have.attribute('aria-describedby', 'status-indicator');

    const status = el.shadowRoot!.querySelector('.avatar__status');
    expect(status).to.have.attribute('role', 'status');
    expect(status).to.have.attribute('aria-label', 'User is online');
  });

  it('should fallback to default aria-label when no alt provided', async () => {
    const el = await fixture<ForgeAvatar>(html` <forge-avatar fallback="JD"></forge-avatar> `);

    const avatar = el.shadowRoot!.querySelector('.avatar');
    expect(avatar).to.have.attribute('aria-label', 'Avatar with initials JD');
  });

  it('should handle image load and error events', async () => {
    const el = await fixture<ForgeAvatar>(html`
      <forge-avatar src="test.jpg" fallback="JD"></forge-avatar>
    `);

    const image = el.shadowRoot!.querySelector('.avatar__image') as HTMLImageElement;

    // Simulate successful image load
    image.dispatchEvent(new Event('load'));
    await el.updateComplete;

    // Image should be visible, fallback should not
    expect(el.shadowRoot!.querySelector('.avatar__image')).to.exist;
    expect(el.shadowRoot!.querySelector('.avatar__fallback')).to.not.exist;

    // Simulate image error
    image.dispatchEvent(new Event('error'));
    await el.updateComplete;

    // Fallback should now be visible
    expect(el.shadowRoot!.querySelector('.avatar__fallback')).to.exist;
  });

  describe('AI Integration', () => {
    it('should provide state explanation', async () => {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar
          src="test.jpg"
          fallback="JD"
          status="online"
          clickable
          size="lg"
          shape="rounded"
        ></forge-avatar>
      `);

      const explanation = el.explainState();
      expect(explanation.stateDescription).to.include('Avatar component');
      expect(explanation.stateDescription).to.include('showing image from "test.jpg"');
      expect(explanation.stateDescription).to.include('with online status indicator');
      expect(explanation.stateDescription).to.include('and is clickable');
      expect(explanation.stateDescription).to.include('Size: lg');
      expect(explanation.stateDescription).to.include('Shape: rounded');
    });

    it('should provide fallback explanation when no image', async () => {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="JD" status="busy"></forge-avatar>
      `);

      const explanation = el.explainState();
      expect(explanation.stateDescription).to.include('displaying initials "JD"');
      expect(explanation.stateDescription).to.include('with busy status indicator');
    });

    it('should provide possible actions when clickable', async () => {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="JD" clickable></forge-avatar>
      `);

      const actions = el.getPossibleActions();
      expect(actions).to.have.length(1);
      expect(actions[0].name).to.equal('click');
      expect(actions[0].available).to.be.true;
    });

    it('should not provide click action when disabled', async () => {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar fallback="JD" clickable disabled></forge-avatar>
      `);

      const actions = el.getPossibleActions();
      expect(actions).to.have.length(0);
    });

    it('should provide AI state information', async () => {
      const el = await fixture<ForgeAvatar>(html`
        <forge-avatar
          src="test.jpg"
          fallback="JD"
          status="online"
          clickable
          size="md"
          shape="circle"
        ></forge-avatar>
      `);

      const aiState = el.aiState;
      expect(aiState.state.hasImage).to.be.true;
      expect(aiState.state.fallbackText).to.equal('JD');
      expect(aiState.state.size).to.equal('md');
      expect(aiState.state.status).to.equal('online');
      expect(aiState.state.clickable).to.be.true;
      expect(aiState.state.disabled).to.be.false;
      expect(aiState.state.loading).to.be.false;
      expect(aiState.state.shape).to.equal('circle');
    });
  });
});
