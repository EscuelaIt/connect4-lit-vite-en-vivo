import { LitElement, html, css } from 'lit';

export class C4Message extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            p {
                margin: 0;
            }
        `
    ];

    static get properties() {
      return {
        message: { type: String }
      };
    }

    constructor() {
        super();
        document.addEventListener('new-message', (e) => this.showMessage(e.detail.message));
        document.addEventListener('append-message', (e) => this.appendMessage(e.detail.message));
    }

    render() {
        return html`
        <p>
            ${this.message}
        </p>
        `;
    }

    showMessage(message) {
        console.log('he escuchado ', message);
        this.message = message;
    }

    appendMessage(message) {
        this.message += ' ' + message;
    }
}
customElements.define('c4-message', C4Message);
