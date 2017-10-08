/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Weapon.Basic = function() {

    Game.Weapon.call(this);

    this.stats = {
        interval: 8
    };

    this.counter = 10;

    this.bullets = [];

    this.init = function() {
        var object = new PIXI.Sprite.fromImage('./data/images/ship/ship001/gun001.png');
        object.visible = false;
        object.anchor.x = .5;
        object.anchor.y = .5;
        this.object = object;
        for (var i = 0; i < 20; i++) {
            var bullet = new Game.Bullet.Basic();
            bullet.init();
            bullet.add();
            this.bullets.push(bullet);
        }
    };

    this.update = function (delta) {

        this.counter += delta;
        // if (Game.app.renderer.plugins.interaction)
        if (Game.app.renderer.plugins.interaction.mouse.buttons <= 0) {
            return;
        }
        if (this.counter < this.stats.interval) {
            return
        }
        if (typeof this.bullets[this.currentBulletIndex] === 'undefined') {
            return;
        }

        if (this.bullets[this.currentBulletIndex].object.visible === true) {
            return; // Cannot shoot more than available bullets
        }
        var currentBullet = this.bullets[this.currentBulletIndex];
        var position = this.object.toGlobal({x:0, y:0});
        currentBullet.object.visible = true;
        currentBullet.object.x = position.x;
        currentBullet.object.y = position.y - 32;
        this.currentBulletIndex += 1;
        if (this.currentBulletIndex >= this.bullets.length) {
            this.currentBulletIndex = 0;
        }
        this.counter = 0;
    }
};

Game.Weapon.Basic.prototype = Game.Weapon.prototype;