chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
         console.log("message recieved" + msg);
         port.postMessage(" Hi Popup.js");
    });
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'loading') {
        var bs = tab.url;
        chrome.storage.sync.get(['tabID'], function(data){
            if(!(data.tabID === bs)){
                alert(tabId + "  -  " + data.tabID + "  -  0  -  " + Date.now());
                chrome.storage.sync.set({'tabID': bs}, function(){
                    alert(tabId + "  -  " + bs + "  -  1  -  " + Date.now());
                });
            } 
        });
    }
});
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    chrome.storage.sync.get(['tabID'], function(data){
        alert(tabId + "  -  " + data.tabID + "  -  0  -  " + Date.now());
    });
});
