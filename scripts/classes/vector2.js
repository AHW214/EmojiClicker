class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    get magnitude() { return Math.sqrt(this.x**2 + this.y**2); }
    get inverse() { return Vector2.scale(-1, this); }

    static get zero() { return new Vector2(0.0, 0.0); }
    static get right() { return new Vector2(1.0, 0.0); }
    static get up() { return new Vector2(0.0, 1.0); }
    
    static sum(v1, v2) { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
    static diff(v1, v2) { return new Vector2(v1.x - v2.x, v1.y - v2.y); }
    static prod(v1, v2) { return new Vector2(v1.x * v2.x, v1.y * v2.y); }
    
    static scale(k, v) { return new Vector2(k * v.x, k * v.y); }
}
