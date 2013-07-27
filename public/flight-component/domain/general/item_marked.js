/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/26
 * Time: 16:12
 */
'use strict';

define(
    [
        'components/flight/lib/component'
    ],
    function (defineComponent) {
        return defineComponent(ItemLoad);

        function ItemLoad() {
            this.defaultAttrs({
                load_url: 'marked',
                "loading_id":null
            });
            this.isMarking = false;
            this.marked = function (items, mark) {
                if(this.isMarking){
                    console.log("now marking...");
                    return;
                }
                var ids = "id=";
                for(var i = 0; i < items.length; i++){
                    ids += items[i]._id;
                    if(i+1<items.length){
                        ids+=",";
                    }
                }
                ids+="&mark="+mark;
                var self = this;
                this.isMarking = true;

                if(this.attr.loading_id != null){
                    $(this.attr.loading_id).css("display", "inline");
                }
                //load data
                $.ajax({
                    type: "GET",
                    url: this.attr.load_url,
                    data:ids,
                    success: function (json) {
                        if (json.status === "error") {
                            console.log("error:"+json.body);
                        }
                        else {
                            self.trigger(document, "clearList");
                            self.trigger(document, "loadList");
                        }
                        self.isMarking = false;
                        if(self.attr.loading_id != null){
                            $(this.attr.loading_id).css("display", "none");
                        }
                    }
                });
            }
            this.after("initialize", function () {
                var self = this;
                this.on("click", function () {
                    this.trigger(document, "getListFeeds", {
                        callback:function(items){
                            self.marked(items, true);
                        }
                    });
                });
                this.on(document, "item_mark", function(event, items, mark){
                    this.marked(items, mark);
                });
            });
        }
    }
);