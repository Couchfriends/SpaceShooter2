/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Player = function() {

    Game.Entity.call(this, arguments);

    this.events.remove.push(this.die);

    this.stats = {
        hp: 200
    };

    this.die = function() {
        Game.loadGame();
        Game.setStage(Game.Stage.MenuGame);
    };

    this.init = function () {
        var object = new PIXI.Sprite.fromImage('data/images/ship/ship001/hull.png');
        object.y = Game.renderer.height - 100;
        object.x = Game.renderer.width / 2;
        object.anchor.x = .5;
        object.anchor.y = .5;
        this.object = object;
    };

    this.update = function () {
        var mousePos = Game.renderer.plugins.interaction.mouse.global;
        this.object.x = mousePos.x;
        this.object.y = mousePos.y;
    }

};

Game.Entity.Player.prototype = Game.Entity.prototype;