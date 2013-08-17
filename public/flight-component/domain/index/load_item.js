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
                default_display_mode:"content", // content | list
                row_count:3
            });

            this.items = new Array();
            this.current_row = null;

            /**
             * 新しいItemにFlightコンポーネントをAttachする
             * @param newElement
             */
            this.itemAttach = function(item){
                //attach
                require(['flight-component/domain/index/item_controller'], function(item_controller) {
                    item_controller.attachTo("#"+item._id,
                    {
                        fav_id:"fav_"+item._id
                        ,item:item
                    });
                });
            }

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
                    <div class="span{{span_row}}" id="{{_id}}">\
                        <h4><a href="{{link}}" target="_blank">{{title}}</a></h4>\
                        <div>\
                            {{date}}\
                            <img style="cursor:pointer;" src="img/unfav.png" id="{{fav_id}}" width="20px">\
                        </div>\
                        <br/>\
                    </div>\
                ';
                var fav_id = "fav_"+item._id;
                var element = $(Hogan.compile(template).render({_id:item._id, link:item.link, title:item.title, date:d, fav_id:fav_id, span_row:12/this.attr.row_count})).append(content);
                return element;
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
                    <div class="span{{span_row}}" id="{{_id}}">\
                        <h4><a href="{{link}}" target="_blank">{{title}}</a></h4>\
                        <div>\
                            {{date}}\
                            <img style="cursor:pointer;" src="img/unfav.png" id="{{fav_id}}" width="20px">\
                        </div>\
                    </div>\
                ';
                var fav_id = "fav_"+item._id;
                var element = $(Hogan.compile(template).render({_id:item._id, link:item.link, title:item.title, date:d, fav_id:fav_id, span_row:12/this.attr.row_count}));
                return element;
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
                if(this.current_row == null || this.current_row.children().length === this.attr.row_count){
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
                    this.itemAttach(feed);
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