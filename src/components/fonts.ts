// TODO fetch(`https://app.deckdeckgo.com/assests/assets.json`) at build time
const FONT_FAMILIES: string[] = [
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Cabin',
  'Lato',
  'Muli',
  'Source Sans Pro',
  'Libre Baskerville',
  'Oswald',
  'Jura',
  'Fjord One',
  'Josefin Slab'
];

class FontsComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    const style: HTMLStyleElement = this.initStyle();
    const div: HTMLDivElement = this.initSelectElement();

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(div);
  }

  connectedCallback() {
    this.className = 'hydrated';
  }

  static get observedAttributes() {
    return ['disabled'];
  }

  get value(): string | undefined {
    const select: HTMLSelectElement | undefined | null = this.shadowRoot?.querySelector('select');
    return select?.value;
  }

  set value(val: string | undefined) {
    const select: HTMLSelectElement | undefined | null = this.shadowRoot?.querySelector('select');

    if (select)  {
      select.value = val && FONT_FAMILIES.includes(val) ? val : 'Default';
    }
  }

  attributeChangedCallback(name: string, oldVal: string | undefined, newVal: string | undefined) {
    const select: HTMLSelectElement | undefined | null = this.shadowRoot?.querySelector('select');

    if (newVal === 'disabled') {
      select?.setAttribute('disabled', 'disabled');
      return;
    }

    select?.removeAttribute('disabled');
  }

  private initStyle(): HTMLStyleElement {
    const style: HTMLStyleElement = document.createElement('style');

    style.innerHTML = `
      :host {
        display: block;
      }
      
      :host([disabled]) label, :host([disabled]) select {
        color: var(--bg-primary-btn-disabled);
      }
      
      :host([disabled]) select {
        color: var(--bg-primary-btn-disabled);
      }
      
      label, select {
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        font-size: var(--font-size);
        line-height: var(--line-height);
        color: var(--color);
      }
      
      label {
        margin-right: 4px;
      }
      
      select {
        outline: none;
      }
    `;

    return style;
  }

  private initSelectElement(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');

    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', 'font');

    const slot: HTMLSlotElement = document.createElement('slot');
    label.appendChild(slot);

    div.appendChild(label);

    const select: HTMLSelectElement = document.createElement('select');

    select.appendChild(this.initFont('Default'));
    FONT_FAMILIES.map((font: string) => select.appendChild(this.initFont(font)));

    div.appendChild(select);

    return div;
  }

  private initFont(fontName: string): HTMLOptionElement {
    const option: HTMLOptionElement = document.createElement('option');
    option.setAttribute('value', fontName);
    option.innerHTML = fontName;
    return option;
  }
}

customElements.define('deckgo-fonts', FontsComponent);
