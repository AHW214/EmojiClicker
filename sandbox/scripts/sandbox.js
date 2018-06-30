var imageOn = false;

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

var button;
window.addEventListener("load", () => {
    button = document.getElementById("penguin");
    button.addEventListener("click", () => {
        if(imageOn) {
            imageOn = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            imageOn = true;
            imageAppear(350, 350, 256, 256, "images/dabpenguin.png");
        }
    });
    document.body.insertBefore(canvas, button)
});

function imageAppear(x, y, w, h, src) {
    let image = new Image(w, h);
    image.addEventListener("load", function() { ctx.drawImage(this, x, y) });
    image.src = src;
}