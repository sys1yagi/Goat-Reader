/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/23
 * Time: 18:41
 * To change this template use File | Settings | File Templates.
 */
'use strict';
/** 依存のある部分 */
define(
    [
        "flight-component/domain/index/load_item",
        "flight-component/domain/index/all_items",
        "flight-component/domain/general/item_marked"
    ],
    function(load_item, all_items, item_marked){
        function initialize(){
            load_item.attachTo("#item_list", {});
            all_items.attachTo("#all_items", {});
            item_marked.attachTo("#mark_and_next", {});
        }
        return initialize;
    }
);
