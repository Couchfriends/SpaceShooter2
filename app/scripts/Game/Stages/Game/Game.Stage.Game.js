/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.Game = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {
        console.log('pew pew');
    }

};
