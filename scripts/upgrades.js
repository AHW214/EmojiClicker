var value = 1;

const upgrades =
[
    {
        name: "Double Trouble", 
        cost: 20,            
        action: () => value++
    },
 
    {
        name: "Triple Threat",
        cost: 50,
        action: () => value += 3
    },

    {
        name: "Triple Threat",
        cost: 50,
        action: () => value += 3
    },

    {
        name: "Triple Threat",
        cost: 50,
        action: () => value += 3
    },

    {
        name: "Triple Threat",
        cost: 50,
        action: () => value += 3
    },

    {
        name: "Triple Threat",
        cost: 50,
        action: () => value += 3
    },

    {
        name: "PLACEHOLDER",
        cost: 50,
        action: () => setInterval(() => game.score++, 3000)
    }
]