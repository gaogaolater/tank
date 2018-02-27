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

Tank.prototype.fire = function () {
    this.bullets.push(new Bullet(this));
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
    this.direction = Keys.down;
    this.picPositions = {
        [Keys.up]: [3, 66],
        [Keys.down]: [35, 66],
        [Keys.left]: [66, 66],
        [Keys.right]: [98, 66]
    };
    this.AI();
}

TankWeight.prototype = new Tank();

TankWeight.prototype.destory = function () {

}

TankWeight.prototype.AI = function () {
    var _this = this;
    // this.timer = setInterval(function () {
    //     var random = parseInt(Math.random() * 10) % 5;
    //     switch (random) {
    //         case 0:
    //             _this.setDirection(Keys.up);
    //             _this.move();
    //             break;
    //         case 1:
    //             _this.setDirection(Keys.down);
    //             _this.move();
    //             break;
    //         case 2:
    //             _this.setDirection(Keys.left);
    //             _this.move();
    //             break;
    //         case 3:
    //             _this.setDirection(Keys.right);
    //             _this.move();
    //             break;
    //         default:
    //             _this.fire();
    //             break;
    //     }
    // }, 20);
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
