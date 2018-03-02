var TankPool = {
    pool: [],
    get: function () {
        if (this.pool.length == 0) {
            return new TankWeight();
        } else {
            return this.pool.shift();
        }
    },
    recycle: function (tank) {
        this.pool.push(tank);
    }
}

var BulletPool = {
    pool: [],
    get: function () {
        if (this.pool.length == 0) {
            return new Bullet();
        } else {
            return this.pool.shift();
        }
    },
    recycle: function (bullet) {
        this.pool.push(bullet);
    }
}