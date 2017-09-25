/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.Menu = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {

        var buttonStart = new Game.Button();
        buttonStart.clickUp = function() {
            console.log('Start game');
        };
        buttonStart.init('Start Game');
        buttonStart.add();

        var buttonStart = new Game.Button();
        buttonStart.init('Options');
        buttonStart.object.y = 120;
        buttonStart.add();

        var buttonStart = new Game.Button();
        buttonStart.init('Credits');
        buttonStart.object.y = 150;
        buttonStart.add();

        var buttonStart = new Game.Button();
        buttonStart.init('Exit');
        buttonStart.object.y = 180;
        buttonStart.add();
    }

};
