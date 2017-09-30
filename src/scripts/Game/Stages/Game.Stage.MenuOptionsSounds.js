/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.MenuOptionsSounds = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {
        var buttons = [];
        buttons.push({
            "label": (Game.settings.sound.mute) ? "Sound: off" : "Sound: on",
            "click": function() {
                var setMute = true;
                var label = "off";
                if (Game.settings.sound.mute === true) {
                    setMute = false;
                    label = "on";
                }
                var setting = {
                    sound: {
                        mute: setMute
                    }
                };
                Game.saveSetting(setting);
                this.object.text = 'Sound: ' + label;
            }
        });
        buttons.push({
            "label": (Game.settings.music.mute) ? "Music: off" : "Music: on",
            "click": function() {
                var setMute = true;
                var label = "off";
                if (Game.settings.music.mute === true) {
                    setMute = false;
                    label = "on";
                }
                var setting = {
                    music: {
                        mute: setMute
                    }
                };
                Game.saveSetting(setting);
                this.object.text = 'Music: ' + label;
            }
        });
        buttons.push({
            "label": "Return to options",
            "click": function() {
                Game.setStage(Game.Stage.MenuOptions);
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
