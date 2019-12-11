import {Pexeso} from "../domain/Pexeso.js";
// noinspection ES6UnusedImports
import {Field} from "../domain/models/Field.js";

export class PexesoGui {
    /**
     * @param {HTMLElement} container
     * @param {string} rows
     */
    constructor(container,columns, rows) {
        let pismenka = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F","F"];
        this.container = container;
        this.game = new Pexeso(pismenka);
    }

    /**
     * Generates the UI grid
*/
    draw() {

        /*this._clear();
        const container = document.createElement('div');
        const header = document.createElement('h2');
        const smallHeader = document.createElement('h3');
        const table = document.createElement('table');*/

        /*this.createGameField(table);
        this.container.appendChild(header);
        this.container.appendChild(smallHeader);
        this.container.appendChild(table);*/

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


    _getIcon(x, y) {
        switch (this.game.getField(y, x).state) {
            case 0:
                console.log("aaaaaaaa");
                return '<div class="hidden">&nbsp;</div>';
            case 1:
                return `
                        <div class="empty">
                            ${this.game.getField(y, x).id}
                        </div>`;
            case 2:
                return `<div class="revealed">
                            ${this.game.getField(y, x).id}
                        </div>`;
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
}



