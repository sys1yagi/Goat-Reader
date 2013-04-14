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

