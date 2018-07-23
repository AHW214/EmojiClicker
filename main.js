function run() 
{
    var game = new Game(500, 500);
    game.drawEmoji(350, 350, 128, 128, "src/images/emoji/moon.png", (x, y) => {
        console.log("x pos: " + x + "\ny pos: " + y);
        game.score++;

        game.spawnParticle(x, y, 25, 25, "src/images/emoji/cheese.png", -0.5, -0.5);
    });

    var loss = document.getElementById("losedoshbutton");
    loss.addEventListener("click", () => {
        game.score -= 10;
    });
}