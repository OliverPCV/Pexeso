import {Pexeso} from "../domain/Pexeso.js";
// noinspection ES6UnusedImports
import {Field} from "../domain/models/Field.js";

export class PexesoGui {

    /**
     * @param {HTMLElement} container
     * @param {number} rows
     * @param {number} columns
     * @param {number | null} bombs
    */
    constructor(container, rows, columns) {
        this.container = container;
        this.game = new Pexeso(rows, columns);
    }

    /**
     * Generates the UI grid
*/
    draw() {
        this._clear();

        const container = document.createElement('div');
        const header = document.createElement('h2');
        const smallHeader = document.createElement('h3');


        if (this.game.didWin())
            header.innerHTML = `You (<span class="green">Won</span>)`;
        else
            header.innerHTML = `Game is (<span class="orange">In Progress</span>)`;

        const table = document.createElement('table');

        this.createGameField(table);
        this.container.appendChild(header);
        this.container.appendChild(smallHeader);
        this.container.appendChild(table);
    }
    createGameField(table) {

        for (let i = 0; i < this.game.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.game.columns; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = this._getIcon(i, j);
                cell.addEventListener('click', () => {
                    this.game.reveal(j, i);
                    this.draw();
                });
                cell.addEventListener('contextmenu', (e) => {
                    this.game.toggleFieldState(j, i);
                    this.draw();
                    e.preventDefault()
                });

                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }




    /**
     * Clears the game "canvas"
     * @private
    */
    _clear() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

    /**
     * Selects the correct icon/number and returns it
     * @param {number} x
     * @param {number} y
     * @return {string}
     * @private
        */
    _getIcon(x, y) {
            switch (this.game.getField(y, x)) {
                case field.hidden:
                    return '<div class="hidden">&nbsp;</div>';
                case field.visible:
                    const amount = this.game.getAmountOfSurroundingBombs(y,x); //Return number
                    return `
                        <div class="empty">
                            ${amount === 0 ? ' ' : amount}
                        </div>
                    `;

            }
    }
}



