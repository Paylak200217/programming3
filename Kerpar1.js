let LivingCreature = require('./LivingCreature')

module.exports = class Kerpar1 extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 5;
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
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num, num2, num3) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num2) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num3) {
                    found.push([x, y]);
                }
            }
        }
        return found;
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
                this.die();
            }
            
        }
    }

    eat() {
        var Cells = this.chooseCell(1, 2, 3);
		var newCell = Cells[Math.floor(Math.random() * Cells.length)]
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.acted = true;
                this.energy++;
                if (this.energy > 10) {
                    this.mul();
                    this.energy = 5;
                }
            }

            else {
                this.move();
            }
        }
    }

     die() {

        var black = this.chooseCell(5);
        
        if(black.length > 0){
                matrix[this.y][this.x] = 0;

            }
        }
    

    mul(){
        var emptyCells = this.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Kerpar1(newX, newY, 4);
            this.energy = 5;
        }
    }

}