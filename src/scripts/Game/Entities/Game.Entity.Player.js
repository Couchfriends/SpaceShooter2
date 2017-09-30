/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Player = function() {

    Game.Entity.call(this, arguments);

    this.events.remove.push(this.die);

    this.weapons = [
        Game.Weapon.Basic
    ];

    this.stats = {
        hp: 200
    };

    this.die = function() {
        Game.loadGame();
        Game.setStage(Game.Stage.MenuGame);
    };

    this.init = function() {
        var object = new PIXI.Sprite.fromImage('./data/images/ship/ship001/hull.png');
        object.y = Game.app.renderer.height - 100;
        object.x = Game.app.renderer.width / 2;
        object.anchor.x = .5;
        object.anchor.y = .5;
        this.object = object;

        // Init weapons
        for (var i = 0; i < this.weapons.length; i++) {
            var weapon = new this.weapons[i]();
            weapon.init();
            weapon.add(this.object);
        }
    };

    this.update = function() {
        this.object.x += Game.mouse.movementX;
        this.object.y += Game.mouse.movementY;
        if (this.object.x < 0) {
            this.object.x = 0;
        }
        if (this.object.x > Game.app.renderer.width) {
            this.object.x = Game.app.renderer.width;
        }
        if (this.object.y < 0) {
            this.object.y = 0;
        }
        if (this.object.y > Game.app.renderer.height) {
            this.object.y = Game.app.renderer.height;
        }
    }

};

Game.Entity.Player.prototype = Game.Entity.prototype;
