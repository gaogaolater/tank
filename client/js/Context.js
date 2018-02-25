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
                if (Keys.isDirection(command)) {
                    this.mainTank.setDirection(command);
                    if (this.checkWallCollision(this.mainTank) == false) {
                        this.mainTank.move(command);
                    }
                } else if (Keys.isFire(command)) {
                    this.mainTank.fire();
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
    
}