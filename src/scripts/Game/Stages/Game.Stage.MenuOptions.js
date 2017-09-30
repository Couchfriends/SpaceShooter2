/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.MenuOptions = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {
        var buttons = [];
        buttons.push({
            "label": "Video",
            "click": function() {
                Game.setStage(Game.Stage.MenuOptionsVideo)
            }
        });
        buttons.push({
            "label": "Sound & Music",
            "click": function() {
                Game.setStage(Game.Stage.MenuOptionsSounds)
            }
        });
        buttons.push({
            "label": "Return to menu",
            "click": function() {
                Game.setStage(Game.Stage.Menu)
            }
        });
        var x = Game.app.renderer.width / 2;
        var y = 30;
        for (var i = 0; i < buttons.length; i++) {
            var button = new Game.Button();
            button.clickUp = buttons[i].click;
            button.init(buttons[i].label);
            button.object.anchor.x = .5;
            button.object.anchor.y = .5;
            button.object.x = x;
            button.object.y = y;
            button.add();
            y += 30;
        }
    }

};
