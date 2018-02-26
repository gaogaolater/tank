var Context = {
    level: 1,
    status: 'stop',//stop pause running
    mainTank: null,
    width: 416,
    height: 416,
    ctx: null,
    enemy: [],//敌军坦克
    lastEnumyCount: Level.maxEnemy,//剩余敌军坦克
    commands: [],
    initMainCanvas: function () {
        var canvas = Util.createCanvas(this.width, this.height, true);
        this.ctx = canvas.ctx;
    },
    init: function () {
        Level.init();
        this.initMainCanvas();
        this.mainTank = new Tank(1, 2);
        this.initKeyEvent();
        this.status = "running";
        this.loop();
    },
    addEnemy: function () {
        //添加敌人

    },
    //子弹碰撞检测
    bulletCollision: function () {
        //主体坦克子弹碰撞
        this.mainTank.bullets.forEach(function (bullet) {
            //判断是否击中地图对象或超出边缘

            //判断是否击中地图敌方坦克

            //判断是否击中敌方坦克子弹            

        })
        //敌军子弹碰撞
        if (this.enemy.length > 0) {
            this.enemy.bullets.forEach(function (bullet) {

            })
        }
    },
    //执行命令
    excuteCommand: function () {
        if (this.commands.length > 0) {
            for (var i = 0; i < this.commands.length; i++) {
                var command = this.commands[i];
                var mainTank = this.mainTank;
                if (Keys.isDirection(command)) {
                    mainTank.setDirection(command);
                    var nextPosition = mainTank.getNextPosition();
                    if(this.checkWallCollision(nextPosition) == false){
                        this.mainTank.move(command);
                    }
                } else if (Keys.isFire(command)) {
                    this.mainTank.fire();
                    this.commands.remove(command);
                }
            }
        }
    },
    loop: function () {
        var _this = this;
        if (this.status == 'running') {
            this.ctx.clearRect(0, 0, this.width, this.height);
            //业务处理
            this.excuteCommand();
            this.addEnemy();
            this.bulletCollision();

            //更新视图
            this.ctx.drawImage(Level.dom, 0, 0, this.width, this.height);
            this.mainTank.update(this.ctx);
            requestAnimationFrame(function () {
                _this.loop();
            });
        }
    },
    initKeyEvent: function () {
        var _this = this;
        document.onkeydown = function (event) {
            //上38 下40 左37 右39 空格32
            var keyCode = event.keyCode;
            console.log('keyCode', keyCode);
            if (Keys.isValidate(keyCode)) {
                console.log(keyCode);
                _this.commands.addIfNotExist(keyCode);
            }
        }
        document.onkeyup = function (event) {
            var keyCode = event.keyCode;
            _this.commands.remove(keyCode);
        }
    },
    //检查边缘碰撞和墙壁的碰撞
    checkWallCollision: function (obj) {
        var wallMinX, wallMaxX, wallY, wallX, wallMinY, wallMaxY;
        var x = obj.x, y = obj.y, w = obj.w, h = obj.h;
        switch (obj.direction) {
            case Keys.up:
                if (y <= 0) return true;
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
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
                if (y + h >= Level.h) return true;
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
                wallY = Math.floor((y + h) / Level.itemSize[1]);
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
                wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
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
                if (x + w >= Level.w) return true;
                wallMinY = Math.floor(y / Level.itemSize[1]);
                wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
                wallX = Math.floor((x + w) / Level.itemSize[0]);
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