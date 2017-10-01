/**
 * The main Entity of the game. For players and enemies
 * @constructor
 */
Game.Weapon = function() {

    Game.Element.call(this);

    this.name = 'weapon';

    this.bullets = [];

    this.currentBulletIndex = 0;

    this.stats = {
        interval: 60
    };
    this.shoot = function() {
    }
};

Game.Weapon.prototype = Game.Element.prototype;
