/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.Game = function() {

    Game.Stage.call(this, arguments);

    this.preloadObjects = [
        './data/images/ship/ship001/hull.png',
        './data/images/ship/ship001/jet.png',
        './data/images/ship/ship001/gun001.png'
    ];

    this.start = function() {
        var Player = new Game.Entity.Player();
        Player.init();
        Player.add();
    }

};
