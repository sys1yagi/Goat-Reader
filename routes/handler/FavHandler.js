//$CREATE_PATH
var handler = require("./Handler");
var util = require("./RequestUtil");
var UserItemModel = require("../../modules/model/UserItemModel");
var UserModelDao = require("../../modules/model/UserModelDao");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }

    Module.prototype.handle = function () {
        return function (req, res) {
            UserModelDao.getUser(req, function (user) {
                util.writeHeadJson(res);
                var id = req.query.id;
                var query = null;
                var marked = true;
                if (req.query.mark === "false") {
                    marked = false;
                }
                query = {"item_id": id, "user_id": user._id};
                UserItemModel.UserItem.update(query, {$set: {fav: marked}}, {multi: true}, function (err, numberAffected, raw) {
                    if (err) {
                        console.log(err);
                        res.write(util.makeResponseJsonBody("error", err));
                    }
                    else {
                        console.log('The number of updated documents was %d', numberAffected);
                        console.log('The raw response from Mongo was ', raw);
                        res.write(util.makeResponseJsonBody("success", raw));
                    }
                    res.end();
                });
            });
        }
    };
    Module.prototype.path = function () {
        return "/fav_item";
    };
    return Module;
})(handler.handler);
exports.module = new Module();

