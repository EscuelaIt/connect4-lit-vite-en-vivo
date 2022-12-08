import { css } from 'lit';

export const gameCSS = css`
    :host {
        width: 100%;
        --primary-color: #09A5FF;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }
    .hidden {
        display: none;
    }
    section {
        display: flex;
        flex-direction: column;
        background-color: var(--primary-color);
        align-items: stretch;
        width: 100%;
        min-height: 150px;
        flex-grow: 1;
    }
    header {
        padding: 1rem;
        background-color: #31343D;
        color: #fff;
        min-width: 200px;
    }
    main {
        flex-grow: 1;
    }
    h1 { 
        font-size: 1.5rem;
        letter-spacing: 0.075em;
    }
    h1 span {
        color: var(--primary-color);
    }
    footer {
        padding: 0.5rem 1rem;
        background-color: #ddd;
    }
    @media(min-width: 635px) {
        section {
            flex-direction: row;
        }
    }
`