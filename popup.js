// var port = chrome.extension.connect({
//     name: "Sample Communication"
// });
// port.postMessage("Hi BackGround");
// port.onMessage.addListener(function(msg) {
//     console.log("message recieved" + msg);
// });

//the call is working because the popup alerts when switch status has changed. however, it is not saving across all tabs. 
$(function() { 
    chrome.storage.local.get('switchStatus', function(status){
        switchStatus = status.switchStatus;
        $("#togBtn").on('change', function() {
            if($('#box').is(':checked')) {
                switchStatus = $("#togBtn").is(':checked');
                alert(switchStatus); //to verify
 
                chrome.storage.local.set({swtichStatus: true}, function(){
                    alert('saved' + ' : ' + switchStatus);
                });

          
            }
            else {
                switchStatus = $("#togBtn").is(':checked');
                alert(switchStatus); //to verify

                chrome.storage.local.set({switchStatus: false}, function(){
                    alert('saved' + ' : ' + switchStatus);
                });
            }
        });
    })
});



// $(function() {
//     var switchStatus = false;
//     $("#togBtn").on('change', function() {
//         if($('#box').is(':checked')) {
//             switchStatus = $("#togBtn").is(':checked');
//             alert(switchStatus); //to verify
//             chrome.storage.local.set({'m': switchStatus}, function(){
//                 alert('saved' + ' : ' + switchStatus);
//             });
          
//         }
//         else {
//             switchStatus = $("#togBtn").is(':checked');
//             alert(switchStatus); //to verify
//             chrome.storage.local.set({'m': switchStatus}, function(){
//                 alert('saved' + ' : ' + switchStatus);
//             });
//         }
//     });
// });


