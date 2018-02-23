function Bullet(tank) {
    this.tank = tank;
    this.startX = null;
    this.startY = null;
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
    this.range = 200;//射程
    this.direction = tank.direction;
    this.speed = 4;
    this.picPosition = null;
    this._fixPosition();
    this.startX = this.x;
    this.startY = this.y;
}

//修正子弹位置 和雪碧图位置
Bullet.prototype._fixPosition = function () {
    var offset = parseInt(this.tank.w / 2) - 2;
    this.move = null;

    switch (this.direction) {
        case Keys.up:
            this.x = this.tank.x + offset;
            this.y = this.tank.y;
            this.move = function () { this.y -= this.speed; }
            this.picPosition = [80, 96, 5, 6];
            break;
        case Keys.down:
            this.x = this.tank.x + offset;
            this.y = this.tank.y + this.tank.w;
            this.move = function () { this.y += this.speed; }
            this.picPosition = [86, 96, 5, 6];
            break;
        case Keys.left:
            this.x = this.tank.x;
            this.y = this.tank.y + offset;
            this.move = function () { this.x -= this.speed; }
            this.picPosition = [92, 96, 7, 5];
            break;
        default:
            this.x = this.tank.x + this.tank.w;;
            this.y = this.tank.y + offset;
            this.move = function () { this.x += this.speed; }
            this.picPosition = [98, 96, 7, 5];
            break;
    }
}

Bullet.prototype.update = function (ctx) {
    this.move();
    ctx.drawImage(Resource.img, this.picPosition[0], this.picPosition[1], this.picPosition[2], this.picPosition[3], this.x, this.y, this.picPosition[2], this.picPosition[3]);
    if (Math.abs(this.startX - this.x) >= this.range || Math.abs(this.startY - this.y) >= this.range) {
        return false;
    } else {
        return true;
    }
}