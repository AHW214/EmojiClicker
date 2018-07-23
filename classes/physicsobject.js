class PhysicsObject extends GameObject
{
    constructor(image, x, y)
    {
        super(image, x, y);

        this.velocity = Vector2.zero;
        this.ignoreGravity = false;
    }
}