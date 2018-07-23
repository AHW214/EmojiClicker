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
            position: Vector2.zero
            //lastX: 0, lastY: 0,
            //b1: false, b2: false, b3: false,
            //buttonNames: ["b1", "b2", "b3"]
        }

        /* Time Keeping */

        this.time = 0.0;
        this.firstTime = 0.0;
        this.deltaTime = 0.0;

        /* Particles */

        this.physics = {
            gravity: new Vector2(0.0 -9.81)
        }

        this.objects = {
            gameObjects: [],
            physicsObjects: []
        }

        /* Scoring */

        this.scoreBoard = document.getElementById("scoreBoard");
        this.counter = 0;

        /* Start Time Loop */

        this.startTime();
    }

    /* Time Loop */

    startTime()
    {
        this.firstTime = +new Date();

        let prevTime = this.firstTime;
        const step = (nowTime) => {
            this.time = nowTime - this.firstTime;
            this.deltaTime = nowTime - prevTime;
            prevTime = nowTime;

            this.clear();
            this.update();
            this.render();

            requestAnimationFrame(step);
        }

        step(prevTime);
    }

    /* Clear Canvas Every Frame */

    clear()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /* Update Runs Once Per Frame */

    update()
    {

    }

    /* Enact Physics on an Object */

    enactPhysics(physObj)
    {
        if(!physObj.ignoreGravity) {
            let dV = Vector2.scale(this.deltaTime, this.physics.gravity);
            physObj.velocity = Vector2.add(dV, physObj.velocity);
        }

        let dP = Vector2.scale(this.deltaTime, physObj.velocity);
        physObj.position = Vector2.add(dP, physObj.position);
    }

    /* Draw an Object */

    draw(obj)
    {
        this.ctx.drawImage(obj.image, obj.position.x, obj.position.y, obj.scale.x, obj.scale.y);
    }

    /* Update Physics and Render All Objects */

    render()
    {
        this.objects.physicsObjects.forEach(this.enactPhysics);
        
        for(let k in this.objects)
            this.objects[k].forEach(this.draw);
    }
    
    /* Drawing to the Canvas */

    /*
    drawEmoji(x, y, w, h, src, func)
    {
        this.drawElem(x, y, w, h, src);
        this.createHitbox(x, y, w, h, func);
    }
    */

    async makeEmoji(src, w, h, x, y, func)
    {
        let emoji = await this.makeObject(src, w, h, x, y);
        this.createHitbox(emoji, func);
    }

    async makeObject(src, w, h, x, y)
    {
        let obj = await GameObject.instantiate(src, w, h, x, y);
        this.objects.gameObjects.push(obj);

        return obj;
    }

    /*
    drawElem(x, y, w, h, src)
    {
        let image = new Image(w, h);
        image.addEventListener("load", () => {
            this.ctx.drawImage(image, x, y, w, h);
        });
        
        image.src = src;
    }
    */

    /* Spawn Particles */

    async makeParticle(src, w, h, x, y, vx = 0.0, vy = 0.0)
    {
        let particle = await GameObject.instantiate(src, w, h, x, y, Particle);
        particle.velocity = new Vector2(vx, vy);
        this.particles.push(particle);
    }

    /* Get Mouse Position on Click */

    mouseEvent(event)
    {
        let rawX = event.clientX - this.canvasBounds.left;
        let rawY = event.clientY - this.canvasBounds.top;

        let scaledX = (rawX * this.canvas.width) / this.canvasBounds.width;
        let scaledY = (rawY * this.canvas.height) / this.canvasBounds.height;

        this.mouse.position = new Vector2(scaledX, scaledY);
    }

    /* Generate a Hitbox DIV */

    createHitbox(obj, func)
    {
        let hb = document.createElement("div");
        //hb.id = "test";
        hb.style.width = obj.scale.x + "px";
        hb.style.height = obj.scale.y + "px";

        hb.style.position = "absolute";
        hb.style.left = obj.position.x + "px";
        hb.style.top = obj.position.y + "px";

        hb.style.borderRadius = Math.round(Math.max(obj.scale.x, obj.scale.y) / 2) + "px";

        hb.addEventListener("click", (event) => {
            this.mouseEvent(event);
            func(this.mouse.position);
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