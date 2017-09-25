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
        this.object.on('pointerdown', this.clickDown.bind(this));
        this.object.on('pointerup', this.clickUp.bind(this));
        this.object.on('pointerupoutside', this.clickUp.bind(this));
        this.object.on('pointerover', this.mouseHover.bind(this));
        this.object.on('pointerout', this.mouseOut.bind(this));

        this.object.on('mousedown', this.clickDown.bind(this));
        this.object.on('mouseup', this.clickUp.bind(this));
        this.object.on('mouseupoutside', this.clickUp.bind(this));
        this.object.on('mouseover', this.mouseHover.bind(this));
        this.object.on('mouseout', this.mouseOut.bind(this));

        this.object.on('touchstart', this.clickDown.bind(this));
        this.object.on('touchend', this.clickUp.bind(this));
        this.object.on('touchendoutside', this.clickUp.bind(this));
    };

    this.events.add.push(this.addInteractions);

    this.clickDown = function() {
    };
    this.clickUp = function() {
    };
    this.mouseHover = function() {
    };
    this.mouseOut = function() {
    }

};
