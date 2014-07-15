var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var xCenter = [520, 620, 720, 820, 920];
var yCenter = [360, 310, 260];
var numberOfSides = 6;
var size = 50;
var i;

var x,
    y;

for (x = 0; x < xCenter.length; x += 1) {
    for (y = 0; y < yCenter.length; y += 1) {
        ctx.beginPath();
        ctx.moveTo(xCenter[x] +  size * Math.cos(0), yCenter[y] +  size *  Math.sin(0));

        for (i = 1; i <= numberOfSides; i += 1) {
            ctx.lineTo(xCenter[x] + size * Math.cos(i * 2 * Math.PI / numberOfSides), yCenter[y] + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        }

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}