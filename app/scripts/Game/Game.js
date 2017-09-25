var Game = Game || {

    renderer: null,
    stage: null,
    settings: {
        resolution: {
            width: 800,
            height: 600
        }
    },

    /**
     * The current stage to render
     */
    currentStage: null,

    run: function() {
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
        this.setStage(Game.Stage.Menu);
        Game.render();
        Game.resize();
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
        width = width || window.innerWidth;
        height = height || window.innerHeight;
        this.renderer.view.style.width = width + "px";
        this.renderer.view.style.height = height + "px";
        this.renderer.resize(width, height);
        this.settings.resolution.width = width;
        this.settings.resolution.height = height;
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
