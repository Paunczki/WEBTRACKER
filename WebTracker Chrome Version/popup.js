$(function() {
    $("#togBtn").on('change', function(e) {
        if (e.target.checked){
            var time = 1609480799000
            if(Date.now() > time){
                chrome.storage.local.set({'sS': false}, function(){
                    chrome.browserAction.setIcon({path: "iconGray.png"});
                    //alert('saved: False');
                });
            }
            else{
                chrome.storage.local.set({'sS': true}, function(){
                    chrome.browserAction.setIcon({path: "icon48.png"});
                    //alert('saved: True');
                });
            }
        } else {
            chrome.storage.local.set({'sS': false}, function(){
                chrome.browserAction.setIcon({path: "iconGray.png"});
                //alert('saved: False');
            });
        }   
    });

    var time = 1609480799000
    if(Date.now() > time){
        chrome.storage.local.set({'sS': false}, function(){});
        chrome.browserAction.setIcon({path: "iconGray.png"});
    }
    
    chrome.storage.local.get('sS', function(status){
        var switchStatus = status.sS;

        if(switchStatus) {
            $('#togBtn').prop('checked', true);
        } else {
            $('#togBtn').prop('checked', false);
        }
    });
});