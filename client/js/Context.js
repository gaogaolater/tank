var Context = {
    level: 1,
    status: 'stop',//stop pause running
    tanks: [],
    mainTank: null,
    width: 416,
    height: 416,
    ctx: null,
    addTank: function (tank) {
        this.tanks.push(tank);
    },
    initMainCanvas: function () {
        var mainCanvas = document.createElement("canvas");
        mainCanvas.width = this.width;
        mainCanvas.height = this.height;
        var ctx = mainCanvas.getContext("2d");
        this.ctx = ctx;
        document.body.appendChild(mainCanvas);
    },
    init: function () {
        GameMap.drawLevel(this.level);
        this.initMainCanvas();
        var tank = new Tank(0, 0, 1);
        this.mainTank = tank;
        this.addTank(tank);
        this.initKeyEvent();
        this.status = "running";
        this.loop();
    },
    stop: function () {

    },
    pause: function () {

    },
    loop: function () {
        var _this = this;
        if (this.status == 'running') {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(GameMap.mapDom, 0, 0, this.width, this.width);
            if (this.commands.length > 0) {
                for (var i = 0; i < this.commands.length; i++) {
                    var command = this.commands[i];
                    if (this.checkKeyCode(command)) {
                        this.tanks[0].execute(command);
                    }
                    if (command == Keys.fire) {
                        this.commands.remove(command);
                    }
                }
            }
            this.tanks[0].update(this.ctx);
            requestAnimationFrame(function () {
                _this.loop();
            });
        }
    },
    checkKeyCode: function (keyCode) {
        if (keyCode == 38 || keyCode == 40 || keyCode == 37 || keyCode == 39 || keyCode == 32) {
            return true;
        }
        return false;
    },
    commands: [],
    initKeyEvent: function () {
        var _this = this;
        document.onkeydown = function (event) {
            //上38 下40 左37 右39 空格32
            var keyCode = event.keyCode;
            if (_this.checkKeyCode(keyCode)) {
                _this.commands.addIfNotExist(keyCode);
            }
        }
        document.onkeyup = function (event) {
            var keyCode = event.keyCode;
            _this.commands.remove(keyCode);
        }
    },
    checkCrash: function (obj1, obj2) {
        console.log('Context checkcrash', obj1, obj2);
        if (obj1.y + obj1.h >= obj2.y && obj1.y <= obj2.y + obj2.h) {
            if (obj1.x + obj1.w >= obj2.x && obj1.x <= obj2.x + obj2.w) {
                return true;
            }
        }
        return false;
    }
}