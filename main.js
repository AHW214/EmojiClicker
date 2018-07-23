function run() 
{
    var game = new Game(500, 500);
    game.drawEmoji(350, 350, 128, 128, "src/images/emoji/moon.png", (x, y) => {
        console.log("x pos: " + x + "\ny pos: " + y); 
        console.log(firstUpgrade);
        if (firstUpgrade){
            game.score+= 2;
        } else {
            game.score++;
        }

        game.spawnParticle(x, y, 25, 25, "src/images/emoji/cheese.png", -0.5, -0.5);
    });
    var sickwubs = document.getElementById("sickwubs");
    var firstUpgrade = false


    var loss = document.getElementById("upgradememes");
    loss.addEventListener("click", () => {
        if (game.score > 20){
        game.score -= 20;
        firstUpgrade = true
        sickwubs.play();
        } else {
            console.log("you dont got the dosh");
        } 
    });



}