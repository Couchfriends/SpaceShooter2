/**
 * Global object class
 * @constructor
 */
Game.Element = function() {

    /**
     * Pixi.js object
     * @type {{}}
     */
    this.object = null;

    /**
     * List with events that can be added
     * @type {{add: Array, remove: Array}}
     */
    this.events = {
        'add': [],
        'remove': []
    };

    /**
     * The name/type of the object. Used for collision detection
     * @type {string}
     */
    this.name = 'element';
};

Game.Element.prototype = {

    init: function() {

    },

    add: function() {
        this.fireEvents(this.events.add);
        Game.currentStage.objects.push(this);
        if (this.object !== null) {
            Game.stage.addChild(this.object);
        }
    },

    remove: function() {
        this.fireEvents(this.events.remove);
        if (this.object !== null) {
            Game.stage.removeChild(this.object);
        }
        var indexOf = Game.currentStage.objects.indexOf(this);
        delete Game.currentStage.objects[indexOf]; //.splice(indexOf, 1);
    },

    /**
     * Update function in gameloop. Might return false if update is not allowed.
     * @param time
     * @returns {boolean}
     */
    update: function(time) {},

    fireEvents: function(events) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            event.call(this);
        }
    }

};
