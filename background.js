//working onCreated
chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        if(chrome.tabs.TabStatus = 'complete'){
            var tabId = tab[0].id;
            var tabUrl = tab[0].url;
            chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
                 //alert('saved');
             });
            chrome.storage.sync.get(['a', 'b'], function(data){
                // chrome.downloads.download({
                //     url: "data:text/plain;charset=utf-8," + encodeURIComponent("[InternetShortcut]\r\nURL=" + activeTab.url),
                //     filename: '/Users/laurasadams/Downloads/TEUA',
                //     saveAs: true
                // });
                alert(data.a + ' : ' + data.b + ' : 1 : ' + Date.now());
            })
        }
    });
});
chrome.tabs.onUpdated.addListener(null)
//working onRemoved
chrome.tabs.onRemoved.addListener(function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        var tabId = tab[0].id;
        var tabUrl = tab[0].url;
        chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
            //alert('saved');
        });
        chrome.storage.sync.get(['a', 'b'], function(data){
            alert(data.a + ' : ' + data.b + ' : 0 : ' + Date.now());
        })
    })
})

// onUpdated (in progress)
chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
        var tabId = tab[0].id;
        var tabUrl = tab[0].url;
        chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
            //alert('saved');
        })
        chrome.storage.sync.get(['a', 'b'], function(data){
            alert(data.a + ' : ' + data.b + ' : 0 : ' + Date.now());
        })
    });
});

//new function dedicated to onCreated for onUpdated
function created(){
    chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
        chrome.tabs.query({currentWindow: true, active: true}, function(tab){
            if(chrome.tabs.TabStatus = 'complete'){
                var tabId = tab[0].id;
                var tabUrl = tab[0].url;
                chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
                     //alert('saved');
                 });
                chrome.storage.sync.get(['a', 'b'], function(data){
                    // chrome.downloads.download({
                    //     url: "data:text/plain;charset=utf-8," + encodeURIComponent("[InternetShortcut]\r\nURL=" + activeTab.url),
                    //     filename: '/Users/laurasadams/Downloads/TEUA',
                    //     saveAs: true
                    // });
                    alert(data.a + ' : ' + data.b + ' : 1 : ' + Date.now());
                });
            }
        });
    });
}

//new function dedicated to onRemoved for onUpdated
function removed(){
    chrome.tabs.onRemoved.addListener(function(){
        chrome.tabs.query({currentWindow: true, active: true}, function(tab){
            var tabId = tab[0].id;
            var tabUrl = tab[0].url;
            chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
                //alert('saved');
            });
            chrome.storage.sync.get(['a', 'b'], function(data){
                alert(data.a + ' : ' + data.b + ' : 0 : ' + Date.now());
            });
        });
    });
}







// function Update(t, tabId, url) {
//     if (!url) {
//       return;
//     }
//     if (tabId in History) {
//       if (url == History[tabId][0][1]) {
//         return;
//       }
//     } else {
//       History[tabId] = [];
//     }
//     History[tabId].unshift([t, url]);
  
//     var history_limit = parseInt(localStorage["history_size"]);
//     if (! history_limit) {
//       history_limit = 23;
//     }
//     while (History[tabId].length > history_limit) {
//       History[tabId].pop();
//     }
  
//     chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0:00'});
//     chrome.browserAction.setPopup({ 'tabId': tabId, 'popup': "popup.html#tabId=" + tabId});
//   }
  
//   function HandleUpdate(tabId, changeInfo, tab) {
//     Update(new Date(), tabId, changeInfo.url);
//   }
  
//   function HandleRemove(tabId, removeInfo) {
//     delete History[tabId];
//   }
  
//   function HandleReplace(addedTabId, removedTabId) {
//     var t = new Date();
//     delete History[removedTabId];
//     chrome.tabs.get(addedTabId, function(tab) {
//       Update(t, addedTabId, tab.url);
//     });
//   }
  
  
//   function UpdateBadges() {
//     var now = new Date();
//     for (tabId in History) {
//       var description = FormatDuration(now - History[tabId][0][0]);
//       chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
//     }
//   }
  
//   setInterval(UpdateBadges, 1000);
  
//   chrome.tabs.onUpdated.addListener(HandleUpdate);
//   chrome.tabs.onRemoved.addListener(HandleRemove);
//   chrome.tabs.onReplaced.addListener(HandleReplace);