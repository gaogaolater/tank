//type 1普通黄 2普通绿 3普通白 4轻型坦克 5重型坦克 
function Tank(x, y, type) {
    this.x = x;
    this.y = y;
    this.w = 28;
    this.h = 28;
    this.health = 1;
    this.life = 1;
    this.direction = 'up';
    this.speed = 4;
    this.picPositions = {
        "up": [2, 0],
        "down": [34, 0],
        "left": [66, 2],
        "right": [96, 2]
    };
    //在雪碧图中中的定位
    this.picPosition = this.picPositions.up;
    this.bullets = [];
}

Tank.prototype.setDirection = function (direction) {
    this.picPosition = this.picPositions[direction];
}

//检查边缘碰撞和墙壁的碰撞
Tank.prototype._checkCrash = function (direction, nextPosition) {
    var wallMinX, wallMaxX, wallY, wallX, wallMinY, wallMaxY;
    var maxX = GameMap.x;
    var maxItemX = GameMap.itemCount[0];
    var maxItemY = GameMap.itemCount[1];
    var x = nextPosition.x;
    var y = nextPosition.y;
    var nextTankPosition = {
        x: x,
        y: y,
        w: this.w,
        h: this.h
    }
    switch (this.direction) {
        case "up":
            if (y <= 0) return true;
            wallMinX = Math.floor(x / GameMap.itemSize[0]);
            wallMaxX = Math.floor((x + this.w) / GameMap.itemSize[0]);
            wallY = Math.floor(y / GameMap.itemSize[1]);
            for (var i = wallMinX; i <= wallMaxX; i++) {
                var mapItem = GameMap.currentMap[wallY][i];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        case "down":
            if (y + this.h >= GameMap.h) return true;
            wallMinX = Math.floor(x / GameMap.itemSize[0]);
            wallMaxX = Math.floor((x + this.w) / GameMap.itemSize[0]);
            wallY = Math.floor((y + this.h) / GameMap.itemSize[1]);
            for (var i = wallMinX; i <= wallMaxX; i++) {
                var mapItem = GameMap.currentMap[wallY][i];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        case "left":
            if (x <= 0) return true;
            wallMinY = Math.floor(y / GameMap.itemSize[1]);
            wallMaxY = Math.floor((y + this.h) / GameMap.itemSize[1]);
            wallX = Math.floor(x / GameMap.itemSize[0]);
            for (var i = wallMinY; i <= wallMaxY; i++) {
                var mapItem = GameMap.currentMap[i][wallX];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        default:
            if (x + this.w >= GameMap.w) return true;
            wallMinY = Math.floor(y / GameMap.itemSize[1]);
            wallMaxY = Math.floor((y + this.h) / GameMap.itemSize[1]);
            wallX = Math.floor((x + this.w) / GameMap.itemSize[0]);
            for (var i = wallMinY; i <= wallMaxY; i++) {
                var mapItem = GameMap.currentMap[i][wallX];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
    }

}



Tank.prototype.execute = function (command) {
    if (command == "up" || command == "down" || command == "left" || command == "right") {
        this.move(command);
    } else if (command == "fire") {
        this.fire();
    }
}

Tank.prototype.update = function (ctx) {
    this.ctx = ctx;

    ctx.drawImage(Resource.img, this.picPosition[0], this.picPosition[1], this.w, this.h, this.x, this.y, this.w, this.h);
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

Tank.prototype._nextPosition = function (direction) {
    var x = this.x, y = this.y;
    switch (this.direction) {
        case "up":
            y -= this.speed;
            break;
        case "down":
            y += this.speed;
            break;
        case "left":
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
    } else {
        //和墙壁、边缘的碰撞检测
        var nextPosition = this._nextPosition(this.direction);
        //if (this._checkCrash(this.direction, nextPosition) == false) {
            this.x = nextPosition.x;
            this.y = nextPosition.y;
        //}
    }
}

Tank.prototype.fire = function () {
    this.bullets.push(new Bullet(this));
}

Tank.prototype.hited = function () {

}

Tank.prototype.destory = function () {

}

