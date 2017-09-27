var Game = Game || {

    renderer: null,
    stage: null,
    /**
     * Default settings
     */
    settings: {
        resolution: {
            width: null,
            height: null
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

    /**
     * The current stage to render
     */
    currentStage: null,

    run: function() {
        this.loadSettings();
        PIXI.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.renderer = new PIXI.autoDetectRenderer(null, null, {
            backgroundColor: 0x1099bb
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
        width = width || Game.settings.resolution.width || window.innerWidth;
        height = height || Game.settings.resolution.height || window.innerHeight;
        this.renderer.resize(width, height);
        Game.settings.resolution.width = width;
        Game.settings.resolution.height = height;
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
