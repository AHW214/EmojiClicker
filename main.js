class Game
{
    constructor(w, h) 
    {
        this.wrapper = document.getElementById("wrapper");
        this.canvas = document.getElementById("mainCanvas");
        
        this.canvas.width = w;
        this.canvas.height = h;
        
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";

        this.canvasBounds = this.canvas.getBoundingClientRect();

        this.mouse = {
            x: 0, y: 0
            //lastX: 0, lastY: 0,
            //b1: false, b2: false, b3: false,
            //buttonNames: ["b1", "b2", "b3"]
        }

        this.ctx = this.canvas.getContext("2d");

        this.scoreBoard = document.getElementById("scoreBoard");
        this.counter = 0;
    }

    drawEmoji(x, y, w, h, src, func)
    {
        this.drawElem(x, y, w, h, src);
        this.createHitbox(x, y, w, h, func);
    }

    drawElem(x, y, w, h, src)
    {
        let image = new Image(w, h);
        image.addEventListener("load", () => {
            this.ctx.drawImage(image, x, y, w, h);
        });
        
        image.src = src;
    }

    mouseEvent(event)
    {
        let rawX = event.clientX - this.canvasBounds.left;
        let rawY = event.clientY - this.canvasBounds.top;

        this.mouse.x = (rawX * this.canvas.width) / this.canvasBounds.width;
        this.mouse.y = (rawY * this.canvas.height) / this.canvasBounds.height;
    }

    createHitbox(x, y, w, h, func)
    {
        let hb = document.createElement("div");
        //hb.id = "test";
        hb.style.width = w + "px";
        hb.style.height = h + "px";

        hb.style.position = "absolute";
        hb.style.left = x + "px";
        hb.style.top = y + "px";

        hb.style.borderRadius = Math.round(Math.max(w, h) / 2) + "px";

        hb.addEventListener("click", (event) => {
            this.mouseEvent(event);
            func(this.mouse.x, this.mouse.y);
        });

        this.wrapper.appendChild(hb);
    }

    incrementScore()
    {
        this.scoreBoard.innerHTML = ++this.counter;
    }
}


function run() 
{
    var game = new Game(500, 500);
    game.drawEmoji(350, 350, 128, 128, "src/images/emoji/moon.png", (x, y) => {
        console.log("x pos: " + x + "\ny pos: " + y);
        game.ctx.fillRect(x, y, 50, 50);
    });
}