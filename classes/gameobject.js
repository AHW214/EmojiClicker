class GameObject
{
    constructor(image, pos)
    {
        this.image = image;   
        this.scale = new Vector2(this.image.width, this.image.height);
        this.position = pos;

        this._centered = false;             
    }

    static instantiate(src, w, h, x, y, obj = this, centered = false)
    {
        return new Promise((resolve) => {
            let image = new Image(w, h);
            let pos = new Vector2(x, y);

            image.addEventListener("load", () => {
                let object = new obj(image, pos);
                object.centered = centered;
                resolve(object);
            });
            image.src = src;
        });
    }

    get centered() { return this._centered }

    set centered(value)
    {
        if(value === this._centered)
            return;

        this.position = Vector2.sum(this.position, Vector2.scale((this._centered = value) ? -0.5 : 0.5, this.scale));
    }
}