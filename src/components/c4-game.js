import { LitElement, html, css } from 'lit';
import { Game } from '../models/Game.js';
import './c4-board';
import './c4-player-selector';
import { refreshIcon } from '@dile/icons';
import { gameCSS } from './css/game-css.js';

export class C4Game extends LitElement {
    #game;

    static styles = [
        gameCSS,
    ];

    static get properties() {
      return {
        started: { type: Boolean }
      };
    }

    constructor() {
        super();
        this.#game = new Game();
        this.started = false;
    }


    render() {
        return html`
            <section>
                <header>
                    <h1>Connect <span>4</span></h1>
                    <c4-button .icon=${refreshIcon} white @click=${this.doReset}>Reset</c4-button>
                </header>
                <main>
                    <c4-player-selector
                        class="${this.started ? 'hidden' : ''}"
                        @set-players=${this.doSetPlayers}
                    ></c4-player-selector>
                    <c4-board
                        id="theboard"
                        .game=${this.#game}
                        class="${this.started ? '' : 'hidden'}"
                    ></c4-board>
                </main>
            </section>
            <footer>
                mensajes...
            </footer>
        `;
    }

    get board() {
        return this.shadowRoot.getElementById('theboard');
    }
    
    doSetPlayers(e) {
        console.log(e.detail.numPlayers);
        this.#game.reset(e.detail.numPlayers);
        this.board.buildBoard();
        this.started = true;
    }

    doReset() {
        this.started = false;
    }
}
customElements.define('c4-game', C4Game);
