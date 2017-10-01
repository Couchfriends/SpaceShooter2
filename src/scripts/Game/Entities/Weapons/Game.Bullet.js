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

    this.update = function() {
    }
};

Game.Bullet.prototype = Game.Element.prototype;
