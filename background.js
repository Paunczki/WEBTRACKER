//working onCreated
// chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {
//     chrome.tabs.query({currentWindow: true, active: true}, function(tab){
//         if(chrome.tabs.TabStatus = 'complete'){
//             var tabId = tab[0].id;
//             var tabUrl = tab[0].url;
//             chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
//                  //alert('saved');
//              });
//             chrome.storage.sync.get(['a', 'b'], function(data){
//                 // chrome.downloads.download({
//                 //     url: "data:text/plain;charset=utf-8," + encodeURIComponent("[InternetShortcut]\r\nURL=" + activeTab.url),
//                 //     filename: '/Users/laurasadams/Downloads/TEUA',
//                 //     saveAs: true
//                 // });
//                 alert(data.a + ' : ' + data.b + ' : 1 : ' + Date.now());
//             })
//         }
//     });
// });

//working onRemoved
// chrome.tabs.onRemoved.addListener(function(){
//     chrome.tabs.query({currentWindow: true, active: true}, function(tab){
//         var tabId = tab[0].id;
//         var tabUrl = tab[0].url;
//         chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
//             //alert('saved');
//         });
//         chrome.storage.sync.get(['a', 'b'], function(data){
//             alert(data.a + ' : ' + data.b + ' : 0 : ' + Date.now());
//         })
//     })
// })

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse)
    {
        if(request.message == "Go_To_Clicked"){
            chrome.tabs.create({ url: request.website},function(tab){
                // Callback  
            })
        }
    }
)

// onUpdated (in progress)

chrome.tabs.onUpdated.addListener(function(tabId, {}, tab) {
    //if(chrome.tabs.getSelected = ){
        chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
            var tabId = tab[0].id;
            var tabUrl = tab[0].url;
            //if(chrome.tabs.TabStatus = 'complete') {
                //not working
            if(!tabId == tabUrl){
                chrome.storage.sync.set({'a': tabId, 'b': tabUrl}, function(){
                    //alert('saved');
                })
                chrome.storage.sync.get(['a', 'b'], function(data){
                    alert(data.a + ' : ' + data.b + ' : 0 : ' + Date.now());
                })
                // if(changeInfo.status = 'complete') {
                //     created();
                //     alert('on created??');
                // }
            //}
            }
        });
    //}
    if(chrome.tabs.TabStatus = 'complete'){
        created();
    }
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