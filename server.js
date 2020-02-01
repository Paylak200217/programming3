var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var matrix = [];
n = 30;
m = 30;

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = Math.floor(Math.random() * 6);
    }
}

io.sockets.emit('send matrix', matrix)

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Gishatich = require("./Gishatich")
Kerpar1 = require("./Kerpar1")
Kerpar2 = require("./Kerpar2")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = new Grass(x, y, 1);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = new GrassEater(x, y, 2);
            }
            else if (matrix[y][x] == 3){
                matrix[y][x] = new Gishatich(x, y , 3);
            }
             else if (matrix[y][x] == 4){
                matrix[y][x] = new Kerpar1(x, y , 4);
            }
            else if (matrix[y][x] == 5){
                matrix[y][x] = new Kerpar2(x, y , 5);
            }
        }
    }
   
    io.sockets.emit('send matrix', matrix)


}

function game() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
           if (matrix[y][x].index == 1) {
                matrix[y][x].mul();
            }
            else if (matrix[y][x].index == 2) {
                matrix[y][x].eat();
            }
            else if (matrix[y][x].index == 3){
                matrix[y][x].eat();
            }
            else if (matrix[y][x].index == 4){
                matrix[y][x].eat();
            }
            else if (matrix[y][x].index == 5){
                matrix[y][x].move();
            }
        }
    }
    
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

// io.on('connection', function (socket) {
//     createObject(matrix)
// })