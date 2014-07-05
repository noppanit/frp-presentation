// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var ballsX = [];
var ballsY = [];
var ballsSum = [];


function Ball(number, positionY) {
    this.pos = 400;
    this.render = function() {
        this.pos -= 1;

        context.beginPath();
        context.fillText(number, this.pos - 3, positionY + 20);
        context.arc(this.pos, positionY, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#003300';
        context.stroke();
    };
}

function drawALine(positionX, positionY) {
    context.beginPath();
    context.moveTo(positionX, positionY);
    context.lineTo(400, positionY);
    context.stroke();
}

function drawABall(positionX) {
    context.beginPath();
    context.arc(positionX, 10, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.stroke();
}

function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function animloop() {
    requestAnimFrame(animloop);

    clearScreen();
    drawALine(0, 10);
    drawALine(0, 50);
    drawALine(0, 90);
    for(var i = 0; i < ballsX.length; i++) {
        ballsX[i].render();
    }

    for(var i = 0; i < ballsY.length; i++) {
        ballsY[i].render();
    }

    for(var i = 0; i < ballsSum.length; i++) {
        ballsSum[i].render();
    }

}


var plusX = $("#baconX").asEventStream("click").map(1);
plusX.onValue(function(value) {
  var currentValue = parseInt($("#baconX").text());
  $('#baconX').text(currentValue + 1);
  ballsX.push(new Ball(1, 10));
});

var plusY = $("#baconY").asEventStream("click").map(1);
plusY.onValue(function(value) {
    var currentValue = parseInt($("#baconY").text());
    $('#baconY').text(currentValue + 1);
    ballsY.push(new Ball(1, 50));
});

function sum(x, y) {
    return x + y;
}

var both = plusX.merge(plusY);
both.scan(0, sum).onValue(function(sum) {
    var currentValue = parseInt($("#baconA").text());
    ballsSum.push(new Ball(sum, 90));
    $('#baconA').text(currentValue + 1);
});


animloop();
