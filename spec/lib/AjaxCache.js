/**
 * ajaxでデータを取得する事が出来る。URL毎にデータをキャッシュ出来る
 */
var fs = require('fs');
var path = require('path');
var xml2json = require('xml2json');
var http = require('http');
var url = require('url');
var AjaxCache = (function () {
    function AjaxCache() {
    }

    AjaxCache.prototype.cacheDir = ".cache";
    AjaxCache.prototype.createCacheDirIfNotExist = function () {
        try {
            fs.statSync(this.cacheDir);
        } catch (e) {
            fs.mkdirSync(this.cacheDir, 0777);
        }
    };
    AjaxCache.prototype.isCached = function (url_string) {
        this.createCacheDirIfNotExist();
        try {
            fs.statSync(path.join(this.cacheDir, encodeURIComponent(url_string)));
        } catch (e) {
            return false;
        }
        return true;
    };
    AjaxCache.prototype.saveCache = function (url_string, json) {
        this.createCacheDirIfNotExist();
        fs.writeFileSync(
            path.join(this.cacheDir, encodeURIComponent(url_string)),
            json
        );
    };
    AjaxCache.prototype.getXML = function (url_string, callback, isCache) {
        if (typeof isCache === "undefined" || isCache === null) {
            isCache = true;
        }
        if (this.isCached(url_string)) {
            console.log("cached.");
        }
        var self = this;
        var uri = url.parse(url_string);
        http.get({
            host: uri.hostname,
            port: 80,
            path: uri.path
        },function (resp) {
            var rss = "";
            resp
                .on("data", function (chunk) {
                    rss += chunk;
                })
                .on("end", function () {
                    try {
                        var json = xml2json.toJson(rss);
                        var jsonObject = JSON.parse(json);
                        if (isCache) {
                            self.saveCache(url_string, json);
                        }
                        callback(jsonObject);
                    } catch (e) {
                        console.log(e);
                    }
                });
            ;
        }).on('error', function (e) {
                console.log(e);
            });
    };

    return AjaxCache;
})();

module.exports = new AjaxCache();
