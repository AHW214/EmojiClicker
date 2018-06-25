var canvas = document.createElement("canvas");
canvas.classList.add("memeCanvas");
canvas.width = 1000;
canvas.height = 1000;
var ctx = canvas.getContext("2d");

var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"blue");
grd.addColorStop(1,"white");
ctx.fillStyle = grd;

ctx.fillRect(10,10,400,80);

ctx.beginPath();
ctx.arc(500,100,80,0,2*Math.PI);
ctx.stroke();
ctx.beginPath();
ctx.arc(500,260,80,0,2*Math.PI);
ctx.stroke();

window.addEventListener("load", () => document.body.insertBefore(canvas, document.getElementById("penguin")));

function imageAppear(x, y, w, h, src){
    let image = new Image(w, h);
    image.addEventListener("load", function() { ctx.drawImage(this, x, y) });
    image.src = src;
}
