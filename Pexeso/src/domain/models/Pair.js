export class Pair{
    constructor(cell1, cell2){
        this.cell1 = cell1;
        this.cell2 = cell2;
    }
    IsPairEqual() {
        return this.cell1 === this.cell2;
    }

}