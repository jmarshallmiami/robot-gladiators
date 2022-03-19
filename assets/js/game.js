// GAME FUNCTIONS

// function to generate random numbers
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }
    console.log(name);
    return name;
}

var fightOrSkip = function () {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")
    promptFight = promptFight.toLowerCase();

    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?")

        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

var fight = function (enemy) {

    var isPlayerTurn = true;
    if (Math.random() > .5) {
        return isPlayerTurn = false
    };

    while (playerInfo.health > 0 && enemy.health > 0) {
        // if isPlayerTurn then prompt to fight or skip
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                break;
            }
            // Subtract the value of randomly generated 'damage' from the value of 'enemy.health' and update the value in the 'enemy.health' variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                // alert if player has won the fight
                window.alert(enemy.name + " has died!");
                // reward for winning the fight
                playerInfo.money = playerInfo.money + 20;
                break;
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {

            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);

            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            };
            isPlayerTurn = !isPlayerTurn
        };
    };
};

var startGame = function () {

    // reset player stats
    playerInfo.reset();

    // fight and round logic
    for (var i = 0; i < enemyInfo.length; i++) {

        console.log(playerInfo)

        // if player is alive, keep fighting
        if (playerInfo.health > 0) {
            //let the player know what round
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // enemy fed into the fight loop and fight occurs
            var pickedEnemyObj = enemyInfo[i];

            //set health for picked enemy
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj)

            //pass the pickEnemyObj object variable's value into the fight function
            fight(pickedEnemyObj);
            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if the player want to use the store before next round begins
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?")
                // if the player wants to use store call the shop function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        };
    };

    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    };

    //if player has more money than the high score, player has the new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    //Ask player if they would like to restart the game 
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    shopOptionPrompt = parseInt(shopOptionPrompt);


    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    };
};

/* END GAME FUNCTIONS */

/* GAME INFORMATION/ PLAYER VARIABLES */

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }

    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

/* END GAME INFORMATION/ PLAYER VARIABLES */



startGame();
