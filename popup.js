//working on/off change
$(function() {
    var switchStatus = false;
    $("#togBtn").on('change', function() {
        if($('#box').is(':checked')) {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
            chrome.storage.local.set({'m': switchStatus}, function(){
                alert('saved' + ' : ' + switchStatus);
            });
          
        }
        else {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
            chrome.storage.local.set({'m': switchStatus}, function(){
                alert('saved' + ' : ' + switchStatus);
            });
        }
    });
});


