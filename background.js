//same thing for popup.js - https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
function changeURL(){
    alert('url change');
}

function closedTab(){
   alert('tab closed');
}

function newTab(){
    alert('new tab');
}
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    alert(response);
})


    //was getSelected, changed to tabs.query (working, just sends an 'alert' at least 4-5 times)

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    //chrome.tabs.getSelected(null, function(tab) { 
    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        if(chrome.tabs.TabStatus = 'complete'){
            var tabId = tab[0].id;
            var tabTitle = tab[0].title;
            var tabUrl = tab[0].url;
            chrome.storage.sync.set({'a': tabId, 'b': tabUrl, 'c': tabTitle}, function(){
                 alert('saved');
             });
            chrome.storage.sync.get(['a', 'b', 'c'], function(data){
                // chrome.downloads.download({
                //     url: "data:text/plain;charset=utf-8," + encodeURIComponent("[InternetShortcut]\r\nURL=" + activeTab.url),
                //     filename: '/Users/laurasadams/Downloads/TEUA',
                //     saveAs: true
                // });
                alert(data.a + ': ' + data.b + ": " + data.c+ ': on: ' + Date.now());
            })
        }
    });
});



// chrome.tabs.onRemoved.addListener(function(tabId, url, tabTitle, times){
//     chrome.tabs.queryInfo({currentWindow: true, active: true}, function(tab){
//         chrome.storage.sync.set({'a': tabId, 'b': tabUrl, 'c': Date.now}, function(){
//             alert('saved');
//         })
//         chrome.storage.sync.get('c', function(data){
//             alert(data.c);
//         })
//     });
// });
       


// chrome.tabs.onUpdated.addListener(function(tabId, url, tab) {
//     chrome.tabs.getSelected(null, function(tab) {
//         var tabId = tab.id;
//         var tabUrl = tab.url;
//         chrome.storage.sync.set({'hi': tabUrl}, function(){
//             alert('saved');
//         });
//         chrome.storage.sync.get('hi', function(data){
//             alert(data.hi);
//         })
//     });
// });


/*chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    alert('new tab');
    chrome.tabs.onRemoved.addEventListener('hashchange', changeURL, false)
});*/

    //for onCreated
//chrome.tabs.query({currentWindow: true, active : true}, funtion(tab) 
