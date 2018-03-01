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
    this.bullets.push(new Bullet(this));
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
    this.timerDirection = null;
    this.AI();
}

TankWeight.prototype = new Tank();

TankWeight.prototype.destroy = function () {
    clearInterval(this.timerFire);
    clearInterval(this.timerDirection);
    Sound.tankDestory.play();
}

TankWeight.prototype.AI = function () {
    var _this = this;
    /*
    AI简单版本
    1、移动到同一个y轴 2、移动到同一个x轴 3、打
    AI复杂版本 找最优路径 打
    1、递归找四个方向找最短路径 如果前面的路被堵死 回到上一个路  优先考虑空白走法
    1、
    */
    // var maintank = Context.mainTank;
    // var xOffset = this.x - maintank.x;
    // var yOffset = this.y - maintank.y;
    // var direction = null;
    // if (Math.abs(xOffset) > 5) {
    //     direction = xOffset > 0 ? Keys.left : Keys.right;
    // } else if (Math.abs(yOffset) > 5) {
    //     direction = yOffset > 0 ? Keys.up : Keys.down;
    // }
    // //是否碰撞
    
    this.timerDirection = setInterval(function () {
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
        _this.setDirection(direction);
    }, 3000);
    this.timerFire = setInterval(function () {
        _this.fire();
    }, 4000);
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
