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
exports.setSettings = function(req){

}
exports.getSettings = function(req){

}

