/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Enemy.Asteroid = function() {

    Game.Entity.Enemy.call(this, arguments);

    this.init = function(type) {
        type = type || 'standard';
        var object = new PIXI.Sprite.fromImage('./data/images/enemies/asteroid001.png');
        object.x = Math.random() * Game.app.renderer.width;
        object.y = -100;
        object.anchor.x = .5;
        object.anchor.y = .5;
        this.object = object;
    };

    this.update = function(delta) {
        this.object.y += (2 * delta);
        this.object.rotation += 0.01 * delta;
    }

};

Game.Entity.Enemy.Asteroid.prototype = Game.Entity.Enemy.prototype;