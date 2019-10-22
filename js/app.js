//determine enemy bug speed
const maxSpeed = 700;
const minSpeed = 100;
const baseSpeed = 60;
// Enemy constructor function
let Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';// img/sprite for enemies
    this.x = x;
    this.y = y;
    this.speed = this.speedy();
};

Enemy.prototype.speedy = function() {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + baseSpeed);// generates a number to adjust enemy's
};
// Enemy update() method
Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.speed = this.speedy();
    }

};
// Enemy render() method
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor function 
let Player = function(x, y) {
    this.sprite = 'images/char-princess-girl.png';// img/sprite for Player
    this.x = x;
    this.y = y;
    this.CounterWin = 0;
};
// collision detection with player
Player.prototype.update = function() {
    for (let i = 0; i < 3; i++) {
        if ((this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x) && (this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y)) {
            this.reset();
        }
    }
};
// reset to player starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 400;
};
// reset to player starting position
Player.prototype.finish = function() {
    this.x = 202;
    this.y = 400;
    this.CounterWin = 0;
};
//count the total move to the water
Player.prototype.WinScored = function() {
    this.CounterWin += 1;
    if (this.CounterWin == 3) {
        alert("You have won, Again?");// if the user move to the water 3 times won
        this.finish();
    }
    this.reset();//back to starting position
};
// Player's .render() method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(key) {
    // size of verticle movement in pixels
    if (key == "down") {
        if (this.y < 400) {
            this.y = this.y + 90;
        }
// size of horizontal movement in pixels
    } else if (key == "right") {
        if (this.x < 350) {
            this.x = this.x + 90;
        }
// size of verticle movement in pixels
    } else if (key == "up") {
        if (this.y > 40) {
            this.y -= 101

        } else {
            this.WinScored();
        }
// size of horizontal movement in pixels
    } else if (key == "left") {
        if (this.x > 50) {
            this.x = this.x - 90;
        }
    }

};

// Places enemy objects in allEnemies array
let allEnemies = [new Enemy(0, 55),
    new Enemy(0, 140),
    new Enemy(0, 230)
];

// Places the player object in a variable called player
let player = new Player(202, 400);

// listens for key presses and sends the keys to Player's handleInput() method
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
