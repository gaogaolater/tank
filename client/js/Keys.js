var Keys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    fire: 32,
    isDirection: function (command) {
        if (command == this.up || command == this.down || command == this.left || command == this.right) {
            return true;
        }
        return false;
    }
}