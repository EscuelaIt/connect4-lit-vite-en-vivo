import { LitElement, html, css } from 'lit';
import { Message } from '../views/Message';

export class C4Turn extends LitElement {

    #message;

    static styles = [
        css`
            :host {
                display: block;
                margin-top: 1.2rem;
            }
            main {
                display: flex;
                justify-content: space-between;
                padding: 0 0.6rem 0.3rem 0;
            }
            .player {
                display: flex;
                flex-direction: row;
                margin: 0.4rem 0.2rem;
                align-items: center;
                opacity: 0.2;
            }
            c4-token {
                margin-right: 1rem;
            }
            .active {
                opacity: 1;
            }
            @media(min-width: 635px) {
                main {
                    flex-direction: column;
                }
            }

        `
    ];

    static get properties() {
      return {
        game: { type: Object },
        activeColor: { type: String },
      };
    }

    render() {
        return html`
            <main>
                <article class="player ${this.activeColor === 'Red' ? 'active' : ''}">
                    <c4-token color="R"></c4-token>
                    <span>Red</span>
                </article>
                <article class="player ${this.activeColor === 'Yellow' ? 'active' : ''}">
                    <c4-token color="Y"></c4-token>
                    <span>Yellow</span>
                </article>
            </main>
        `;
    }

    dropToken() {
        let activePlayer = this.game.getActivePlayer();
        this.activeColor = activePlayer.getColor().toString();
        console.log('-----', this.activeColor);
        activePlayer.accept(this);
    }

    visitUserPlayer(userPlayer) {
        Message.TURN.write();
        let message = new Message(userPlayer.getColor().toString());
        message.append();
        Message.ENTER_COLUMN_TO_DROP.append();
        //new UserPlayerView(userPlayer).dropToken();
    }

    visitMachinePlayer(machinePlayer) {
        setTimeout( () => {
            let column = machinePlayer.getColumn();
            machinePlayer.dropToken(column);
            this.dispatchEvent(new CustomEvent('machine-player-column', {
                detail: {
                    index: column,
                    player: machinePlayer,
                }
            }));
        }, 300); 
    }
}
customElements.define('c4-turn', C4Turn);
