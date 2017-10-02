/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Bullet.Basic = function () {

    Game.Bullet.call(this);

    this.stats = {
        damage: 1,
        speedX: 0,
        speedY: -15
    };
};

Game.Bullet.Basic.prototype = Object.create(Game.Bullet.prototype);

Game.Bullet.Basic.prototype.constructor = Game.Bullet;

Game.Bullet.Basic.prototype.init = function () {
    var object = new PIXI.Sprite.fromImage('./data/images/bullets/basic-bullet.png');
    object.y = 10;
    object.anchor.x = .5;
    object.anchor.y = .5;
    object.visible = false;
    this.object = object;
};

Game.Bullet.Basic.prototype.update = function (delta) {
    Game.Bullet.prototype.update.call(this, delta);
    if (this.object.visible === false) {
        return;
    }
    this.object.y += (this.stats.speedY * delta);
    if (this.object.y < -10) {
        this.object.visible = false;
    }
};