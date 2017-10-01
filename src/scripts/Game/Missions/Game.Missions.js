Game.missions = [{
    "title": "Asteroid bullets",
    "content": "Welcome commandor,\n\nWe've been waiting for arrival and you're not a moment to late.\n" +
        "A big cluster of asteroids is expecting to hit Earth any moment and we need you to deal with it.\n" +
        "Be careful out there because our interstellar satellites may have picked something up that is not from this world...",
    "events": [
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 100
            },
            "counter": 120
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 200
            },
            "counter": 180
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 300
            },
            "counter": 240
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 400
            },
            "counter": 300
        },
        {
            "type": "enemy",
            "enemy": Game.Entity.Enemy.Asteroid,
            "options": {
                "x": 500
            },
            "counter": 360
        }
    ]
}];
