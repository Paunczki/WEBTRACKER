var tabIdToPreviousUrl = {};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'loading'){
        var previousUrl = "";
        previousUrl = tabIdToPreviousUrl[tabId];
        if (previousUrl !== changeInfo.url) {
            alert(tabId + "  -  " + previousUrl + "  -  0  -  " + Date.now());
            alert(tabId + "  -  " + changeInfo.url + "  -  1  -  " + Date.now());
        }
        tabIdToPreviousUrl[tabId] = changeInfo.url;
    }
});

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     if(changeInfo.status === 'loading') {
//         id = tabId;
//         bs = tab.url;
//         chrome.storage.sync.get(['id'], function(data){
//             //need to find a way to make sites tabs unique
//             if(!(data.id === bs)){
//                 alert(tabId + "  -  " + data.id + "  -  0  -  " + Date.now());
//                 chrome.storage.sync.set({id: bs}, function(){
//                     alert(tabId + "  -  " + bs + "  -  1  -  " + Date.now());
//                 });
//             }
//         });
//     }
// });
// chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
//     chrome.storage.sync.get(['id'], function(data){
//         alert(tabId + "  -  " + data.id + "  -  0  -  " + Date.now());
//     });
// });