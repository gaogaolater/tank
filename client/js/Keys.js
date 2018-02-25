var Keys = {
    up: 87,
    down: 83,
    left: 65,
    right: 68,
    fire: 32,
    isDirection: function (command) {
        if (command == this.up || command == this.down || command == this.left || command == this.right) {
            return true;
        }
        return false;
    },
    isFire: function (command) {
        return command == this.fire;
    },
    isValidate: function (command) {
        if (this.isDirection(command) || this.isFire(command)) {
            return true;
        }
        return false;
    }
}