/**
 * Created with JetBrains WebStorm.
 * User: tyagi
 * Date: 13/04/01
 * Time: 13:04
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(
    [
        'components/flight/lib/component'
    ],
    function(defineComponent){
        return defineComponent(ImportGoogleReaderSubscriptions);

        function ImportGoogleReaderSubscriptions(){
            this.defaultAttrs({
                load_url: 'remove_subscription'
            });

            this.showFileuploadDialog = function(){
                $("#file_upload").slideToggle();
            }

            this.after("initialize", function(){
                this.on("click", function(){
                    this.showFileuploadDialog();
                });
            });
        }
    }
);