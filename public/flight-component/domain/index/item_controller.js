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
    function (defineComponent) {
        return defineComponent(ItemController);
        function ItemController() {
            this.isMarking = false;
            this.defaultAttrs({
                fav_url: 'fav_item', later_url: 'later_url', read_url: 'marked', fav_id: "", later_id: "", item: null, unfav_src: "img/unfav.png ", fav_src: "img/fav.png "

            });
            this.switchFavSrc=function(isFav){
                var img = $("#" + this.attr.fav_id);
                if (isFav) {
                    img.attr("src", this.attr.fav_src);
                }
                else {
                    img.attr("src", this.attr.unfav_src);
                }
            }
            this.setFav = function (img, isFav) {
                if (!this.isMarking) {
                    this.isMarking = true;
                    var self = this;
                    var data = "id=" + this.$node.attr("id") + "&mark=" + isFav;
                    $.ajax({
                        type: "GET",
                        url: this.attr.fav_url,
                        data: data,
                        success: function (json) {
                            if (json.status === "error") {
                                console.log("error:" + json.body);
                            }
                            else {
                                self.switchFavSrc(isFav);
                            }
                            self.isMarking = false;
                        }
                    });
                }
            }

            this.after("initialize", function () {
                this.switchFavSrc(this.attr.item.fav);
                this.on("#" + this.attr.fav_id, "click", function () {
                    var img = $("#" + this.attr.fav_id);
                    if (img.attr("src") === this.attr.unfav_src) {
                        this.setFav(img, true);
                    }
                    else {
                        this.setFav(img, false);
                    }
                });
            });
        }
    }
);