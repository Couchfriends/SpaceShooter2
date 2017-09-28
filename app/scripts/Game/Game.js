var Game = Game || {

    renderer: null,
    stage: null,
    /**
     * Default settings
     */
    settings: {
        video: {
            resolution: {
                width: null,
                height: null
            },
            particles: true
        },
        sound: {
            mute: false,
            volume: 1
        },
        music: {
            mute: false,
            volume: .5
        }
    },

    game: {
        score: 0,
        money: 0,
        difficultyMultiplier: 1,
        currentMissionIndex: 0,
        ship: {
            // @todo
            weapons: []
        }
    },

    /**
     * Current mission loaded from Game.Missions
     */
    currentMission: {
        title: "",
        message: ""
    },

    /**
     * The current stage to render
     */
    currentStage: null,

    /**
     * Set the current mission
     * @param missionIndex optional next mission index. If the last mission is finished, restart with more difficult.
     */
    setCurrentMission: function(missionIndex) {
        missionIndex = missionIndex || Game.game.currentMissionIndex;
        var difficultyMultiplier = Game.game.difficultyMultiplier;
        if (typeof Game.missions[missionIndex] === 'undefined') {
            missionIndex = 0;
            difficultyMultiplier++;
        }
        Game.currentMission = Game.missions[missionIndex];
        Game.saveGame({
            currentMissionIndex: missionIndex,
            difficultyMultiplier: difficultyMultiplier
        });
    },

    run: function() {
        this.loadSettings();
        PIXI.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.renderer = new PIXI.autoDetectRenderer(null, null, {
            backgroundColor: 0x1099cc
        });
        this.renderer.view.setAttribute('class', 'renderer');
        this.stage = new PIXI.Container();
        document.body.appendChild(this.renderer.view);
        window.onresize = function() {
            Game.resize();
        };
        Game.resize();
        this.setStage(Game.Stage.Menu);
        Game.render();
    },

    loadSettings: function() {
        var storedSettings = window.localStorage.getItem('settings');
        if (storedSettings === null) {
            return Game.settings;
        }
        try {
            storedSettings = JSON.parse(storedSettings);
        } catch (Exception) {
            return Game.settings;
        }
        return _.merge(Game.settings, storedSettings);
    },

    saveSetting: function(objSetting) {
        var settings = _.merge(this.loadSettings(), objSetting);
        window.localStorage.setItem('settings', JSON.stringify(settings));
        Game.settings = settings;
    },

    loadGame: function() {
        var storedGame = window.localStorage.getItem('game');
        if (storedGame === null) {
            return Game.game;
        }
        try {
            storedGame = JSON.parse(storedGame);
        } catch (Exception) {
            return Game.game;
        }
        return _.merge(Game.game, storedGame);
    },

    saveGame: function(objGame) {
        var game = _.merge(this.loadGame(), objGame);
        window.localStorage.setItem('game', JSON.stringify(game));
        Game.game = game;
    },

    setStage: function(Stage) {
        if (this.currentStage !== null) {
            this.currentStage.stop();
        }
        this.currentStage = new Stage();
        this.currentStage.load(function() {
            Game.currentStage.start();
        });
    },

    /**
     * Resize the resolution of the game
     * @param width || window.innerWidth
     * @param height || window.innerHeight
     */
    resize: function(width, height) {
        width = width || Game.settings.video.resolution.width || window.innerWidth;
        height = height || Game.settings.video.resolution.height || window.innerHeight;
        this.renderer.resize(width, height);
        Game.settings.video.resolution.width = width;
        Game.settings.video.resolution.height = height;
    },

    /**
     * The main loop of the application
     * @param t
     */
    render: function(t) {
        if (Game.currentStage === null) {
            requestAnimationFrame(Game.render);
            return;
        }
        for (var i = 0; i < Game.currentStage.objects.length; i++) {
            var object = Game.currentStage.objects[i];
            object.update();
        }
        Game.renderer.render(Game.stage);
        requestAnimationFrame(Game.render);
    }
};
