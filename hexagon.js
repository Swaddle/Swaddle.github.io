
//======================================

/*var pt;

var x,
    y;


for (pt = 0; pt < coords.length; pt += 1) {
    x = coords[pt][0];
    y = coords[pt][1];
    ctx.beginPath();
    ctx.moveTo(x +  size * Math.cos(0), y +  size *  Math.sin(0));

    for (i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        ctx.lineJoin;
    }

    ctx.strokeStyle = (Math.random().toString(16) + '000000').slice(2, 8);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fill();
}*/

//======================================

function polygon(nSides, point, size, fill, style) {
    this.nSides = nSides;
    this.point = point;
    this.size = size;
    this.fill = fill || '#AAAAAA';
    this.style = style || '#000000'; 
}

polygon.prototype.draw = function(ctx) {
    var x = this.point[0],
        y = this.point[1];
    ctx.beginPath();
    ctx.moveTo(x +  size * Math.cos(0), y +  size *  Math.sin(0));
    var i;
    for (i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i *            2 * Math.PI / numberOfSides));
    }
    ctx.strokeStyle = this.style;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = this.fill;
    ctx.fill();
}

//======================================

function World(canvas) {
    
    var myWorld = this; 
    this.redraw = false;
    this.objects = [];
    this.selObj = null;
    this.ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mouseover', function(e) {
        var mouse = myWorld.getMouse();
    }, true);

    canvas.addEventListener('onclick', function(e) {
        var mouse = myWorld.getMouse(); 
    }
}
                            
World.prototype.addObject = function(object) {
  this.objects.push(object);
  this.valid = false;
}
    
World.prototype.draw = function() {
    var ctx = this.ctx;
    var objects = this.objects; 
    objects.draw;
    
}
                            
function main() {
    var world = World(document.getElementById("myCanvas"));
    var coords = [[520, 360], [620, 310], [720, 360], [820, 310], [920, 360], [620, 410], [820, 410]];
    
    for (pt = 0; pt < coords.length; pt += 1) {
        world.addObject(new polygon(6, coords[pt], 50, '#fff',(Math.random().toString(16) + '000000').slice(2, 8));
    }
}

