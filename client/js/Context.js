var Context = {
    width: 416,
    height: 416,
    init: function (level) {
        level = (level || 1);
        this.commands = [];
        this.level = level;
        this.loopEvent = [];
        this.lastEnumyCount = Level.maxEnemy;
        Level.init(level);
        this.enemy = [];
        if (!this.ctx) {
            this.ctx = Util.createCanvas(this.width, this.height, true).ctx;
        }
        var mainHome = Level.mainHome[0];
        this.mainTank = new Tank(mainHome[0], mainHome[1]);
        this.initKeyEvent();
        this.status = "running";
        this.loop();
    },
    addEnemy: function () {
        //添加敌人
        if (this.enemy.length < Level.maxAppearEnemy) {
            //随机一个老家出现
            var home = Level.enemyHome[parseInt(Math.random() * 10) % Level.enemyHome.length];
            this.enemy.push(new TankWeight(home[0], home[1]));
        }
    },
    removeEnemy: function (enemy) {
        this.enemy.remove(enemy);
        Level.enemyCount--;
        if (Level.enemyCount == 0) {
            if (this.level < 21) {
                Level.init(++this.level);
            } else {
                alert("通关了");
            }
        }
    },
    //判断是否击中地图对象或超出边缘
    bulletWallCollision: function (bullet) {
        var wallCollision = this.checkWallCollision(bullet);
        if (wallCollision.type == CollisionType.no) {
            bullet.move();
            bullet.update();
        } else if (wallCollision.type == CollisionType.wall) {
            Level.hitMap(wallCollision.x, wallCollision.y);
            bullet.destroy();
        } else if (wallCollision.type == CollisionType.edge) {
            bullet.destroy();
        }
    },
    //子弹碰撞检测
    bulletCollision: function () {
        var _this = this;
        var enemys = this.enemy;
        //主体坦克子弹碰撞
        this.mainTank.bullets.forEach(function (bullet) {
            _this.bulletWallCollision(bullet);
            //判断是否击中地图敌方坦克
            if (enemys.length > 0) {
                enemys.forEach(function (enemy) {
                    if (Util.checkCollision(enemy, bullet)) {
                        enemy.destroy();
                        _this.enemy.remove(enemy);
                        //减掉敌军坦克数量，判断是否最后一个
                        bullet.destroy();
                    }
                });
            }
        })
        //敌军子弹碰撞
        if (enemys.length > 0) {
            enemys.forEach(function (enemy) {
                enemy.bullets.forEach(function (bullet) {
                    _this.bulletWallCollision(bullet);
                    if (Util.checkCollision(_this.mainTank, bullet)) {
                        alert('你被击中了');
                        _this.init();
                    }
                })
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
                    var collision = this.checkWallCollision(nextPosition);
                    console.log(collision);
                    if (collision.type == CollisionType.no) {
                        this.mainTank.move(command);
                    }
                } else if (Keys.isFire(command)) {
                    this.mainTank.fire();
                    //需要立即移除
                    this.commands.remove(command);
                }
            }
        }
    },
    enemyAI: function () {
        var _this = this;
        this.enemy.forEach(function (enemy) {
            if (_this.checkWallCollision(enemy).type == CollisionType.no) {
                enemy.move();
            }
            enemy.update();
        });
    },
    loop: function () {
        var _this = this;
        if (this.status == 'running') {
            //注意画图顺序
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(Level.dom, 0, 0, this.width, this.height);
            //业务处理
            this.excuteCommand();
            this.addEnemy();
            this.bulletCollision();
            //更新视图
            this.mainTank.update();
            this.enemyAI();
            if (this.loopEvent.length > 0) {
                this.loopEvent.pop()();
            }
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
                if (y <= 0) return { type: CollisionType.edge };
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
                wallY = Math.floor(y / Level.itemSize[1]);
                for (var i = wallMinX; i <= wallMaxX; i++) {
                    if (Level.currentMap[wallY][i] != 0) {
                        return { type: CollisionType.wall, x: i, y: wallY };
                    }
                }
                return { type: CollisionType.no };
            case Keys.down:
                if (y + h >= Level.h) return { type: CollisionType.edge };
                wallMinX = Math.floor(x / Level.itemSize[0]);
                wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
                wallY = Math.floor((y + h) / Level.itemSize[1]);
                for (var i = wallMinX; i <= wallMaxX; i++) {
                    if (Level.currentMap[wallY][i] != 0) {
                        return { type: CollisionType.wall, x: i, y: wallY };
                    }
                }
                return { type: CollisionType.no };
            case Keys.left:
                if (x <= 0) return { type: CollisionType.edge };
                wallMinY = Math.floor(y / Level.itemSize[1]);
                wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
                wallX = Math.floor(x / Level.itemSize[0]);
                for (var i = wallMinY; i <= wallMaxY; i++) {
                    if (Level.currentMap[i][wallX] != 0) {
                        return { type: CollisionType.wall, x: wallX, y: i };
                    }
                }
                return { type: CollisionType.no };
            default:
                if (x + w >= Level.w) return { type: CollisionType.edge };
                wallMinY = Math.floor(y / Level.itemSize[1]);
                wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
                wallX = Math.floor((x + w) / Level.itemSize[0]);
                for (var i = wallMinY; i <= wallMaxY; i++) {
                    if (Level.currentMap[i][wallX] != 0) {
                        return { type: CollisionType.wall, x: wallX, y: i };
                    }
                }
                return { type: CollisionType.no };
        }
    }
}