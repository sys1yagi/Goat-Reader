/**
 * Created with JetBrains WebStorm.
 * User: yagitoshihiro
 * Date: 2013/03/31
 * Time: 1:38
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(
    [
        'components/flight/lib/component'
    ],
    function(defineComponent){
        return defineComponent(FeedLoad);

        function FeedLoad(){
            this.defaultAttrs({
                load_url: 'remove_subscription'
            });
            this.deleteFeed = function(){

                if(confirm("ホンマに消しますか?")){
                    var id = this.$node.attr("id").replace(/_delete/,"");
                    $.ajax({
                        type:"GET",
                        url:this.attr.load_url,
                        data:{id:id},
                        success:function(json){
                            //console.log(json);
                            if(json.status === "error"){
                                console.log(json.body);
                            }
                            else{
                                console.log(json);
                                //TODO triggerでやった方がいい気がする
                                $("#"+id).remove();
                            }
                        }
                    });
                }
            }
            this.after("initialize", function(){
                var self = this;
                this.on("click", function(){
                    this.deleteFeed();
                });
            });
        }
    }
);