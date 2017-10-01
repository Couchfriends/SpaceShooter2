var Game = Game || {

    app: null,
    /**
     * Default settings
     */
    settings: {
        video: {
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
        width: 1920,
        height: 1080,
        safeWidth: 1680,
        safeHeight: 720,
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
        this.loadSettings();
        // PIXI.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.app = new PIXI.Application(this.game.width, this.game.height, {
            backgroundColor: 0x1099bb
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
     * @param width || window.innerWidth
     * @param height || window.innerHeight
     */
    resize: function(width, height) {

        var viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        },
            game = Game.game,
            newGameWidth, newGameHeight, newGameX, newGameY;

        // Determine game size
        if (game.height / game.width > viewport.height / viewport.width) {
            if (game.safeHeight / game.width > viewport.height / viewport.width) {
                // A
                newGameHeight = viewport.height * game.height / game.safeHeight;
                newGameWidth = newGameHeight * game.width / game.height;
            } else {
                // B
                newGameWidth = viewport.width;
                newGameHeight = newGameWidth * game.height / game.width;
            }
        } else {
            if (game.height / game.safeWidth > viewport.height / viewport.width) {
                // C
                newGameHeight = viewport.height;
                newGameWidth = newGameHeight * game.width / game.height;
            } else {
                // D
                newGameWidth = viewport.width * game.width / game.safeWidth;
                newGameHeight = newGameWidth * game.height / game.width;
            }
        }

        Game.app.renderer.view.style.width = newGameWidth + "px";
        Game.app.renderer.view.style.height = newGameHeight + "px";

        // newGameX = (viewport.width - newGameWidth) / 2;
        // newGameY = (viewport.height - newGameHeight) / 2;

        // Set the new padding of the game so it will be centered
        // Game.renderer.view.style.margin = newGameY + "px " + newGameX + "px";
        //
        // width = width || window.innerWidth;
        // height = height || window.innerHeight;
        // Game.settings.video.resolution.width = width;
        // Game.settings.video.resolution.height = height;
        // Game.app.renderer.resize(newGameWidth, newGameHeight);
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

    counter: 0,

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
