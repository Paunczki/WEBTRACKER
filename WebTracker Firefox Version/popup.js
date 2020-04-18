$(function() {
    $("#togBtn").on('change', function(e) {
        if (e.target.checked){
            var time = 1609480799000
            if(Date.now() > time){
                browser.storage.local.set({'sS': false}, function(){
                    browser.browserAction.setIcon({path: "iconGray.png"});
                    //alert('saved: False');
                });
            }
            else{
                browser.storage.local.set({'sS': true}, function(){
                    browser.browserAction.setIcon({path: "icon48.png"});
                    //alert('saved: True');
                });
            }
        } else {
            browser.storage.local.set({'sS': false}, function(){
                browser.browserAction.setIcon({path: "iconGray.png"});
                //alert('saved: False');
            });
        }   
    });

    var time = 1609480799000
    if(Date.now() > time){
        browser.storage.local.set({'sS': false}, function(){});
        browser.browserAction.setIcon({path: "iconGray.png"});
    }

    browser.storage.local.get('sS', function(status){
        var switchStatus = status.sS;

        if(switchStatus) {
            $('#togBtn').prop('checked', true);
        } else {
            $('#togBtn').prop('checked', false);
        }
    });
});