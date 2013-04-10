/**
 * Created with JetBrains WebStorm.
 * User: tyagi
 * Date: 13/04/10
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */

Array.prototype.head = function () {
    if (this.length == 0) {
        return null;
    }
    return this[0];
}
Array.prototype.tail = function () {
    if (this.length == 0) {
        return null;
    }
    var tail = new Array();
    var length = this.length;
    for (var i = 1; i < length; i++) {
        tail.push(this[i]);
    }
    return tail;
}
