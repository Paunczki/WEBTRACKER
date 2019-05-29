$(function() {
    $("#togBtn").on('change', function(e) {
        if (e.target.checked){
            chrome.storage.local.set({'sS': true}, function(){
                alert('saved: True');
            });
        } else {
            chrome.storage.local.set({'sS': false}, function(){
                alert('saved: False');
            });
        }   
    });

    chrome.storage.local.get('sS', function(status){
        var switchStatus = status.sS;

        if(switchStatus) {
            $('#togBtn').prop('checked', true);
        } else {
            $('#togBtn').prop('checked', false);
        }
    });
});