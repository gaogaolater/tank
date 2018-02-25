var Spirit = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

var Mover = function (x, y, w, h, direction, speed) {
    Spirit.call(x, y, w, h);
    this.direction = direction;
    this.speed = this.speed;
    this.nextX = 0;
    this.nextY = 0;
}

Mover.prototype.move = function () {
    var next = this.getNextPosition();
    this.x = next.x;
    this.y = netx.y;
}

Mover.prototype.getNextPosition = function () {
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

//检查边缘碰撞和墙壁的碰撞
Mover.prototype.checkWallCollision = function () {
    var wallMinX, wallMaxX, wallY, wallX, wallMinY, wallMaxY;
    var x = this.x, y = this.y, w = this.w, h = this.h;
    switch (this.direction) {
        case Keys.up:
            if (y <= 0) return true;
            wallMinX = Math.floor(x / Level.itemSize[0]);
            wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
            wallY = Math.floor(y / Level.itemSize[1]);
            for (var i = wallMinX; i <= wallMaxX; i++) {
                var mapItem = Level.currentMap[wallY][i];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        case Keys.down:
            if (y + h >= Level.h) return true;
            wallMinX = Math.floor(x / Level.itemSize[0]);
            wallMaxX = Math.floor((x + w) / Level.itemSize[0]);
            wallY = Math.floor((y + h) / Level.itemSize[1]);
            for (var i = wallMinX; i <= wallMaxX; i++) {
                var mapItem = Level.currentMap[wallY][i];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        case Keys.left:
            if (x <= 0) return true;
            wallMinY = Math.floor(y / Level.itemSize[1]);
            wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
            wallX = Math.floor(x / Level.itemSize[0]);
            for (var i = wallMinY; i <= wallMaxY; i++) {
                var mapItem = Level.currentMap[i][wallX];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
        default:
            if (x + w >= Level.w) return true;
            wallMinY = Math.floor(y / Level.itemSize[1]);
            wallMaxY = Math.floor((y + h) / Level.itemSize[1]);
            wallX = Math.floor((x + w) / Level.itemSize[0]);
            for (var i = wallMinY; i <= wallMaxY; i++) {
                var mapItem = Level.currentMap[i][wallX];
                var mapType = mapItem.type;
                if (mapType != 0) {
                    return true;
                }
            }
            return false;
    }
}