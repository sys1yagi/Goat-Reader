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
                //content
                var content = item.content;
                if(typeof(content) === "undefined"){
                    content = item.description;
                }
                //date
                var d = new Date(item.date).toString("yyyy/MM/dd hh:mm:ss");
                return $("<div class='span4' />",{
                    id:item._id
                }).append("<h4><a href='"+item.link + "' target='_blank'>" + item.title + "</a></h4>")
                    .append(d +"<br/>")
                    .append(content.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))
                    ;
            }
            this.getCurrentRow=function(){
                if(this.current_row == null || this.current_row.children().length === 3){
                    if(this.current_row !== null){
                        this.$node.append("<hr/>");
                    }
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
            };
            this.loadList = function(){
                var self = this;
                $.ajax({
                    type:"GET",
                    url:this.attr.load_url,
                    success:function(json){
                        if(json.status === "error"){

                        }
                        else{
                            self.addFeedList(json.body);
                        }
                    }
                });
            }
            this.after("initialize", function(){

                //データロード
                this.loadList();
                this.on(document, "getListFeeds", function(event, param){
                    param.callback(this.items);
                });
                this.on(document, "loadList", function(event, param){
                    this.loadList();
                });
                this.on(document, "clearList", function(event, param){
                    this.$node.html("");
                    delete this.items;
                });
            });
        }
    }
);