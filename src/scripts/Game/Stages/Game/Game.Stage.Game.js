/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Stage.Game = function () {

    Game.Stage.call(this, arguments);

    this.preloadObjects = [
        './data/images/ship/ship001/hull.png',
        './data/images/ship/ship001/jet.png',
        './data/images/ship/ship001/gun001.png'
    ];

    this.nextEvent = false;
    this.gameCounter = 0;

    this.start = function () {
        var Player = new Game.Entity.Player();
        Player.init();
        Player.add();
        this.nextEvent = Game.currentMission.events[0];
    };

    this.update = function (delta) {
        if (this.nextEvent === false) {
            return;
        }
        this.gameCounter += delta;
        if (this.nextEvent.counter < this.gameCounter) {
            switch (this.nextEvent.type) {
                case "enemy":
                    var enemy = new this.nextEvent.enemy();
                    enemy.init();
                    enemy.add();
                    break;
            }
            var nextIndex = Game.currentMission.events.indexOf(this.nextEvent) + 1;
            if (typeof Game.currentMission.events[nextIndex] === 'undefined') {
                this.nextEvent = false;
            }
            else {
                this.nextEvent = Game.currentMission.events[nextIndex];
            }
        }
    };

};
Game.Stage.Game.prototype = Game.Stage.prototype;
