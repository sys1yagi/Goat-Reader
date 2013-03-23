/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/23
 * Time: 18:56
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(
    [
        'components/flight/lib/component'
        //'js/ui/todo_list_controller'
    ],
    function(defineComponent){
        return defineComponent(FeedLoad);

        function FeedLoad(){
            this.defaultAttrs({
                load_url: 'subscription'
            });

            this.createItem = function(item){
                return $("<div/>",{
                    id:item._id
                }).append("moge")
                    .append("<hr/>")
                    ;
            }

            this.addFeedList = function(feeds){
                for(var i = 0; i < feeds.length; i++){
                    var item = this.createItem(feeds[i]);
                    this.$node.append(item);
                }
            }
            this.after("initialize", function(){
                var self = this;
                //データロード
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    success:function(json){
                        console.log(json);
                        if(json.status === "error"){

                        }
                        else{
                            //self.trigger("appendTodoList", [json.body]);
                            self.addFeedList(json.body);
                        }
                    }
                });

            });
        }
    }
);