var game;
var upgradeHeader;
var buttons = [];

window.onload = run;

async function run() 
{
    game = new Game();

    let particleimage = "src/images/emoji/cheese.png";
    
    let screenSize = Helpers.screenDimensions;
    let emojiSize = new Vector2(256, 256);
    let emojiPos = Vector2.diff(Vector2.scale(0.5, screenSize), Vector2.scale(0.5, emojiSize));

    let firstEmoji = await game.makeEmoji("src/images/emoji/moon.png", emojiSize.x, emojiSize.y, emojiPos.x, emojiPos.y, (pos) => {
        game.score += value;
        game.makeParticle(particleimage, 64, 64, pos.x, pos.y, 0.5, -0.5);
    });

    let buttonBar = document.getElementById("button-bar");
    upgradeHeader = buttonBar.querySelector("h1");

    for(let i = 0; i < 6; i++) {
        let button = document.createElement("button");
        let upgrade = upgrades.splice(0, 1)[0];

        setButtonUpgrade(button, upgrade);
        
        buttons.push(button);
        buttonBar.appendChild(button);
    }
}

function setButtonUpgrade(button, upgrade)
{
    button.innerHTML = `${upgrade.name} ($${upgrade.cost})`;

    button.onclick = function() {
        if(game.score < upgrade.cost)
            return;

        game.score -= upgrade.cost;
        upgrade.action();

        removeButton(this);
    };

    button.onmouseenter = function() {
        if(game.score < upgrade.cost)
            this.classList.add("insufficient");
    };

    button.onmouseleave = function() {
        this.classList.remove("insufficient");
    };
}

function removeButton(toRemove)
{
    for(let i = buttons.indexOf(toRemove); i < buttons.length - 1; i++) {
        let current = buttons[i];
        let next = buttons[i + 1];

        current.innerHTML = next.innerHTML;
        current.onclick = next.onclick;
        current.onmouseenter = next.onmouseenter;
        current.onmouseleave = next.onmouseleave;
    }

    let lastIndex = buttons.length - 1; 

    if(upgrades.length === 0) {
        buttons.splice(lastIndex, 1)[0].remove();

        if(buttons.length === 0)
            upgradeHeader.innerHTML = "Outta Upgrades...";

        return;
    }
        
    let last = buttons[lastIndex];
    let upgrade = upgrades.splice(0, 1)[0];  
    setButtonUpgrade(last, upgrade); 
}