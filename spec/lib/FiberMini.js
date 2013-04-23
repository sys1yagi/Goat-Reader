/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/23
 * Time: 22:21
 * To change this template use File | Settings | File Templates.
 */
var FiberMini = function () {
    var self = {
        isEnd: false,
        dict: {},
        run: function (f) {
            f();
        },
        wait: function (timeout) {
            if(typeof timeout === "undefined"){
                timeout = 100000000;
            }
            waitsFor(function () {
                if (self.isEnd) {
                    self.isEnd = false;
                    return true;
                }
                return self.isEnd;
            }, "timeout", timeout);
        },
        notify: function () {
            self.isEnd = true;
        },
        put: function (key, value) {
            self.dict[key] = value;
        },
        get: function (key) {
            return self.dict[key];
        }
    };
    return self;
}
exports.FiberMini = FiberMini;