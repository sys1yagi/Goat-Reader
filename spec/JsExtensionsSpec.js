require("should");
require('../modules/util/JsExtensions');

describe('Array-head', function() {
    it('Arrayにheadメソッドを追加', function() {
        var array = [1,2,3,4,5];
        array.head().should.eql(1);
    });

    it('Arrayにtailメソッドを追加', function() {
        var array = [1,2,3,4,5];
        array.tail().should.eql([2,3,4,5]);
    });
});