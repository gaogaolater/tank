(function () {
    Resource = {};
    Resource.img = null;
    Resource.init = function (callback) {
        var img = new Image();
        Resource.img = img;
        img.src = "./image/tankAll.gif";
        img.onload = function () {
            callback();
        }
    }
})()

