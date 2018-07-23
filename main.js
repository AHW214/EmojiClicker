function run() 
{
    var game = new Game(500, 500);
    game.makeEmoji("src/images/emoji/moon.png", 128, 128, 350, 350, (pos) => {
        console.log(`x pos: ${pos.x}\ny pos: ${pos.y}`); 
        console.log(firstUpgrade);

        game.score += firstUpgrade ? 2 : 1;

        game.makeParticle("src/images/emoji/cheese.png", 25, 25, pos.x, pos.y, -0.5, -0.5);

        //console.log(Vector2.sum(Vector2.scale(.1, Vector2.up), Vector2.right));
    });
    
    var sickwubs = document.getElementById("sickwubs");
    var firstUpgrade = false;


    var loss = document.getElementById("upgradememes");
    loss.addEventListener("click", () => {
        if(game.score >= 20) {
            game.score -= 20;
            firstUpgrade = true
            sickwubs.play();
        } else {
            console.log("you dont got the dosh");
        } 
    });
}