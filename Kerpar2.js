class Kerpar2 extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
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
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
    }

    move() {
        var newCell = random(this.chooseCell(0));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.kill();
            }
            else{
                this.die();
            }
        }
    }

    kill() {

        var dexinner = this.chooseCell(2);

        if (dexinner.length > 0) {
            for (var i in dexinner) {
                var x = dexinner[i][0];
                var y = dexinner[i][1];
                matrix[y][x] = new Grass(x, y, 1);

            }
        }
    }
    die(){
             matrix[this.y][this.x] = 0;
    }

}