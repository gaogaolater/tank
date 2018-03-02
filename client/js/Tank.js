//type 1普通黄 2普通绿 3普通白 4轻型坦克 5重型坦克 
function Tank(x, y) {
    Mover.call(this, x, y, 26, 26, Keys.up, 1)
    this.health = 1;
    this.life = 2;
    this.direction = Keys.up;
    //在雪碧图中中的定位
    this.picPositions = {
        [Keys.up]: [3, 3],
        [Keys.down]: [35, 3],
        [Keys.left]: [68, 3],
        [Keys.right]: [96, 3]
    };
    this.bullets = [];
}

Tank.prototype = new Mover();

Tank.prototype.move = function () {
    var next = this.getNextPosition();
    this.x = next.x;
    this.y = next.y;
    Sound.move.playOnce();
}

Tank.prototype.fire = function () {
    this.bullets.push(BulletPool.get().init(this));
    Sound.attack.play();
}

Tank.prototype.destory = function () {
    Sound.playerDestory.play();
}

//重型坦克
function TankWeight(x, y) {
    Tank.call(this, x, y);
    this.life = 4;
    this.speed = 0.5;
    this.w = 28;
    this.h = 28;
    this.direction = Keys.down;
    this.picPositions = {
        [Keys.up]: [3, 66],
        [Keys.down]: [35, 66],
        [Keys.left]: [66, 66],
        [Keys.right]: [98, 66]
    };
    this.timerFire = null;
    this.AIPath
}

TankWeight.prototype = new Tank();

TankWeight.prototype.destroy = function () {
    clearInterval(this.timerFire);
    Sound.tankDestory.play();
    TankPool.recycle(this);
}

TankWeight.prototype.AI = function () {
    var _this = this;
    /*
    坦克AI
    //寻找最佳路径
    标注不能走的  走能走的  随时射击
    */
    var collision = Context.checkWallCollision(this.getNextPosition());
    if (collision.type == MapItem.nothing || collision.type == MapItem.grass) {
        this.move();
    } else {
        var direction = null;
        switch (parseInt(Math.random() * 10) % 4) {
            case 0:
                direction = Keys.up;
                break;
            case 1:
                direction = Keys.down;
                break;
            case 2:
                direction = Keys.left;
                break;
            default:
                direction = Keys.right;
                break;
        }
        this.setDirection(direction);
    }
    this.update();
    if (this.timerFire == null) {
        this.timerFire = setInterval(function () {
            if (Context.status = 'running') {
                _this.fire();
            }
        }, (Math.random() * 10) % 4 + 2 * 1000);
    }
}

//轻型坦克
function TankLight(x, y) {
    Tank.call(this, x, y);
    this.life = 1;
    this.speed = 1.5;
    this.picPositions = {
        [Keys.up]: [3, 35],
        [Keys.down]: [35, 35],
        [Keys.left]: [68, 35],
        [Keys.right]: [96, 35]
    };
}
TankLight.prototype = new Tank();
