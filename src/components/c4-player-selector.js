import { LitElement, html, css } from 'lit';
import './ui/c4-button';

export class C4PlayerSelector extends LitElement {
    static styles = [
        css`
            :host {
                max-width: 460px;
                display: block;
                color: #fff;
                padding: 1rem;
            }
            h1 {
                font-weight: 300;
            }
            ul {
                margin: 0;
                padding: 0;
            }
            li {
                display: inline-block;
                padding: 0;
                margin: 0.5rem;
                list-style-type: none;
            }
            li:first-child {
                margin-left: 0;
            }
        `
    ];

    render() {
        return html`
            <h1>Select number of players</h1>
            <ul>
                <li><c4-button @click=${this.setPlayers(1)}>One Player</c4-button></li>
                <li><c4-button @click=${this.setPlayers(2)}>Two Players</c4-button></li>
                <li><c4-button @click=${this.setPlayers(0)}>Demo (Machine vs Machine)</c4-button></li>
            </ul>
        `;
    }

    // setOnePlayer() {
    //     this.setPlayers(1);
    // }
    // setTwoPlayers() {
    //     this.setPlayers(2);
    // }
    // setDemo() {
    //     this.setPlayers(0);
    // }
    
    setPlayers(numPlayers) {
        return function(numPlayers) {
            this.dispatchEvent(new CustomEvent('set-players', {
                // bubbles: true,
                // composed: true, 
                detail: {
                    numPlayers
                }
            }));
        }
    }
}
customElements.define('c4-player-selector', C4PlayerSelector);
