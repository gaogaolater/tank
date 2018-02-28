var Game = {
    start: function () {
        Resource.init(function () {
            Context.init();
        });
    },
    pause: function () {
        Context.pause();
    },
    resume: function () {
        Context.resume();
    },
    debug: false
}