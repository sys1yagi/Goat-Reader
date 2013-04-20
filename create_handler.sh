
if [ "$1" == "" ] ; then
    echo "Usage: create_handler.sh HandlerName [type]"
    exit
fi

CREATE_PATH="routes/handler/$1.js   "

if [ -e $CREATE_PATH ]; then
    echo "file already exists $CREATE_PATH"
else

template='//$CREATE_PATH
var handler = require("./Handler");
var util = require("../../modules/util/RequestExtensions");
var UserItemModel = require("../../modules/model/UserItemModel");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            UserModelDao.getUser(req, function (user) {
                //TODO not yet implements
                util.writeHeadJson(res);
            }
        }
    };
    Module.prototype.path = function () {
        //TODO set path
        return "/not yet";
    };
    return Module;
})(handler.handler);
exports.module = new Module();
'
    echo "$template" >> $CREATE_PATH
fi