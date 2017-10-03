/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.Game = function () {

    Game.Stage.call(this, arguments);

    this.preloadObjects = [
        './data/images/ship/ship001/player.png',
        './data/images/ship/ship001/player-left.png',
        './data/images/ship/ship001/player-right.png',
        './data/images/ship/ship001/gun001.png',
        './data/images/explosions/explosion001_001.png',
        './data/images/explosions/explosion001_002.png',
        './data/images/explosions/explosion001_003.png',
        './data/images/explosions/explosion001_004.png',
        './data/images/explosions/explosion001_005.png',
        './data/images/explosions/explosion001_006.png'
    ];

    this.nextEvent = false;
    this.gameCounter = 0;

    /**
     * List of ingame enemies. Usefull for collision detection
     */
    this.enemies = [];

    this.explosions = [];
    this.currentExplosionIndex = 0;

    this.init = function () {
        for (var i = 0; i < Game.currentMission.events.length; i++) {
            var event = Game.currentMission.events[i];
            if (typeof event.texture !== 'undefined') {
                this.preloadObjects.push(event.texture);
            }
        }
    };

    this.start = function () {
        var Player = new Game.Entity.Player();
        Player.init();
        Player.add();

        this._initMoneyLabel();
        this._initExplosions();

        this.nextEvent = Game.currentMission.events[0];
    };

    this.addExplosion = function (x, y) {
        if (this.explosions[this.currentExplosionIndex].object.visible === true) {
            return; // This game has too many explosions!
        }
        this.explosions[this.currentExplosionIndex].object.x = x;
        this.explosions[this.currentExplosionIndex].object.y = y;
        this.explosions[this.currentExplosionIndex].object.visible = true;
        this.explosions[this.currentExplosionIndex].object.gotoAndPlay(1);
        this.explosions[this.currentExplosionIndex].object.onComplete = function () {
            this.visible = false;
        };
        this.currentExplosionIndex++;
        if (this.currentExplosionIndex >= this.explosions.length) {
            this.currentExplosionIndex = 0;
        }
    };

    this._initExplosions = function () {
        for (var i = 0; i < 20; i++) {
            var Explosion = new Game.Element();
            var frames = [];
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_001.png'));
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_002.png'));
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_003.png'));
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_004.png'));
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_005.png'));
            frames.push(PIXI.Texture.fromFrame('./data/images/explosions/explosion001_006.png'));
            var movie = new PIXI.extras.MovieClip(frames);
            movie.visible = false;
            movie.loop = false;
            movie.anchor.set(0.5);
            movie.animationSpeed = .2;
            Explosion.object = movie;
            Explosion.add();
            this.explosions.push(Explosion);
        }
    };

    this.update = function (delta) {
        if (this.nextEvent === false) {
            return;
        }
        this.gameCounter += delta;
        if (this.nextEvent.counter < this.gameCounter) {
            switch (this.nextEvent.type) {
                case "enemy":
                    var enemy = new this.nextEvent.enemy();
                    enemy.init();
                    enemy.object.x = this.nextEvent.options.x;
                    enemy.add();
                    break;

                case "background":
                    var Background = new Game.Element();
                    Background.eventSettings = this.nextEvent.options;
                    var object = new PIXI.Sprite.fromImage(this.nextEvent.texture);
                    object.displayGroup = this.nextEvent.options.layer || Game.layerBackground;
                    object.anchor.x = .5;
                    object.anchor.y = .5;
                    object.x = this.nextEvent.options.x;
                    object.y = this.nextEvent.options.y;
                    Background.object = object;
                    Background.update = function (delta) {
                        this.object.x += (this.eventSettings.speed.x * delta);
                        this.object.y += (this.eventSettings.speed.y * delta);
                        if (this.object.y > (this.eventSettings.remove.y)) {
                            this.remove();
                        }
                    };
                    Background.add();
                    break;
                case "background-stars":
                    var Background = new Game.Element();
                    Background.eventSettings = this.nextEvent.options;
                    var texture = PIXI.Texture.fromImage(this.nextEvent.texture);
                    var object = new PIXI.extras.TilingSprite(
                        texture,
                        Game.app.renderer.width,
                        Game.app.renderer.height
                    );
                    object.displayGroup = this.nextEvent.options.layer || Game.layerBackgroundStars;
                    object.anchor.x = .5;
                    object.anchor.y = .5;
                    object.x = this.nextEvent.options.x;
                    object.y = this.nextEvent.options.y;
                    Background.object = object;
                    Background.update = function (delta) {
                        this.object.tilePosition.x += (this.eventSettings.speed.x * delta);
                        this.object.tilePosition.y += (this.eventSettings.speed.y * delta);
                    };
                    Background.add();
                    break;
            }

            var nextIndex = Game.currentMission.events.indexOf(this.nextEvent) + 1;
            if (typeof Game.currentMission.events[nextIndex] === 'undefined') {
                this.nextEvent = false;
            }
            else {
                this.nextEvent = Game.currentMission.events[nextIndex];
            }
        }
    };

    this._initMoneyLabel = function () {

        var TextElement = new Game.Element();
        TextElement.money = Game.game.money;
        var text = new PIXI.Text('$ ' + Game.game.money, {
            font: '32px silkscreennormal',
            fill: '#ffffff'
        });
        text.x = Game.app.renderer.width / 2;
        text.y = 32;
        TextElement.object = text;
        TextElement.update = function (delta) {
            if (this.money >= Game.game.money) {
                return;
            }
            var difference = (Game.game.money - this.money);
            var addMoney = (difference.toString().length - 1) * 10;
            if (addMoney === 0) {
                addMoney = 1;
            }
            this.money += addMoney;
            this.object.text = '$ ' + this.money.formatMoney(0, '.', ',');
        };
        TextElement.add();
    }

};
Game.Stage.Game.prototype = Game.Stage.prototype;
