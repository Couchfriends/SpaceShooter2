/**
 * Global object class
 * @constructor
 */
Game.Interaction = function() {

    this.mouseDown = false;
    this.mouseOver = false;

    this.addInteractions = function() {
        this.object.interactive = true;
        this.object.buttonMode = true;

        this.object.on('pointerdown', this.clickDown.bind(this))
            .on('pointerup', this.clickUp.bind(this))
            .on('pointerupoutside', this.clickUp.bind(this))
            .on('pointerover', this.mouseHover.bind(this))
            .on('pointerout', this.mouseOut.bind(this));
    };

    this.events.add.push(this.addInteractions);

    this.clickDown = function() {};
    this.clickUp = function() {};
    this.mouseHover = function() {};
    this.mouseOut = function() {}

};
