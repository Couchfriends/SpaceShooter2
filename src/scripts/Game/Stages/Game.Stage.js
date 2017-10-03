/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage = function() {

    this.objects = [];

    this.preloadObjects = [];

    /**
     * Constructor
     */
    this.init = function() {

    };

    /**
     * Load the objects for this stage
     * Callback should always include start() of the currentScene. Game.currentScene.start();
     */
    this.load = function(callback) {
        if (this.preloadObjects.length === 0) {
            return callback();
        }
        var loader = new PIXI.loaders.Loader();
        for (var i = 0; i < this.preloadObjects.length; i++) {
            var sprite = this.preloadObjects[i];
            loader.add(sprite);
        }
        loader.on('progress', function(process) {});
        loader.load(callback);
    };

    this.start = function() {};

    /**
     * Callback before a new stage is rendered.
     */
    this.stop = function() {
        var i = this.objects.length;
        while (i--) {
            this.objects[i].remove();
        }
    };

    /**
     * The render function of the stage
     * @param delta
     */
    this.update = function(delta) {
    };

};
