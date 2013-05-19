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
        ,"flight-component/domain/index/all_items"
        ,"flight-component/domain/settings/import_google_reader_subscriptions"
    ],
    function(load_feed, all_items, import_google_reader_subscriptions){
        function initialize(){
            $("#feed_list").height($(window).height()-50);
            load_feed.attachTo("#feed_list", {

            });
            $("#submit").on("click", function(){
                document.location.href="./add_subscription?url="+encodeURIComponent($("#feed").val());
            });
            all_items.attachTo("#all_items", {});

            import_google_reader_subscriptions.attachTo("#gr_import", {});
        }
        return initialize;
    }
);
