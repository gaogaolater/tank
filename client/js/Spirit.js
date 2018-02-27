var Spirit = function (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Spirit.prototype.animate = function (frames) {
    var index = 0;
    if (frames.length == 0) return;
    var _this = this;
    var timer = setInterval(function () {
        var frame = frames[index];
        var x = frame[0], y = frame[1], w = frame[2], h = frame[3];
        Context.loopEvent.push(function () {
            Context.ctx.drawImage(Resource.img, x, y, w, h, _this.x, _this.y, w, h);
        });
        index++;
        if (index == frames.length) {
            clearInterval(timer);
        }
    }, 80);
}

var Mover = function (x, y, w, h, direction, speed) {
    Spirit.call(this, x, y, w, h);
    this.direction = direction;
    this.speed = speed;
    this.nextX = 0;
    this.nextY = 0;
    //在雪碧图中中的定位
    // this.picPositions = {};
}
Mover.prototype = new Spirit();

Mover.prototype.setDirection = function (direction) {
    if (this.direction != direction) {
        this.direction = direction;
    }
    this.picPosition = this.picPositions[direction];
}

Mover.prototype.move = function () {
    var next = this.getNextPosition();
    this.x = next.x;
    this.y = next.y;
}

Mover.prototype.update = function () {
    var ctx = Context.ctx;
    var picPosition = this.picPositions[this.direction]
    ctx.drawImage(Resource.img, picPosition[0], picPosition[1], this.w, this.h, this.x, this.y, this.w, this.h);
    if (Game.debug) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}

Mover.prototype.getNextPosition = function () {
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
    return { x: x, y: y, w: this.w, h: this.h, direction: this.direction }
}