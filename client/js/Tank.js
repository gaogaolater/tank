//type 1普通黄 2普通绿 3普通白 4轻型坦克 5重型坦克 
function Tank(x, y) {
    this.x = x;
    this.y = y;
    this.w = 26;
    this.h = 26;
    this.health = 1;
    this.life = 2;
    this.direction = Keys.up;
    this.speed = 1;
    //在雪碧图中中的定位
    this.picPositions = {
        [Keys.up]: [3, 3],
        [Keys.down]: [35, 3],
        [Keys.left]: [68, 3],
        [Keys.right]: [96, 3]
    };
    this.bullets = [];
}

Tank.prototype.setDirection = function (direction) {
    this.picPosition = this.picPositions[direction];
}

Tank.prototype.execute = function (command) {
    if (Keys.isDirection(command)) {
        this.move(command);
    } else if (command == Keys.fire) {
        this.fire();
    }
}

Tank.prototype.update = function (ctx) {
    this.ctx = ctx;
    var picPosition = this.picPositions[this.direction]
    ctx.drawImage(Resource.img, picPosition[0], picPosition[1], this.w, this.h, this.x, this.y, this.w, this.h);
    if (Game.debug) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
    if (this.bullets.length > 0) {
        for (var i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].update(ctx) == false) {
                this.bullets.splice(i, 1);
            }
        }
    }
}

Tank.prototype.getNextPosition = function (direction) {
    var x = this.x, y = this.y;
    switch (this.direction) {
        case Keys.up:
            y -= this.speed;
            break;
        case Keys.down:
            y += this.speed;
            break;
        case Keys.left:
            x -= this.speed;
            break;
        default:
            x += this.speed;
            break;
    }
    return { x: x, y: y }
}

Tank.prototype.move = function (direction) {
    if (this.direction != direction) {
        this.direction = direction;
        this.setDirection(direction)
    }
    //和墙壁、边缘的碰撞检测
    var nextPosition = this._nextPosition(this.direction);
    if (this._checkCrash(this.direction, nextPosition) == false) {
        this.x = nextPosition.x;
        this.y = nextPosition.y;
    }
}

Tank.prototype.fire = function () {
    this.bullets.push(new Bullet(this));
}

Tank.prototype.hited = function () {

}

Tank.prototype.destory = function () {

}

//重型坦克
function TankWeight(x, y) {
    Tank.call(this, x, y);
    this.life = 4;
    this.speed = 0.5;
    this.w = 28;
    this.h = 28;
    this.picPositions = {
        [Keys.up]: [3, 66],
        [Keys.down]: [35, 66],
        [Keys.left]: [66, 66],
        [Keys.right]: [98, 66]
    };
}
TankWeight.prototype = new Tank();

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
