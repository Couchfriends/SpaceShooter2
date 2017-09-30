/**
 * The main Stage object of a stage in game. E.g. used for a level, game, etc
 * @constructor
 */
Game.Button = function() {

    Game.Element.call(this);
    Game.Interaction.call(this);

    this.name = 'Button';
    this.style = {
        font: '28px silkscreennormal',
        fill: '#ffffff'
    };
};

Game.Button.prototype = Game.Element.prototype;
for (var prop in Game.Interaction.prototype) {
    Game.Button.prototype[prop] = Game.Interaction.prototype[prop];
}



Game.Button.prototype.init = function(label) {
    this.label = label;
    var text = new PIXI.Text(label, this.style);
    text.x = Game.app.renderer.width / 2;
    this.object = text;
};
