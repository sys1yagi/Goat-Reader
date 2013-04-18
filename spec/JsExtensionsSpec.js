
require('../modules/util/JsExtensions');

describe('Array-head', function() {
    it('Arrayにheadメソッドを追加', function() {
        var array = [1,2,3,4,5];
        expect(array.head()).toEqual(1);
    });

    it('Arrayにtailメソッドを追加', function() {
        var array = [1,2,3,4,5];
        expect(array.tail()).toEqual([2,3,4,5]);
    });
});