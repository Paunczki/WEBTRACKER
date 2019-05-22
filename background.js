chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'loading'){
        // var site = chrome.storage.sync.get(tabID);
        // alert(site);
        
        alert(tabId + "  -  " + tab.url);

    }
});
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    alert(tabId);
});