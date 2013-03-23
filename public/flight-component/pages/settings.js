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
        "flight-component/domain/settings/load_feed"
        //"js/components/add_list"
        //,"js/components/load_list"
    ],
    function(load_feed){
        function initialize(){
            console.log("init!");
//            add_list.attachTo("#add_list", {
//                input_value: '#todo',
//                list_container: '#list'
//            });
//            load_list.attachTo("#list", {list_container: '#list'});

            $("#feed_list").height($(window).height()-50);
            load_feed.attachTo("#feed_list", {

            });
            /*
            $("#submit").on("click", function(){
                console.log("moge");
                //document.location.href="./add_subscription?url="+encodeURIComponent($("#feed").val());
            });
            */
        }
        return initialize;
    }
);
