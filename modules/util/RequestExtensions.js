/**
 * Requestオブジェクトを拡張した部分の操作をここに書く
 * User: yagitoshihiro
 * Date: 2013/04/07
 * Time: 0:34
 */

/**
 * セッショントークンを取り出す
 * @param req
 * @returns {*}
 */
exports.getSessionToken = function (req) {
    return req.session.session_token;
}
/**
 *
 * @param req
 * @param settings
 */
exports.setSettings = function(req, settings){
    req.settings = settings;
}
/**
 *
 * @param req
 * @returns {*|Function|*|app.settings|app.locals.settings|Manager.settings|app.views.clients.settings}
 */
exports.getSettings = function(req){
    return req.settings;
}

/**
 * レスポンスヘッダにjsonをセットする
 * @param res
 */
exports.writeHeadJson = function (res) {
    res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
}
/**
 * レスポンスヘッダにhtmlをセットする
 * @param res
 */
exports.writeHeadHTML = function(res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
}
/**
 * レスポンスヘッダにplainをセットする
 * @param res
 */
exports.writeHeadText = function(res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
}
/**
 * レスポンスをjsonにする
 * @param status
 * @param body
 * @returns {*}
 */
exports.makeResponseJsonBody = function(status, body){
    return JSON.stringify({status:status, body:body});
}


