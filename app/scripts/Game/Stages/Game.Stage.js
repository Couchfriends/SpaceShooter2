/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage = function() {

    this.objects = [];

    /**
     * Load the objects for this stage
     * @todo
     */
    this.load = function(callback) {
        if (typeof callback === 'function') {
            callback.call(this);
        }
    };

    this.start = function() {};

    /**
     * Callback before a new stage is rendered.
     * @param callback the callback after exit is complete
     */
    this.stop = function() {
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            object.remove();
        }
    };

    /**
     * The render function of the stage
     * @param t
     */
    this.render = function(t) {};

};
