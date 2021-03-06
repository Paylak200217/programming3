let LivingCreature = require('./LivingCreature')

module.exports = class Gishatich extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 10;
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1]
        ];
    }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }
   
   move() {
    var emptyCells = this.chooseCell(0);
	var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    if (this.acted == false) {
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.acted = true;
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        }

    }
}

eat() {
    var grassEaterCells = this.chooseCell(1);
	var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]
    if (this.acted == false) {
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.acted = true;
            this.energy+=2;
            if (this.energy > 15) {
                this.mul();
                this.energy = 10;
            }

        }

        else {
            this.move();
        }
    }
}

die() {
    matrix[this.y][this.x] = 0;
}

mul() {
    var emptyCells = this.chooseCell(0);
	var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = new Gishatich(newX, newY, 3);
        this.energy = 10;
    }
}

}
