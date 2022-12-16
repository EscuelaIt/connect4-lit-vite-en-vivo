import { LitElement, html, css } from 'lit';
import { Game } from '../models/Game.js';
import './c4-board';
import './c4-message';
import './c4-turn';
import './c4-player-selector';
import { refreshIcon } from '@dile/icons';
import { gameCSS } from './css/game-css.js';
import { Message } from '../views/Message.js';

export class C4Game extends LitElement {
    #game;
    #waitForUserInput;

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
        this.#waitForUserInput = false;
    }

    firstUpdated() {
        Message.TITLE.write();
        // this.shadowRoot.querySelector('c4-turn').addEventListener('machine-player-column',
        //     (e) => { console.log(e); }
        // );
    }

    render() {
        return html`
            <section>
                <header>
                    <h1>Connect <span>4</span></h1>
                    <c4-button .icon=${refreshIcon} white @click=${this.doReset}>Reset</c4-button>
                    <c4-turn
                        id="theturn"
                        .game=${this.#game}
                        @machine-player-column=${this.doMachineColumnSelected}
                        @wait-for-user-input=${this.doWaitForUserInput}
                    ></c4-turn>
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
                        @column-selected=${this.doUserColumnSelected}
                    ></c4-board>
                </main>
            </section>
            <footer>
                <c4-message></c4-message>
            </footer>
        `;
    }

    get board() {
        return this.shadowRoot.getElementById('theboard');
    }

    get turn() {
        return this.shadowRoot.getElementById('theturn');
    }

    doSetPlayers(e) {
        console.log('setear estos jugadores', e.detail.numPlayers);
        this.resetGame(e.detail.numPlayers)
    }

    resetGame(numPlayers) {
        this.#game.reset(numPlayers);
        this.board.updateBoard();
        this.started = true;
        this.turn.dropToken();
    }

    doReset() {
        this.started = false;
    }

    doMachineColumnSelected(e) {
        this.updateBoard(e.detail.player);
    }

    doUserColumnSelected(e) {
        if(this.#waitForUserInput) {
            this.#waitForUserInput = false;
            let column = e.detail.column;
            console.log('columna: ', column);
            let player = this.#game.getActivePlayer();
            player.dropToken(column);
            this.updateBoard(player);
        }
    }

    updateBoard(player) {
        this.board.updateBoard();
        if(this.#game.isFinished()) {
            let messageText = Message.PLAYER_WIN.toString();
            messageText = messageText.replace(`#color`, player.getColor().toString());
            (new Message(messageText)).write();
        } else {
            this.#game.next();
            this.turn.dropToken();
        }
    }

    doWaitForUserInput() {
        this.#waitForUserInput = true;
    }
}
customElements.define('c4-game', C4Game);
