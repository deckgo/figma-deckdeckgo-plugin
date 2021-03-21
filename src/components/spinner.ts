// Source: https://loading.io/css/

class SpinnerComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        const style: HTMLStyleElement = this.initStyle();
        const div: HTMLDivElement = this.initSpinnerElement();

        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(div);
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
      
      .lds-ring {
          display: inline-block;
          position: relative;
          width: 36px;
          height: 36px;
        }
        .lds-ring div {
          box-sizing: border-box;
          display: block;
          position: absolute;
          width: calc(100% - 16px);
          height: calc(100% - 16px);
          margin: 8px;
          border: 2px solid #fff;
          border-radius: 50%;
          animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          border-color: #fff transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
          animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
          animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
          animation-delay: -0.15s;
        }
        @keyframes lds-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
    `;

        return style;
    }

    private start() {
        this.classList.add('running');
    }

    private initSpinnerElement(): HTMLDivElement {
        const div: HTMLDivElement = document.createElement('div');
        div.className = 'lds-ring';

        div.appendChild(document.createElement('div'));
        div.appendChild(document.createElement('div'));
        div.appendChild(document.createElement('div'));
        div.appendChild(document.createElement('div'));

        return div;
    }
}

customElements.define('deckgo-spinner', SpinnerComponent);
