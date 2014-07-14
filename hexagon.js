var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var numberOfSides = 6;
var Xcenter = 720;
var Ycenter = 360;
var size = 50;
var i;

ctx.beginPath();
ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));

for (i = 1; i <= numberOfSides; i += 1) {
	ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
}

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.stroke();
 
