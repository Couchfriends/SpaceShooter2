/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.MenuGame = function() {

    Game.Stage.call(this, arguments);

    this.preloadObjects = [
        './data/images/menu/captain.png'
    ];

    this.start = function() {
        Game.setMission();

        var button = new Game.Button();
        button.clickUp = function() {
            Game.setStage(Game.Stage.Menu)
        };
        button.init('Return to menu');
        button.object.anchor.x = 1;
        button.object.anchor.y = .5;
        button.object.x = Game.app.renderer.width - 30;
        button.object.y = Game.app.renderer.height - 30;
        button.add();

        var button = new Game.Button();
        button.clickUp = function() {
            Game.pointerLock();
            Game.setStage(Game.Stage.Game);
        };
        button.init('Play mission');
        button.object.anchor.x = 0;
        button.object.anchor.y = .5;
        button.object.x = 30;
        button.object.y = Game.app.renderer.height - 30;
        button.add();

        var MissionTitle = new Game.Element();
        var missionTitle = Game.currentMission.title;

        var object = new PIXI.Text(missionTitle, {
            font: '28px silkscreennormal',
            fill: '#b53b14'
        });
        object.x = 30;
        object.y = 30;
        MissionTitle.object = object;
        MissionTitle.add();

        var MissionText = new Game.Element();
        var mission = Game.currentMission.content;
        var object = new PIXI.Text(mission, {
            font: '22px silkscreennormal',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 440
        });
        object.x = 30;
        object.y = 60;
        MissionText.object = object;
        MissionText.add();

        var Captain = new Game.Element();
        var object = new PIXI.Sprite.fromImage('./data/images/menu/captain.png');
        object.y = 30;
        object.x = 500;
        Captain.object = object;
        Captain.add();

    }

};

Game.Stage.MenuGame.prototype = Game.Stage.prototype;