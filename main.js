function run() 
{
    var game = new Game(500, 500);
    game.drawEmoji(350, 350, 128, 128, "src/images/emoji/moon.png", (pos) => {
        console.log("x pos: " + pos.x + "\ny pos: " + pos.y);
        game.score++;

        game.spawnParticle(pos.x, pos.y, 25, 25, "src/images/emoji/cheese.png", -0.5, -0.5);
    });

    var loss = document.getElementById("losedoshbutton");
    loss.addEventListener("click", () => {
        game.score -= 10;
    });
}