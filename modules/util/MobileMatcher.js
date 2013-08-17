


var MobileMatcher = (function(){
    function MobileMatcher(){

    }
    MobileMatcher.prototype.isMobile = function(ua){
        if(ua === null){
            return false;
        }
        if (ua.indexOf("iPad") >= 0 || ua.indexOf("iPhone") >= 0 || ua.indexOf("iPod") >= 0 || ua.indexOf("Android") >= 0 || ua.indexOf("Windows Phone") >= 0) {
            return true;
        }
        return false;
    }


    return MobileMatcher;
})();

exports.instance = new MobileMatcher();