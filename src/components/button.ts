class ButtonComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    const style: HTMLStyleElement = this.initStyle();
    const button: HTMLButtonElement = this.initButtonElement();

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(button);
  }

  connectedCallback() {
    this.className = 'hydrated';
  }

  private initStyle(): HTMLStyleElement {
    const style: HTMLStyleElement = document.createElement('style');

    style.innerHTML = `
      :host {
        display: block;
      }
      
      button.running {
        --spinner-display: block;
        --span-display: none;
        
        pointer-events: none;
      }
    
      button {
        color: #fff;
        background-color: var(--bg-primary-btn);
        border-color: transparent;
        background-clip: border-box;
        font-weight: var(--font-weight);
        box-sizing: border-box;
        border-radius: 6px;
        padding: 0 10px;
        line-height: 30px;
        font-size: var(--font-size);
        letter-spacing: .053px;
        font-family: var(--font-family);
        height: 34px;
        width: 74px;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
      }
      
      span {
        display: var(--span-display, block);
      }
      
      deckgo-spinner {
        display: var(--spinner-display, none);
      }
    `;

    return style;
  }

  private start() {
    this.classList.add('running');
  }

  private initButtonElement(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.addEventListener('click', this.start);

    const span: HTMLSpanElement = document.createElement('span');

    const slot: HTMLSlotElement = document.createElement('slot');
    span.appendChild(slot);

    button.appendChild(span);

    const spinner: HTMLElement = document.createElement('deckgo-spinner');
    button.appendChild(spinner);

    return button;
  }
}

customElements.define('deckgo-button', ButtonComponent);
