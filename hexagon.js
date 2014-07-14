var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var Xcenter;
var numberOfSides = 6;
var size = 50;
var i;

for (Xcenter = 610; Xcenter < 831; Xcenter += 110) {
    var Ycenter = 360;
    ctx.beginPath();
    ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

    for (i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
}