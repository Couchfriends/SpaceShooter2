/**
 * Player main bullet object
 * @constructor
 */
Game.Bullet = function() {

    Game.Element.call(this);

    this.name = 'bullet';

    /**
     * List of weapons Elements with a shoot() option
     * @type {Array}
     */
    this.bullets = [];

    this.stats = {
        damage: 10,
        speedX: 0,
        speedY: -5
    };

};

Game.Bullet.prototype = Object.create(Game.Element.prototype);

Game.Bullet.prototype.constructor = Game.Element;

Game.Bullet.prototype.update = function (delta) {
    Game.Element.prototype.update.call(this, delta);
    if (this.object.visible === false) {
        return;
    }
    this._checkCollision();
};

Game.Bullet.prototype._checkCollision = function () {
    for (var i = 0; i < Game.currentStage.enemies.length; i++) {
        var enemy = Game.currentStage.enemies[i];
        if (Game.bump.hit(enemy.object, this.object)) {
            this.object.visible = false;
            enemy.stats.hp -= this.stats.damage;
            if (enemy.stats.hp <= 0) {
                enemy.die();
            }
        }
    }
};
