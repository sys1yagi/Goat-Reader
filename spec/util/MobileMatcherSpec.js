var should = require("should");
var assert = require("assert");
var MobileMatcher = require('../../modules/util/MobileMatcher').instance;


describe('MobileMatcher', function () {
    it('Galaxy S III SC-06D Android 4.0.4', function () {
        assert.ok(
            MobileMatcher.isMobile("Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; SC-06D Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30")
        );
    });
    it('PC', function () {
        assert.ok(
            !MobileMatcher.isMobile("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.34 Safari/534.24")
        );
    });
});