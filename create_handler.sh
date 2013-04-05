
if [ "$1" == "" ] ; then
    echo "Usage: create_handler.sh HandlerName [type]"
    exit
fi

CREATE_PATH="routes/handler/$1.js   "

if [ -e $CREATE_PATH ]; then
    echo "file already exists $CREATE_PATH"
else

template='//$CREATE_PATH
var handler = require("./handler");
var header = require("./RequestUtil");
var util = require("./RequestUtil");
var Module = (function (_super) {
    handler.extends(Module, _super);
    function Module() {
        _super.apply(this, arguments);
    }
    Module.prototype.handle = function () {
        return function(req,res){
            //TODO not yet implements
            header.writeHeadJson(res);
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