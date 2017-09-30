/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity = function() {

    Game.Element.call(this);

    this.stats = {
        hp: 1,
        score: 10,
        money: 10
    };
    this.damage = function(damage) {
        damage = damage || 1;
        this.stats.hp -= damage;
        if (this.stats.hp <= 0) {
            Game.addScore(this.stats.score);
            Game.addMoney(this.stats.money);
            this.remove();
        }
    }
};

Game.Entity.prototype = Game.Element.prototype;
