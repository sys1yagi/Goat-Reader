/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/04/16
 * Time: 23:42
 * To change this template use File | Settings | File Templates.
 */
'use strict';
/**
 * Itemの操作系。
 * favとかあとで読むとか、既読化、未読化とか
 */
define(
    [
        'components/flight/lib/component'
    ],
    function(defineComponent){
        return defineComponent(ItemController);
        function ItemController(){
            this.defaultAttrs({
                fav_url: 'fav_item'
                ,later_url: 'later_url'
                ,read_url:'marked'
                ,fav_id:""
                ,later_id:""
                ,item:null

            });
            this.setFav = function(isFav){
                console.log("id:"+this.$node.attr("id"));
                console.log($("#"+this.attr.fav_id).attr("src"));
                console.log("fav:"+this.attr.item.fav);
                /*
                $.ajax({
                    type: "GET",
                    url: this.attr.fav_url,
                    data:ids,
                    success: function (json) {
                        if (json.status === "error") {
                            console.log("error:"+json.body);
                        }
                        else {
                            //self.trigger(document, "clearList");
                            //self.trigger(document, "loadList");
                            //画像を変更

                        }
                        self.isMarking = false;
                    }
                });
                */
            }

            this.after("initialize", function(){
                this.on("#"+this.attr.fav_id, "click", function(){
                    this.setFav(true);
                });
            });
        }
    }
);