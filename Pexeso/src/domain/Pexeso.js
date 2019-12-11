
import {Pair} from "./models/Pair.js";
import {Field} from "./models/Field.js";

export class Pexeso {


    /**
     * @param {number} rows
     */

    constructor(rows, columns) {

        this.rows = rows;
        this.columns = columns;

        let maxId = (this.rows * this.columns) / 2;
        let idsArray = [];
        for (let i = 0; i < maxId; i++) {
            idsArray.push(i);
            idsArray.push(i);
        }

        this.pair = new Pair(null, null);
        this.pexesofield = [];
        for (let i = 0; i < rows; i++) {
            let tempArray = [];
            for (let j = 0; j < columns; j++) {
                let tmp = Math.floor(Math.random() * idsArray.length);
                tempArray.push(new Field(0, idsArray[tmp]));
                idsArray.splice(tmp, 1);
            }
            this.pexesofield.push(tempArray);
        }
    }
    /**
     * TODO: IMPLEMENT THIS
     * Returns the current state of the field.
     * Fields can be: hidden, visible, flagged or question marked.
     * @param {number} x
     * @param {number} y
     * @return {field}
     */
    getField(x, y) {
        return this.pexesofield[x][y];


    }


    /**
     * TODO: IMPLEMENT THIS
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {
        if (this.pair.cell1 === null && this.pair.cell2 === null) {
            this.pair.cell1 = this.pexesofield[x][y].id;
            this.pexesofield[x][y].state = 1;
        } else if (this.pair.cell2 === null) {
            this.pair.cell2 = this.pexesofield[x][y].id;
            this.pexesofield[x][y].state = 1;
        }

        if (this.pair.IsPairEqual()) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    if (this.pexesofield[i][j] === this.pair.cell1) {
                        this.pexesofield[i][j].state = 2;
                    }
                }
            }
        } else {
            this.clearPair(); // todo set timeout
        }
        this.pair.cell1 = null;
        this.pair.cell2 = null;
    }

    clearPair(){
        for(let i = 0; i < this.rows;i++){
            for(let j = 0; j < this.columns; j++){
                if(this.pexesofield[i][j].id === this.pair.cell1 || this.pexesofield[i][j].id === this.pair.cell2 ){
                    this.pexesofield[i][j].state = 0;
                }
            }
        }
    }


    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.pexesofield[i][j].state === 0) {
                    return false;
                }
            }
        }
        return true;
    }
}



