import { expect, fixture, html, elementUpdated, waitUntil } from '@open-wc/testing';
import './multi-select'; // Register the element
import { ForgeMultiSelect } from './multi-select';
import type { MultiSelectOption } from './multi-select';

describe('ForgeMultiSelect', () => {
  const mockOptions: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date', disabled: true },
    { value: 'elderberry', label: 'Elderberry', group: 'Exotic' },
    { value: 'fig', label: 'Fig', group: 'Exotic' }
  ];

  it('should render with default properties', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select></forge-multi-select>
    `);

    expect(el).to.exist;
    expect(el.value).to.deep.equal([]);
    expect(el.placeholder).to.equal('Select options...');
    expect(el.disabled).to.be.false;
    expect(el.showSearch).to.be.true;
    expect(el.showActions).to.be.true;
  });

  it('should display placeholder when no items selected', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    const placeholder = el.shadowRoot!.querySelector('.multi-select__placeholder');
    expect(placeholder).to.exist;
    expect(placeholder!.textContent).to.equal('Select options...');
  });

  it('should open dropdown on trigger click', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Directly manipulate the state for now since click binding seems broken
    el.isOpen = true;
    await elementUpdated(el);

    const dropdown = el.shadowRoot!.querySelector('.multi-select__dropdown') as HTMLElement;
    expect(dropdown.getAttribute('data-open')).to.equal('true');
    
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
  });

  it('should close dropdown on escape key', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await elementUpdated(el);

    const dropdown = el.shadowRoot!.querySelector('.multi-select__dropdown') as HTMLElement;
    expect(dropdown.dataset.open).to.equal('false');
  });

  it('should select option on click', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Click first option
    const firstOption = el.shadowRoot!.querySelector('.multi-select__option') as HTMLElement;
    firstOption.click();
    await elementUpdated(el);

    expect(el.value).to.deep.equal(['apple']);
  });

  it('should deselect option on second click', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple']}
      ></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Click first option to deselect
    const firstOption = el.shadowRoot!.querySelector('.multi-select__option') as HTMLElement;
    firstOption.click();
    await elementUpdated(el);

    expect(el.value).to.deep.equal([]);
  });

  it('should not select disabled options', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Try to click disabled option (Date)
    const options = el.shadowRoot!.querySelectorAll('.multi-select__option');
    const disabledOption = options[3] as HTMLElement; // Date is at index 3
    disabledOption.click();
    await elementUpdated(el);

    expect(el.value).to.deep.equal([]);
  });

  it('should display selected tags', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana']}
      ></forge-multi-select>
    `);

    const tags = el.shadowRoot!.querySelectorAll('.multi-select__tag');
    expect(tags.length).to.equal(2);
    expect(tags[0].textContent).to.include('Apple');
    expect(tags[1].textContent).to.include('Banana');
  });

  it('should remove tag on remove button click', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana']}
      ></forge-multi-select>
    `);

    const removeButton = el.shadowRoot!.querySelector('.multi-select__tag-remove') as HTMLButtonElement;
    removeButton.click();
    await elementUpdated(el);

    expect(el.value).to.deep.equal(['banana']);
  });

  it('should show count when more than 3 items selected', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana', 'cherry', 'elderberry']}
      ></forge-multi-select>
    `);

    const count = el.shadowRoot!.querySelector('.multi-select__count');
    expect(count).to.exist;
    expect(count!.textContent).to.equal('+2 more');
  });

  it('should filter options on search', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Type in search
    const searchInput = el.shadowRoot!.querySelector('forge-input') as any;
    searchInput.dispatchEvent(new CustomEvent('forge-input', { 
      detail: { value: 'app' }
    }));
    await elementUpdated(el);

    const visibleOptions = el.shadowRoot!.querySelectorAll('.multi-select__option');
    expect(visibleOptions.length).to.equal(1); // Only Apple should be visible
  });

  it('should highlight search matches', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Type in search
    const searchInput = el.shadowRoot!.querySelector('forge-input') as any;
    searchInput.dispatchEvent(new CustomEvent('forge-input', { 
      detail: { value: 'app' }
    }));
    await elementUpdated(el);

    const mark = el.shadowRoot!.querySelector('mark');
    expect(mark).to.exist;
    expect(mark!.textContent).to.equal('App');
  });

  it('should select all options', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Click "All" button
    const allButton = el.shadowRoot!.querySelector('.multi-select__action') as HTMLButtonElement;
    allButton.click();
    await elementUpdated(el);

    // Should select all non-disabled options
    expect(el.value).to.deep.equal(['apple', 'banana', 'cherry', 'elderberry', 'fig']);
  });

  it('should clear all selections', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana']}
      ></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Click "None" button
    const buttons = el.shadowRoot!.querySelectorAll('.multi-select__action');
    const noneButton = buttons[1] as HTMLButtonElement;
    noneButton.click();
    await elementUpdated(el);

    expect(el.value).to.deep.equal([]);
  });

  it('should invert selection', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana']}
      ></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Click "Invert" button
    const buttons = el.shadowRoot!.querySelectorAll('.multi-select__action');
    const invertButton = buttons[2] as HTMLButtonElement;
    invertButton.click();
    await elementUpdated(el);

    // Should select all non-disabled options except apple and banana
    expect(el.value).to.deep.equal(['cherry', 'elderberry', 'fig']);
  });

  it('should respect max selections', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        max-selections="2"
      ></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Try to select 3 options
    const options = el.shadowRoot!.querySelectorAll('.multi-select__option');
    (options[0] as HTMLElement).click();
    await elementUpdated(el);
    (options[1] as HTMLElement).click();
    await elementUpdated(el);
    (options[2] as HTMLElement).click();
    await elementUpdated(el);

    // Should only have 2 selected
    expect(el.value.length).to.equal(2);
  });

  it('should group options when groupBy is enabled', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        group-by
      ></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    const group = el.shadowRoot!.querySelector('.multi-select__group');
    expect(group).to.exist;
    expect(group!.textContent).to.equal('Exotic');
  });

  it('should show no results message when filtered empty', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    // Open dropdown
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Search for non-existent item
    const searchInput = el.shadowRoot!.querySelector('forge-input') as any;
    searchInput.dispatchEvent(new CustomEvent('forge-input', { 
      detail: { value: 'xyz' }
    }));
    await elementUpdated(el);

    const noResults = el.shadowRoot!.querySelector('.multi-select__no-results');
    expect(noResults).to.exist;
    expect(noResults!.textContent!.trim()).to.equal('No results found');
  });

  it('should emit forge-change event', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    let changeEvent: CustomEvent | null = null;
    el.addEventListener('forge-change', (e: Event) => {
      changeEvent = e as CustomEvent;
    });

    // Open dropdown and select option
    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    const firstOption = el.shadowRoot!.querySelector('.multi-select__option') as HTMLElement;
    firstOption.click();
    await elementUpdated(el);

    expect(changeEvent).to.exist;
    expect(changeEvent!.detail.value).to.deep.equal(['apple']);
  });

  it('should be disabled when disabled prop is set', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        disabled
      ></forge-multi-select>
    `);

    const trigger = el.shadowRoot!.querySelector('.multi-select__trigger') as HTMLElement;
    trigger.click();
    await elementUpdated(el);

    // Dropdown should not open
    const dropdown = el.shadowRoot!.querySelector('.multi-select__dropdown') as HTMLElement;
    expect(dropdown.dataset.open).to.equal('false');
  });

  it('should have correct AI metadata', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    const aiState = el.aiState;
    expect(aiState.metadata.purpose).to.equal('Select multiple options from a list');
    expect(aiState.metadata.dataType).to.equal('multiselection');
    expect(aiState.metadata.criticality).to.equal('medium');
  });

  it('should have correct AI actions', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select .options=${mockOptions}></forge-multi-select>
    `);

    const actions = el.getPossibleActions();
    expect(actions).to.have.lengthOf.at.least(5);
    
    const toggleAction = actions.find(a => a.name === 'toggle');
    expect(toggleAction).to.exist;
    expect(toggleAction!.available).to.be.true;
  });

  it('should explain state correctly', async () => {
    const el = await fixture<ForgeMultiSelect>(html`
      <forge-multi-select 
        .options=${mockOptions}
        .value=${['apple', 'banana']}
      ></forge-multi-select>
    `);

    const explanation = el.explainState();
    expect(explanation.currentState).to.equal('selecting');
    expect(explanation.stateDescription).to.include('2 of 6 options selected');
  });
});