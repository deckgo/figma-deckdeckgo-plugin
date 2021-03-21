// Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox

class CheckboxComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    const style: HTMLStyleElement = this.initStyle();
    const container: HTMLLabelElement = this.initCheckboxElement();

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(container);
  }

  connectedCallback() {
    this.className = 'hydrated';
  }

  get checked(): boolean {
    const checkbox: HTMLInputElement | null | undefined = this.shadowRoot?.querySelector('input');
    return checkbox?.checked === true;
  }

  private initStyle(): HTMLStyleElement {
    const style: HTMLStyleElement = document.createElement('style');

    style.innerHTML = `
      :host {
        display: block;
      }
      
      :host([disabled]) {
        pointer-events: none;
      }
      
      :host([disabled]) .container {
        color: var(--bg-primary-btn-disabled);
      }
      
      :host([disabled]) .container input ~ .checkmark {
        border: 1px solid var(--bg-primary-btn-disabled);
      }
      
      :host([disabled]) .container input:checked ~ .checkmark {
        background-color: var(--bg-primary-btn-disabled);
      }
    
      /* The container */
      .container {
        display: block;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        
        padding-right: 16px;
        margin: 16px 0 8px;
        
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        font-size: var(--font-size);
        line-height: var(--line-height);
        color: var(--color);
      }
      
      /* Hide the browser's default checkbox */
      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      
      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 42%;
        right: 0;
        transform: translate(0, -50%);
        height: 10px;
        width: 10px;
        border: 1px solid rgba(0, 0, 0, .8);
        border-radius: 2px;
      }
      
      /* When the checkbox is checked, add a blue background */
      .container input:checked ~ .checkmark {
        background-color: var(--bg-primary-btn);
        border: 1px solid var(--bg-primary-btn);
      }
      
      /* Create the checkmark/indicator (hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
      
      /* Show the checkmark when checked */
      .container input:checked ~ .checkmark:after {
        display: block;
      }
      
      /* Style the checkmark/indicator */
      .container .checkmark:after {
        background-image: url(data:image/svg+xml;utf8,%3Csvg%20fill%3D%22none%22%20height%3D%227%22%20viewBox%3D%220%200%208%207%22%20width%3D%228%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m1.17647%201.88236%201.88235%201.88236%203.76471-3.76472%201.17647%201.17648-4.94118%204.9412-3.05882-3.05884z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
        background-repeat: no-repeat;
        background-position: 0 1px;
        border: 1px solid transparent;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        box-shadow: none;
      }
    `;

    return style;
  }

  private initCheckboxElement(): HTMLLabelElement {
    const container: HTMLLabelElement = document.createElement('label');
    container.className = 'container';

    const slot: HTMLSlotElement = document.createElement('slot');
    container.appendChild(slot);

    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('id', 'checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('checked', 'checked');

    const span: HTMLSpanElement = document.createElement('span');
    span.setAttribute('for', 'checkbox');
    span.className = 'checkmark';

    container.appendChild(input);
    container.appendChild(span);

    return container;
  }
}

customElements.define('deckgo-checkbox', CheckboxComponent);
