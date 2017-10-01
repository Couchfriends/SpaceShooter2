/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Entity.Player = function () {

    Game.Entity.call(this, arguments);

    this.name = 'player';

    this.events.remove.push(this.die);

    this.weapons = [
        Game.Weapon.Basic
    ];

    this.movementX = 0;
    this.movementY = 0;

    this.particles = [];

    this.currentParticleIndex = 0;
    this.particleCounter = 30;

    this.stats = {
        hp: 200
    };

    this.die = function () {
        Game.loadGame();
        Game.setStage(Game.Stage.MenuGame);
    };

    this.init = function () {
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

        if (Game.settings.video.particles === true) {
            for (var i = 0; i < 50; i++) {
                var Particle = new Game.Element();
                Particle.startPos = {
                    x: Math.random() * 8 - 4,
                    y: Math.random() * 8 + 5
                };
                var pixel = new PIXI.Graphics();
                var size = Math.random() * 3;
                Particle.speed = 1 + (Math.random() * 3);
                pixel.beginFill(0xFF0000).drawRect(Particle.startPos.x, Particle.startPos.y, size, size);
                pixel.visible = false;
                Particle.object = pixel;
                Particle.update = function (delta) {
                    if (this.object.visible === false) {
                        return;
                    }
                    this.object.y += (this.speed * delta);
                    this.object.alpha -= (.03 * delta);
                    if (this.object.alpha <= 0) {
                        this.object.visible = false;
                        this.object.alpha = 1;
                    }
                };
                Particle.add();
                this.particles.push(Particle);
            }
        }
    };

    this.update = function (delta) {
        this._updateMovement(delta);
        this._updateParticles(delta);
    };

    this._updateMovement = function (delta) {
        // Should be moved to mouse event callback for multiplayer
        var movementX = (Game.mouse.movementX * delta);
        var movementY = (Game.mouse.movementY * delta);
        this.object.x += movementX;
        this.object.y += movementY;
        if (this.object.x < 0) {
            this.object.x = 0;
            movementX = 0;
        }
        if (this.object.x > Game.app.renderer.width) {
            this.object.x = Game.app.renderer.width;
            movementX = 0;
        }
        if (this.object.y < 0) {
            this.object.y = 0;
            movementY = 0;
        }
        if (this.object.y > Game.app.renderer.height) {
            this.object.y = Game.app.renderer.height;
            movementY = 0;
        }

        this.movementX = movementX;
        this.movementY = movementY;
    };

    this._updateParticles = function (delta) {
        if (this.particles.length === 0 || (this.movementX === 0 && this.movementY === 0)) {
            return;
        }
        if (this.particles[this.currentParticleIndex].object.visible === true) {
            return;
        }
        this.particleCounter += delta;
        if (this.particleCounter < 1) {
            return;
        }
        var currentParticle = this.particles[this.currentParticleIndex];
        var position = this.object.toGlobal({x:0, y:0});
        currentParticle.object.visible = true;
        currentParticle.object.x = position.x + currentParticle.startPos.x;
        currentParticle.object.y = position.y + currentParticle.startPos.y;
        this.currentParticleIndex += 1;
        if (this.currentParticleIndex >= this.particles.length) {
            this.currentParticleIndex = 0;
        }
        this.particleCounter = 0;
    }

};

Game.Entity.Player.prototype = Game.Entity.prototype;
