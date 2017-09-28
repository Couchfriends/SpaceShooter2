/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.MenuOptionsVideo = function() {

    Game.Stage.call(this, arguments);

    this.start = function() {
        var buttons = [];
        buttons.push({
            "label": (Game.settings.video.particles) ? "Particles: high" : "Particles: off",
            "click": function() {
                var setParticles = true;
                var label = "high";
                if (Game.settings.video.particles === true) {
                    setParticles = false;
                    label = "off";
                }
                var setting = {
                    video: {
                        particles: setParticles
                    }
                };
                Game.saveSetting(setting);
                this.object.text = 'Particles: ' + label;
            }
        });
        buttons.push({
            "label": "Video resolution: " + Game.settings.video.resolution.width + "x" + Game.settings.video.resolution.height,
            "click": function() {
                var setting = {
                    video: {
                        resolution: {
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                    }
                };
                Game.saveSetting(setting);
                window.location.reload();
            }
        });
        buttons.push({
            "label": "Return to options",
            "click": function() {
                Game.setStage(Game.Stage.MenuOptions);
            }
        });
        var x = Game.renderer.width / 2;
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
