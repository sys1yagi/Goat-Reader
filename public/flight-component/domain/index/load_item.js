/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/25
 * Time: 13:17
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(
    [
        'components/flight/lib/component'
        //'js/ui/todo_list_controller'
    ],
    function(defineComponent){
        return defineComponent(ItemLoad);

        function ItemLoad(){
            this.defaultAttrs({
                load_url: 'feeds'
            });

            this.items = new Array();
            this.current_row = null;
            this.createItem = function(item){
                return $("<div class='span4' />",{
                    id:item._id
                }).append("<h4><a href='"+item.link + "' target='_blank'>" + item.title + "</a></h4>")
                    .append(item.date+"<br/>")
                    .append(item.content.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))
                    ;
            }
            this.getCurrentRow=function(){
                if(this.current_row == null || this.current_row.children().length === 3){
                    this.current_row = $("<div class='row-fluid' style='margin-bottom: 10px;'></div>")
                    this.$node.append(this.current_row);
                }
                return this.current_row;
            }

            this.addFeedList = function(feeds){
                for(var i = 0; i < feeds.length; i++){
                    var feed = feeds[i];
                    this.items.push(feed);
                    var item = this.createItem(feed);
                    var row = this.getCurrentRow();
                    row.append(item);
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