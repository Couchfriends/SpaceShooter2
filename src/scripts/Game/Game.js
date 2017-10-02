var Game = Game || {

    app: null,
    /**
     * Bump collision plugin
     */
    bump: null,
    /**
     * Default settings
     */
    settings: {
        video: {
            width: 1920,
            height: 1080,
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

    status: 'pauze',

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
     * The event of the mouse pointer lock API will be updated here.
     * Default movementX and movementY will be used
     */
    mouse: {
        movementX: 0,
        movementY: 0
    },

    /**
     * The current stage to render
     */
    currentStage: null,

    run: function() {
        document.getElementById('loader').style.display = 'none';
        this.bump = new Bump(PIXI);
        this.loadSettings();
        PIXI.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        // PIXI.BaseTexture.SCALE_MODE.DEFAULT = PIXI.BaseTexture.SCALE_MODE.NEAREST;
        this.app = new PIXI.Application(Game.settings.video.width, Game.settings.video.height, {
            backgroundColor: 0x100710
        });
        this.app.view.setAttribute('class', 'renderer');
        document.body.appendChild(this.app.view);
        this.app.start();
        this.setStage(Game.Stage.Menu);
        Game.setEvents();
        this.app.ticker.add(function(delta) {
            Game.update(delta);
        });
        Game.resize();
    },

    setEvents: function() {
        window.onresize = function() {
            Game.resize();
        };
        Game.app.view.oncontextmenu = function(e) {
            e.preventDefault();
        };
        document.addEventListener('pointerlockchange', Game.pointerLockChanged, false);
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

    /**
     * Set the current mission
     * @param missionIndex optional next mission index. If the last mission is finished, restart with more difficult.
     */
    setMission: function(missionIndex) {
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
     * Add score. Do not save the game here.
     * @param score
     */
    addScore: function(score) {
        score = score || 0;
        Game.game.score += score;
    },

    /**
     * Add money. Do not save the game here.
     * @param money
     */
    addMoney: function(money) {
        money = money || 0;
        Game.game.money += money;
    },

    /**
     * Resize the resolution of the game
     */
    resize: function() {

        var widthToHeight = 16 / 9;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        Game.app.renderer.view.style.width = newWidth + 'px';
        Game.app.renderer.view.style.height = newHeight + 'px';
    },

    pointerLockChanged: function() {
        if (document.pointerLockElement !== Game.app.renderer.view) {
            Game._removePointerLock();
        }
    },

    pointerLock: function() {
        Game.app.renderer.view.requestPointerLock();
        Game.app.renderer.view.addEventListener("mousemove", Game.updateMousePosition, false);
        Game.status = 'play';
    },

    exitPointerLock: function() {
        document.exitPointerLock();
        Game._removePointerLock();
    },

    _removePointerLock: function() {
        Game.app.renderer.view.removeEventListener("mousemove", Game.updateMousePosition, false);
        Game.mouse.movementX = 0;
        Game.mouse.movementY = 0;
        Game.status = 'pauze';
    },

    updateMousePosition: function(event) {
        Game.mouse.movementX = event.movementX;
        Game.mouse.movementY = event.movementY;
    },

    /**
     * The main loop of the application
     * @param delta
     */
    update: function(delta) {
        if (Game.currentStage === null) {
            return;
        }
        for (var i = 0; i < Game.currentStage.objects.length; i++) {
            var object = Game.currentStage.objects[i];
            object.update(delta);
        }
        Game.currentStage.update(delta);
    }
};
