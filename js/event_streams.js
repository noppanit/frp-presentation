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

var loop = 400;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function drawALine() {
    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(400, 10);
    context.stroke();
}

function drawABall(positionX) {
    context.beginPath();
    context.arc(positionX, 10, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function animloop() {
    loop = loop - 1;
    init = requestAnimFrame(animloop);

    clearScreen();
    drawALine();
    drawABall(loop);
}

animloop();


