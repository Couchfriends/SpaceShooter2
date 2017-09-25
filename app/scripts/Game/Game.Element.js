/**
 * Global object class
 * @constructor
 */
Game.Element = function () {

    /**
     * Pixi.js object
     * @type {{}}
     */
    this.object = {};

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

    init: function () {

    },

    add: function () {
        Game.currentStage.objects.push(this);
        if (this.object !== {}) {
            this.object.Element = this;
            Game.stage.addChild(this.object);
        }
        this.fireEvents(this.events.add);
    },

    remove: function () {
        if (this.object !== {}) {
            Game.stage.removeChild(this.object);
        }
        var indexOf = Game.currentStage.objects.indexOf(this);
        Game.currentStage.objects.splice(indexOf, 1);
    },

    /**
     * Update function in gameloop. Might return false if update is not allowed.
     * @param time
     * @returns {boolean}
     */
    update: function (time) {
    },

    fireEvents: function (events) {
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            event.call(this);
        }
    }

};