var Util = {
    createCanvas: function (width, height, isShow) {
        var mainCanvas = document.createElement("canvas");
        mainCanvas.width = width;
        mainCanvas.height = height;
        if (isShow === false) {
            mainCanvas.style.display = 'none';
        }
        document.body.appendChild(mainCanvas);
        return {
            dom: mainCanvas,
            ctx: mainCanvas.getContext("2d")
        };
    },
    //碰撞检测
    checkCollision: function (obj1, obj2) {
        if (obj1.y + obj1.h >= obj2.y && obj1.y <= obj2.y + obj2.h) {
            if (obj1.x + obj1.w >= obj2.x && obj1.x <= obj2.x + obj2.w) {
                return true;
            }
        }
        return false;
    },
    
}