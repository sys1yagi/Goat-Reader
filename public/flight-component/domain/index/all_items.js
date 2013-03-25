/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/25
 * Time: 14:44
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(
    [
        'components/flight/lib/component'
    ],
    function(defineComponent){
        return defineComponent(ItemLoad);

        function ItemLoad(){
            this.defaultAttrs({
                load_url: 'all_unmark_count'
            });
            this.after("initialize", function(){
                var self = this;
                //データロード
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    success:function(json){
                        if(json.status === "error"){

                        }
                        else{
                            self.$node.html("all("+json.body+")");
                        }
                    }
                });

            });
        }
    }
);