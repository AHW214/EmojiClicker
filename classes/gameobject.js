class GameObject
{
    constructor(image, x, y)
    {
        this.image = image;
        
        this.width = image.width;
        this.height = image.height;

        this.position = new Vector2(x, y);
    }

    static instantiate(src, w, h, x, y, obj = this)
    {
        return new Promise((resolve) => {
            let image = new Image(w, h);
            image.addEventListener("load", () => resolve(new obj(image, x, y)));
            image.src = src;
        });
    }
}