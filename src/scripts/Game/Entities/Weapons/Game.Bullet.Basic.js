/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Bullet.Basic = function() {

    Game.Bullet.call(this);


    this.stats = {
        damage: 1,
        speedX: 0,
        speedY: -15
    };

    this.init = function() {
        var object = new PIXI.Sprite.fromImage('./data/images/bullets/basic-bullet.png');
        object.y = 10;
        object.anchor.x = .5;
        object.anchor.y = .5;
        object.visible = false;
        this.object = object;
    };

    this.update = function(delta) {
        if (this.object.visible) {
            this.object.y += (this.stats.speedY * delta);
        }
        if (this.object.y < -10) {
            this.object.visible = false;
        }
    }
};

Game.Bullet.Basic.prototype = Game.Bullet.prototype;