/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Enemy = function() {

    Game.Entity.call(this, arguments);

    this.stats = {
        hp: 5,
        score: 10,
        money: 10
    };

    this.die = function() {
        Game.addMoney(this.stats.money);
        Game.addScore(this.stats.score);
    };

    this.init = function() {
    };

    this.update = function(delta) {
    }

};

Game.Entity.Enemy.prototype = Game.Entity.prototype;