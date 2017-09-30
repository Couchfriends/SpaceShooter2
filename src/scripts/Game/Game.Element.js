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

    addedTo: {},

    init: function() {

    },

    add: function(to) {
        this.fireEvents(this.events.add);
        Game.currentStage.objects.push(this);
        if (this.object !== null) {
            this.object.element = this;
            to = to || Game.app.stage;
            to.addChild(this.object);
            this.addedTo = to;
        }
    },

    remove: function() {
        this.fireEvents(this.events.remove);
        if (this.object !== null) {
            this.addedTo.removeChild(this.object);
        }
        var indexOf = Game.currentStage.objects.indexOf(this);
        delete Game.currentStage.objects[indexOf]; //.splice(indexOf, 1);
    },

    /**
     * Update function in gameloop. Might return false if update is not allowed.
     * @param time
     * @returns {boolean}
     */
    update: function(delta) {},

    fireEvents: function(events) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            event.call(this);
        }
    }

};
