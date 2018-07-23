class Particle extends PhysicsObject
{
    constructor(image, x, y)
    {
        super(image, x, y);
    }

    static launch(particle, maxX, maxY)
    {
        let vx = (Math.random() * 2 * maxX) - Math.sign(maxX) * maxX;
        let vy = Math.random() * maxY;

        particle.velocity = new Vector2(vx, vy);
    }
}