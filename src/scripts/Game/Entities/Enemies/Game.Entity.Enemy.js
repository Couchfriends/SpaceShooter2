/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Enemy = function() {

    Game.Entity.call(this, arguments);

    this.name = 'enemy';

    this.stats = {
        hp: 5,
        score: 10,
        money: 10
    };

    this.die = function() {
        Game.addMoney(this.stats.money);
        Game.addScore(this.stats.score);
        Game.currentStage.addExplosion(this.object.x, this.object.y);
        this.remove();
    };

    this.init = function() {
    };

    this.update = function(delta) {
    };

    this.add = function (to) {
        Game.currentStage.enemies.push(this);
        Game.Element.prototype.add.call(this, to);
    };

    this.remove = function () {
        var indexOf = Game.currentStage.enemies.indexOf(this);
        Game.currentStage.enemies.splice(indexOf, 1);
        Game.Element.prototype.remove.call(this);
    }

};

Game.Entity.Enemy.prototype = Game.Entity.prototype;