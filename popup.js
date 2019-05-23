//working on/off change
// To get the popup.js and background.js talking to each other

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
});


$(function() {
    var switchStatus = false;
    $("#togBtn").on('change', function() {
        if($('#box').is(':checked')) {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
        }
        else {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
        }
    });
});
