class PhysicsObject extends GameObject
{
    constructor(image, pos)
    {
        super(image, pos);

        this.velocity = Vector2.zero;
        this.ignoreGravity = false;
    }
}