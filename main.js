async function run() 
{
    var game = new Game(500, 500);
    let firstEmoji = await game.makeEmoji("src/images/emoji/moon.png", 256, 256, 128, 128, (pos) => {
        console.log(`x pos: ${pos.x}\ny pos: ${pos.y}`); 
        console.log(firstUpgrade);

        game.score += firstUpgrade ? 2 : 1;

        game.makeParticle("src/images/emoji/cheese.png", 64, 64, pos.x, pos.y, 0.5, -0.5);
    });
    
    var sickwubs = document.getElementById("sickwubs");
    var firstUpgrade = false;

    var loss = document.getElementById("upgradememes");
    loss.addEventListener("click", () => {
        if(game.score < 20) {
            console.log("you dont got the dosh");
            return;
        }

        game.score -= 20;
        firstUpgrade = true;
        sickwubs.play();

        document.body.removeChild(loss);
    });

    var evolve = document.getElementById("evolvebutton");
    evolve.addEventListener("click", () => {
        if(game.score < 50) {
            console.log("cease and desist");
            return;
        } 

        game.score -= 50;
        firstEmoji.image.src = "src/images/emoji/sun.png";

        document.body.removeChild(evolve);
    });
}