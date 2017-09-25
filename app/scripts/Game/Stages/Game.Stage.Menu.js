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

        var buttonStart2 = new Game.Button();
        buttonStart2.clickUp = function() {
            Game.setStage(Game.Stage.MenuOptions)
        };
        buttonStart2.init('Options');
        buttonStart2.object.y = 120;
        buttonStart2.add();

        var buttonStart3 = new Game.Button();
        buttonStart3.init('Credits');
        buttonStart3.object.y = 150;
        buttonStart3.add();

        var buttonStart4 = new Game.Button();
        buttonStart4.init('Exit');
        buttonStart4.object.y = 180;
        buttonStart4.add();
    }

};
