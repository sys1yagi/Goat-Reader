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
                load_url: 'feeds',
                default_display_mode:"content" // content | list
            });

            this.items = new Array();
            this.current_row = null;

            /**
             * Itemの殆どの情報を表示する
             * @param item
             * @returns {*|jQuery}
             */
            this.createDetailItem = function(item){
                //content
                var content = item.content;
                if(typeof(content) === "undefined"){
                    content = item.description;
                }
                content = content.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                //remove script && link
                content = content.replace(/<script.*?>.*?<\/script>/g, "");
                content = content.replace(/<link.*?>/g, "");

                //date
                var d = new Date(item.date).toString("yyyy/MM/dd hh:mm:ss");
                var template = '\
                    <div class="span4" id="{{_id}}">\
                        <h4><a href="{{link}}" target="_blank">{{title}}</a></h4>\
                        {{date}}<br/>\
                    </div>\
                ';
                var element = Hogan.compile(template);
                return $(element.render({_id:item._id, link:item.link, title:item.title, date:d})).append(content);
            }
            /**
             * Itemのタイトルだけ表示
             * @param item
             * @returns {*|jQuery|HTMLElement}
             */
            this.createListItem = function(item){
                //date
                var d = new Date(item.date).toString("yyyy/MM/dd hh:mm:ss");
                var template = '\
                    <div class="span4" id="{{_id}}">\
                        <h4><a href="{{link}}" target="_blank">{{title}}</a></h4>\
                        {{date}}<br/>\
                    </div>\
                ';
                var element = Hogan.compile(template);
                return $(element.render({_id:item._id, link:item.link, title:item.title, date:d}));
            }
            this.createItem = function(item){
                if(this.attr.default_display_mode === "content"){
                    return this.createDetailItem(item);
                }
                else{
                    return this.createListItem(item);
                }
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
                var size = feeds.length;
                for(var i = 0; i < size; i++){
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
                    this.items = [];
                });
                this.on(document, "mode_change", function(event, param){
                    console.log("param:"+param);
                    if(param === "content" || param === "list"){
                        this.attr.default_display_mode = param;
                    }
                    var tmp = this.items;
                    this.trigger(document, "clearList");
                    this.addFeedList(tmp);
                });
            });
        }
    }
);