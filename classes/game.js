class Game
{
    constructor(w, h) 
    {
        /* Canvas Setup */

        this.wrapper = document.getElementById("wrapper");
        this.canvas = document.getElementById("mainCanvas");
        
        this.canvas.width = w;
        this.canvas.height = h;
        
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";

        this.canvasBounds = this.canvas.getBoundingClientRect();

        this.ctx = this.canvas.getContext("2d");

        /* Mouse Data */

        this.mouse = {
            x: 0, y: 0
            //lastX: 0, lastY: 0,
            //b1: false, b2: false, b3: false,
            //buttonNames: ["b1", "b2", "b3"]
        }

        /* Time Keeping */

        this.deltaTime = null;

        /* Particles */

        this.physics = {
            gravity: 9.81
        }

        this.particles = [];

        /* Scoring */

        this.scoreBoard = document.getElementById("scoreBoard");
        this.counter = 0;

        /* Start Time Loop */

        this.startTime();
    }

    /* Time Loop */

    startTime()
    {
        let prevTime = +new Date();

        const step = (nowTime) => {
            this.deltaTime = nowTime - prevTime;
            prevTime = nowTime;

            this.update();

            requestAnimationFrame(step);
        }

        step(prevTime);
    }

    /* Update Runs Once Per Frame */

    update()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, i) => {
            console.log(i);
            //this.ctx.drawImage(p.image, p.x, p.y);

            this.ctx.fillRect(p.x, p.y, p.w, p.h);   
            
            p.vy += this.deltaTime * this.physics.gravity / 10000;
            
            p.x += this.deltaTime * p.vx;
            p.y += this.deltaTime * p.vy;
        });
    }

    /* Drawing to the Canvas */

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

    /* Spawn Particles */

    spawnParticle(x, y, w, h, src, vx = 0.0, vy = 0.0)
    {
        let particle = new Particle(...arguments);
        this.particles.push(particle);
    }

    /* Get Mouse Position on Click */

    mouseEvent(event)
    {
        let rawX = event.clientX - this.canvasBounds.left;
        let rawY = event.clientY - this.canvasBounds.top;

        this.mouse.x = (rawX * this.canvas.width) / this.canvasBounds.width;
        this.mouse.y = (rawY * this.canvas.height) / this.canvasBounds.height;
    }

    /* Generate a Hitbox DIV */

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

    /* Scoring */

    get score() { return this.counter; }

    set score(value)
    {
        this.counter = value;
        this.scoreBoard.innerHTML = this.counter;
    }
}