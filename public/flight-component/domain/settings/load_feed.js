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
                var template = '\
                    <div id="{{_id}}" class="row-fluid" style="margin-top:7px;border-bottom:1px dotted #000;">\
                        <div class="span10">\
                            <a href="{{url}}" target="_blank">{{name}}</a>\
                        </div>\
                        <div class="span2">\
                            <img style="cursor:pointer;" id="{{_id}}_edit" src="img/edit.png"/>\
                            <img style="cursor:pointer;" id="{{_id}}_delete" src="img/trash.gif"/>\
                        </div>\
                    </div>\
                    \
                ';
                var element = Hogan.compile(template);
                return element.render({_id:item._id, url:item.url, name:item.name});
            }

            this.addFeedList = function(feeds){

                function attach(feed){
                    //attach
                    require([
                        "flight-component/domain/settings/delete_feed"
                    ],function(delete_feed){
                        delete_feed.attachTo("#"+feed._id+"_delete", {});
                    })
                }

                for(var i = 0; i < feeds.length; i++){
                    var feed = feeds[i];
                    var item = this.createItem(feed);
                    this.$node.append(item);
                    attach(feed);
                }
            }
            this.after("initialize", function(){
                var self = this;
                //データロード
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    success:function(json){
                        //console.log(json);
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