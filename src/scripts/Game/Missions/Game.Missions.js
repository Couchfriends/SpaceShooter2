Game.missions = [{
    "title": "Asteroid bullets",
    "content": "Welcome commandor,\n\nWe've been waiting for arrival and you're not a moment to late.\n" +
        "A big cluster of asteroids is expecting to hit Earth any moment and we need you to deal with it.\n" +
        "Be careful out there because our interstellar satellites may have picked something up that is not from this world...",
    "events": [
        {
            "type": "background-stars",
            "texture": "./data/images/backgrounds/stars.gif",
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
                "layer": Game.layerBackground,
                "x": Game.settings.video.width / 2,
                "y": -256,
                "speed": {
                    "x": 0,
                    "y": .5
                },
                "remove": {
                    "y":  Game.settings.video.height + 256
                }
            },
            "counter": 0
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/moon.gif",
            "options": {
                "layer": Game.layerBackgroundNear,
                "x": (Game.settings.video.width / 2) + 200,
                "y": -256,
                "speed": {
                    "x": 0,
                    "y": .6
                },
                "remove": {
                    "y": Game.settings.video.height + 128
                }
            },
            "counter": 360
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
            "counter": 400
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 200
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 300
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 400
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 500
            },
            "counter": 50
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/enemy002.gif",
            "options": {
                "layer": Game.layerBackgroundFar,
                "x": Game.settings.video.width + 16,
                "y": (Game.settings.video.height / 2) - 100,
                "speed": {
                    "x": -2,
                    "y": 0
                },
                "remove": {
                    "x": -16
                }
            },
            "counter": 20
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": Game.settings.video.width - 100
            },
            "counter": 250
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": Game.settings.video.width - 200
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": Game.settings.video.width - 300
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": Game.settings.video.width - 400
            },
            "counter": 50
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": Game.settings.video.width - 500
            },
            "counter": 50
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/enemy001.gif",
            "options": {
                "layer": Game.layerBackgroundFar,
                "x": Game.settings.video.width + 16,
                "y": Game.settings.video.height / 2,
                "speed": {
                    "x": -4,
                    "y": 0
                },
                "remove": {
                    "x": -16
                }
            },
            "counter": 250
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/enemy001.gif",
            "options": {
                "layer": Game.layerBackgroundFar,
                "x": Game.settings.video.width + 16,
                "y": Game.settings.video.height / 2,
                "speed": {
                    "x": -4,
                    "y": 0
                },
                "remove": {
                    "x": -16
                }
            },
            "counter": 20
        },
        {
            "type": "background",
            "texture": "./data/images/backgrounds/enemy001.gif",
            "options": {
                "layer": Game.layerBackgroundFar,
                "x": Game.settings.video.width + 16,
                "y": Game.settings.video.height / 2,
                "speed": {
                    "x": -4,
                    "y": 0
                },
                "remove": {
                    "x": -16
                }
            },
            "counter": 20
        }
    ]
}];