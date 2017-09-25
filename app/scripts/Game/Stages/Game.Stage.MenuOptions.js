/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.MenuOptions = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {

        var buttonStart = new Game.Button();
        buttonStart.clickUp = function() {
            Game.setStage(Game.Stage.Menu);
        };
        buttonStart.init('Return');
        buttonStart.add();
    }

};
