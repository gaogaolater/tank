//type 1普通黄 2普通绿 3普通白 4轻型坦克 5重型坦克 
function Tank(x, y, ctx) {
    Mover.call(this, x, y, 26, 26, Keys.up, 1, ctx)
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
