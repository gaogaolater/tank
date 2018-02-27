function Bullet(tank) {
    Mover.call(this, tank.x, tank.y, 5, 5, tank.direction, 4);
    this.tank = tank;
    this.w = 5;
    this.y = 5;
    this.direction = tank.direction;
    this._fixPosition();
    this.bombFrames = [
        [320, 0, 32, 32],
        [353, 0, 32, 32],
        [383, 0, 32, 32]
    ]
}

Bullet.prototype = new Mover();

//修正子弹位置 和雪碧图位置
Bullet.prototype._fixPosition = function () {
    var offset = parseInt(this.tank.w / 2) - 2;
    switch (this.direction) {
        case Keys.up:
            this.x = this.tank.x + offset;
            this.y = this.tank.y;
            this.picPosition = [80, 96, 5, 6];
            break;
        case Keys.down:
            this.x = this.tank.x + offset;
            this.y = this.tank.y + this.tank.w;
            this.picPosition = [86, 96, 5, 6];
            break;
        case Keys.left:
            this.x = this.tank.x;
            this.y = this.tank.y + offset;
            this.picPosition = [92, 96, 7, 5];
            break;
        default:
            this.x = this.tank.x + this.tank.w;;
            this.y = this.tank.y + offset;
            this.picPosition = [98, 96, 7, 5];
            break;
    }
}

Bullet.prototype._fixBombPosition = function () {
    var offset = 16;
    switch (this.direction) {
        case Keys.up:
            this.x = this.tank.x;
            break;
        case Keys.down:
            this.x = this.tank.x;
            this.y -= offset;
            break;
        case Keys.left:
            this.y = this.tank.y
            break;
        default:
            this.x -= offset;
            this.y = this.tank.y
            break;
    }
}

Bullet.prototype.destroy = function () {
    var bullets = this.tank.bullets.remove(this);
    this.bomb();
}

Bullet.prototype.bomb = function () {
    this._fixBombPosition();
    this.animate(this.bombFrames);
}

Bullet.prototype.update = function () {
    Context.ctx.drawImage(Resource.img, this.picPosition[0], this.picPosition[1], this.picPosition[2], this.picPosition[3], this.x, this.y, this.picPosition[2], this.picPosition[3]);
}