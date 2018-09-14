class Particle extends PhysicsObject
{
    constructor(image, pos)
    {
        super(image, pos);
    }

    static launch(particle, maxX, maxY)
    {
        let vx = (Math.random() * 2 * maxX) - Math.sign(maxX) * maxX;
        let vy = Math.random() * maxY;

        particle.velocity = new Vector2(vx, vy);
    }
}