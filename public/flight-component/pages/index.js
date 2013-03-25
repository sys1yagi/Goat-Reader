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
        "flight-component/domain/index/load_item"
    ],
    function(load_item){
        function initialize(){
            $("#feed_list").height($(window).height()-50);
            load_item.attachTo("#item_list", {

            });
        }
        return initialize;
    }
);
