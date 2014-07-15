var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var coords = [[520, 360], [620, 310], [720, 360], [820, 310], [920, 360], [620, 410], [820, 410]];
var numberOfSides = 6;
var size = 50;
var i;

var pt;

var x,
    y;

for (pt = 0; pt < coords.length; pt += 1) {
    x = coords[pt][0];
    y = coords[pt][1];
    ctx.beginPath();
    ctx.moveTo(x +  size * Math.cos(0), y +  size *  Math.sin(0));

    for (i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    ctx.strokeStyle = "#000000";
    ctx.fillStyle = (Math.random().toString(16) + '000000').slice(2, 8);
    ctx.lineWidth = 2;
    ctx.stroke();
}

