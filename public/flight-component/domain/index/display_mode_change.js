/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/15
 * Time: 22:46
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/25
 * Time: 14:44
 * To change this template use File | Settings | File Templates.
 */
'use strict';
/**
 * 未読件数の取得
 */
define(
    [
        'components/flight/lib/component'
    ],
    function(defineComponent){
        return defineComponent(DisplayModeChange);

        function DisplayModeChange(){
            this.defaultAttrs({
                content_mode:"",
                list_mode:""
            });
            this.after("initialize", function(){
                this.on(this.attr.content_mode, "click", function(){
                    if(!$(this.attr.content_mode).hasClass("disabled")){
                        $(this.attr.list_mode).removeClass("disabled");
                        $(this.attr.content_mode).addClass("disabled");
                        this.trigger(document, "mode_change", ["content"]);
                    }
                });
                this.on(this.attr.list_mode, "click", function(){
                    if(!$(this.attr.list_mode).hasClass("disabled")){
                        $(this.attr.list_mode).addClass("disabled");
                        $(this.attr.content_mode).removeClass("disabled");
                        this.trigger(document, "mode_change", ["list"]);
                    }
                });
            });
        }
    }
);