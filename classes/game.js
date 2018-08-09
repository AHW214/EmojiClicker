class Game
{
    constructor(w, h)
    {
        /* Canvas Setup */

        this.wrapper = document.getElementById("wrapper"); //kendrick lamar haha
        this.canvas = document.getElementById("mainCanvas");
        
        this.canvas.width = w;
        this.canvas.height = h;
        
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";

        this.canvasBounds = this.canvas.getBoundingClientRect();

        this.ctx = this.canvas.getContext("2d");

        /* Mouse Data */

        this.mouse = { position: Vector2.zero }

        /* Time Keeping */

        this.time = 0.0;
        this.firstTime = 0.0;
        this.deltaTime = 0.0;

        /* Particles */

        this.physics = {
            gravity: new Vector2(0.0, 9.81 / 1e4) //fix
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
            physObj.velocity = Vector2.sum(dV, physObj.velocity);
        }

        let dP = Vector2.scale(this.deltaTime, physObj.velocity);
        physObj.position = Vector2.sum(dP, physObj.position);
    }

    /* Check if Object Is out of Bounds */

    onScreen(obj)
    {
        let left, right, top, bottom; // maybe make this an instance method of physicsobject (so only have to check condition once)
        if(obj.centered) {
            left = 0.0 - obj.scale.x / 2.0;
            right = this.canvas.width + obj.scale.x / 2.0;

            top = 0.0 - obj.scale.y / 2.0;
            bottom = this.canvas.height + obj.scale.y / 2.0;
        }
        else {
            left = 0.0 - obj.scale.x;
            right = this.canvas.width;

            top = 0.0 - obj.scale.y;
            bottom = this.canvas.height;
        }

        return (obj.position.x > left && obj.position.x < right) && (obj.position.y > top && obj.position.y < bottom);
    }

    /* Draw an Object */

    draw(obj)
    {
        this.ctx.drawImage(obj.image, obj.position.x, obj.position.y, obj.scale.x, obj.scale.y);
    }

    /* Update Physics and Render All Objects */

    render()
    {
        this.objects.physicsObjects.forEach(this.enactPhysics.bind(this));
        
        for(let k in this.objects)
            this.objects[k].forEach((obj, i) => {
                if(this.onScreen(obj))
                    this.draw(obj);                 
                else {   
                    this.objects[k].splice(i, 1);
                    console.log("delet");
                    console.log(this.objects[k]);
                }
            });
    }
    
    /* Drawing to the Canvas */

    async makeEmoji(src, w, h, x, y, func)
    {
        let emoji = await this.makeObject(src, w, h, x, y);
        this.createHitbox(emoji, func);

        return emoji;
    }

    async makeObject(src, w, h, x, y)
    {
        let obj = await GameObject.instantiate(src, w, h, x, y);
        this.objects.gameObjects.push(obj);

        return obj;
    }

    /* Spawn Particles */

    async makeParticle(src, w, h, x, y, maxX = 0.0, maxY = 0.0)
    {
        let particle = await GameObject.instantiate(src, w, h, x, y, Particle, true);
        Particle.launch(particle, maxX, maxY);
        this.objects.physicsObjects.push(particle);
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