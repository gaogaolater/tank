//碰撞类型
CollisionType = {
    edge: 1,
    wall: 2,
    no: 3,
    tank: 4
}

Audio.prototype.playOnce = function () {
    if (this.playing !== true) {
        this.playing = true;
        this.play();
        this.addEventListener('ended', function () {
            this.playing = false;
        });
    }
}

Sound = {
    start: new Audio("audio/start.mp3"),
    bulletDestory: new Audio("audio/bulletCrack.mp3"),
    tankDestory: new Audio("audio/tankCrack.mp3"),
    playerDestory: new Audio("audio/playerCrack.mp3"),
    move: new Audio("audio/move.mp3"),
    attack: new Audio("audio/attack.mp3"),
    prop: new Audio("audio/prop.mp3"),
}

Keys = {
    up: 87,
    down: 83,
    left: 65,
    right: 68,
    fire: 32,
    isDirection: function (command) {
        if (command == this.up || command == this.down || command == this.left || command == this.right) {
            return true;
        }
        return false;
    },
    isFire: function (command) {
        return command == this.fire;
    },
    isValidate: function (command) {
        if (this.isDirection(command) || this.isFire(command)) {
            return true;
        }
        return false;
    }
}