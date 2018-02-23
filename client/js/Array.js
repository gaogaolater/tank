/****************　数组扩展 ********************/
Array.prototype.clear = function () {
    if (this.length > 0) {
        this.splice(0, this.length);
    }
}

Array.prototype.addIfNotExist = function (item) {
    if (this.contains(item) == false) {
        this.push(item);
    }
}

Array.prototype.isEmpty = function () {
    if (this.length == 0)
        return true;
    else
        return false;
}

Array.prototype.contains = function (item) {
    var index = this.indexOf(item);
    return (index >= 0);
}

Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
    }
}

Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
}