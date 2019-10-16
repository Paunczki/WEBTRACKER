function getRandomToken() {
    var randomPool = new Uint8Array(8);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

var userid;
chrome.storage.local.get('userid', function(items) {
    userid = items.userid;
    if (userid) {
        useToken(userid);
    } 
    else {
        userid = getRandomToken();
        chrome.storage.local.set({userid: userid}, function() {});
    }
    function useToken(userid) {
        // alert(userid);
    }
});

var tabIdToPreviousUrl = {};

function sendInfo(input){
    var request = new XMLHttpRequest();
    var url = "https://cybersecurity.cs.luc.edu/WebTracker/" + input;
    request.open("POST", url, true); 
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); 
    request.send("data")
}

var switchStatus = false;
chrome.storage.local.get('sS', function(status){
    switchStatus = status.sS;
});

chrome.storage.onChanged.addListener(function() {
    chrome.storage.local.get('sS', function(status){
        switchStatus = status.sS;
    });
});

var newWebsite; var previousWebsite;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(switchStatus === true){
        if((!(newWebsite === previousWebsite))&&(!(newWebsite === 'newtab'))&&(changeInfo.status === 'complete')){
            var sendDone = Date.now() + ":" + userid + ":" + tabId + ":" + newWebsite + ":2";
            chrome.storage.local.set({'sendDone':sendDone}, function(){});
            chrome.storage.local.get('sendDone', function(status){
                sendInfo(status.sendDone);
            });
        }
        if(changeInfo.status === 'loading'){
            var previousUrl = "";
            previousUrl = tabIdToPreviousUrl[tabId];
            var preU = ''; var newU = '';
            if(previousUrl === undefined){
                preU = 'undefined';
            }
            if(!(previousUrl === undefined)){
                var array1 = previousUrl.split('/');
                preU = array1[2];
                previousWebsite = preU;
            }
            var array2 = (changeInfo.url).split('/');
            newU = array2[2];
            newWebsite = newU;
            if((preU !== newU)&&(!(preU==='undefined'))&&(!(preU==='newtab'))&&(!(newU==='newtab'))){
                var sendEnd = Date.now() + ":" + userid + ":" + tabId + ":" + preU + ":0";
                sendInfo(sendEnd);
            }
            if((preU !== newU)&&(!(newU==='newtab'))&&(changeInfo.status === 'loading')){
                var sendStart = Date.now() + ":" + userid + ":" + tabId + ":" + newU + ":1";
                sendInfo(sendStart);
            }
            tabIdToPreviousUrl[tabId] = changeInfo.url;
        }
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if(switchStatus === true){
        var previousUrl = "";
        previousUrl = tabIdToPreviousUrl[tabId];
        var preU = ''; 
        if(previousUrl === undefined){
            preU = 'undefined';
        }
        if(!(previousUrl === undefined)){
            var array1 = previousUrl.split('/');
            preU = array1[2];
        }
        if(!(preU === 'newtab')&&(!(preU === undefined))){
            var sendClosed = Date.now() + ":" + userid + ":" + tabId + ":" + preU + ":0";
            sendInfo(sendClosed);
        }
    }
});