/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/08/18
 * Time: 1:56
 * To change this template use File | Settings | File Templates.
 */
'use strict';
/** 依存のある部分 */
define(
    [
        "flight-component/domain/index/load_item",
        "flight-component/domain/index/all_items",
        "flight-component/domain/index/display_mode_change",
        "flight-component/domain/general/item_marked"

    ],
    function(load_item, all_items, display_mode_change, item_marked){
        function initialize(){

            load_item.attachTo("#item_list", {row_count:1, default_display_mode:"list"});
            all_items.attachTo("#all_items", {});
            item_marked.attachTo("#mark_and_next", {"loading_id":"#loading"});
            display_mode_change.attachTo("#view_mode", {content_mode:"#view_content_mode", list_mode:"#view_list_mode"});
        }
        return initialize;
    }
);
