var Context = {
    level: 1,
    status: 'stop',//stop pause running
    mainTank: null,
    width: 416,
    height: 416,
    ctx: null,
    enemy: [],//敌军坦克
    lastEnumyCount: Level.maxEnemy,//剩余敌军坦克
    initMainCanvas: function () {
        var canvas = Util.createCanvas(this.width, this.height, true);
        this.ctx = canvas.ctx;
    },
    init: function () {
        Level.init();
        this.initMainCanvas();
        this.mainTank = new Tank(0, 0);
        this.initKeyEvent();
        this.status = "running";
        this.loop();
    },
    addEnemy: function () {
        //添加敌人
        
    },
    bulletCollision: function(){
        //子弹碰撞检测

    },
    //执行命令
    excuteCommand: function () {
        if (this.commands.length > 0) {
            for (var i = 0; i < this.commands.length; i++) {
                var command = this.commands[i];
                // WallCollision();
                // BulletCollision();
                if (this.checkKeyCode(command)) {
                    this.mainTank.execute(command);
                }
                if (command == Keys.fire) {
                    this.commands.remove(command);
                }
            }
        }
        this.mainTank.update(this.ctx);
    },
    loop: function () {
        var _this = this;
        if (this.status == 'running') {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(Level.dom, 0, 0, this.width, this.height);
            this.excuteCommand();
            this.addEnemy();
            this.bulletCollision();
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
    //检查边缘碰撞和墙壁的碰撞
    checkWallCollision = function (direction, nextPosition) {
        var wallMinX, wallMaxX, wallY, wallX, wallMinY, wallMaxY;
        var maxX = Level.x;
        var maxItemX = Level.itemCount[0];
        var maxItemY = Level.itemCount[1];
        var x = nextPosition.x;
        var y = nextPosition.y;
        var nextTankPosition = {
            x: x,
            y: y,
            w: this.w,
            h: this.h
        }
        switch (this.direction) {
            case Keys.up:
                if (y <= 0) return true;
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + this.w) / Level.itemSize[0]);
                wallY = Math.floor(y / Level.itemSize[1]);
                for (var i = wallMinX; i <= wallMaxX; i++) {
                    var mapItem = Level.currentMap[wallY][i];
                    var mapType = mapItem.type;
                    if (mapType != 0) {
                        return true;
                    }
                }
                return false;
            case Keys.down:
                if (y + this.h >= Level.h) return true;
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + this.w) / Level.itemSize[0]);
                wallY = Math.floor((y + this.h) / Level.itemSize[1]);
                for (var i = wallMinX; i <= wallMaxX; i++) {
                    var mapItem = Level.currentMap[wallY][i];
                    var mapType = mapItem.type;
                    if (mapType != 0) {
                        return true;
                    }
                }
                return false;
            case Keys.left:
                if (x <= 0) return true;
                wallMinY = Math.floor(y / Level.itemSize[1]);
                wallMaxY = Math.floor((y + this.h) / Level.itemSize[1]);
                wallX = Math.floor(x / Level.itemSize[0]);
                for (var i = wallMinY; i <= wallMaxY; i++) {
                    var mapItem = Level.currentMap[i][wallX];
                    var mapType = mapItem.type;
                    if (mapType != 0) {
                        return true;
                    }
                }
                return false;
            default:
                if (x + this.w >= Level.w) return true;
                wallMinY = Math.floor(y / Level.itemSize[1]);
                wallMaxY = Math.floor((y + this.h) / Level.itemSize[1]);
                wallX = Math.floor((x + this.w) / Level.itemSize[0]);
                for (var i = wallMinY; i <= wallMaxY; i++) {
                    var mapItem = Level.currentMap[i][wallX];
                    var mapType = mapItem.type;
                    if (mapType != 0) {
                        return true;
                    }
                }
                return false;
        }

    }
}