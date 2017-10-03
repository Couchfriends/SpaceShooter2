Game.missions = [{
    "title": "Asteroid bullets",
    "content": "Welcome commandor,\n\nWe've been waiting for arrival and you're not a moment to late.\n" +
        "A big cluster of asteroids is expecting to hit Earth any moment and we need you to deal with it.\n" +
        "Be careful out there because our interstellar satellites may have picked something up that is not from this world...",
    "events": [
        {
            "type": "background-stars",
            "texture": "./data/images/backgrounds/stars.png",
            "options": {
                "layer": Game.layerBackgroundStars,
                "x": Game.settings.video.width / 2,
                "y": Game.settings.video.height / 2,
                "speed": {
                    "x": 0,
                    "y": .1
                },
                "remove": {
                    "x": 2000
                }
            },
            "counter": 0
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/earth.gif",
            "options": {
                "layer": Game.layerBackgroundNear,
                "x": Game.settings.video.width / 2,
                "y": -500,
                "speed": {
                    "x": 0,
                    "y": .5
                },
                "remove": {
                    "x": 900
                }
            },
            "counter": 0
        },
        // {
        //     "type": "background",
        //     "texture": "./data/images/backgrounds/asteroid-001.gif",
        //     "options": {
        //         "layer": Game.layerForeground,
        //         "x": Game.settings.video.width * .8,
        //         "y": -200,
        //         "speed": {
        //             "x": 0,
        //             "y": 2.5
        //         },
        //         "remove": {
        //             "x": 900
        //         }
        //     },
        //     "counter": 250
        // },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 100
            },
            "counter": 800
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 200
            },
            "counter": 850
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 300
            },
            "counter": 900
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 400
            },
            "counter": 950
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 500
            },
            "counter": 1000
        }
    ]
}];