function getRandomToken() {
    var randomPool = new Uint8Array(8);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

function startState() {
    return 1;
}

var start;
chrome.storage.local.get('start', function(items){
    start = items.start;
    if(start){
        // hopefully works good
    }
    else{
        start = startState();
        chrome.storage.local.set({start: start}, function() {});
        chrome.storage.local.set({'sS': true}, function(){
            chrome.browserAction.setIcon({path: "icon48.png"});
            // alert('saved: True');
        });
    }
});

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
        //alert(userid);
    }
});

var tabIdToPreviousUrl = {};

function sendInfo(input){
    // alert("hello " + input);
    var request = new XMLHttpRequest();
    var url = "https://webtracker.cs.luc.edu/WebTracker/" + input;
    request.open("POST", url, true); 
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); 
    request.send("data");
    // request.onreadystatechange = function () {
    //   request.send(input);
    // }
}

var switchStatus = false;
chrome.storage.local.get('sS', function(status){
    switchStatus = status.sS;
});

var time = 1580536800000;
//var time = 1572641100000;

if(Date.now() > time){
    chrome.storage.local.set({'sS': false}, function(){});
    chrome.browserAction.setIcon({path: "iconGray.png"});
}

chrome.storage.onChanged.addListener(function() {
    chrome.storage.local.get('sS', function(status){
        switchStatus = status.sS;
    });
});

var newWebsite; var previousWebsite;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if((switchStatus === true)&&(Date.now() < time)){
        if((!(newWebsite === previousWebsite))&&(!(newWebsite === 'newtab'))&&(changeInfo.status === 'complete')){
            // var sendDone = userid + "," + tabId + "," + newWebsite + ",2," + Date.now();
            var sendDone = Date.now() + ":" + userid + ":" + tabId + ":" + newWebsite + ":2";
            chrome.storage.local.set({'sendDone':sendDone}, function(){});
            chrome.storage.local.get('sendDone', function(status){
                // alert(status.sendDone);
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
                // var sendEnd = userid + "," + tabId + "," + preU + ",0," + Date.now();
                var sendEnd = Date.now() + ":" + userid + ":" + tabId + ":" + preU + ":0";
                // alert(sendEnd);
                sendInfo(sendEnd);
            }
            if((preU !== newU)&&(!(newU==='newtab'))&&(changeInfo.status === 'loading')){
                // var sendStart = userid + "," + tabId + "," + newU + ",1," + Date.now();
                var sendStart = Date.now() + ":" + userid + ":" + tabId + ":" + newU + ":1";
                // alert(sendStart);
                sendInfo(sendStart);
            }
            tabIdToPreviousUrl[tabId] = changeInfo.url;
        }
    }
    if((switchStatus === true)&&(Date.now() > time)){
        chrome.storage.local.set({'sS': false}, function(){
            switchStatus = false;
            chrome.browserAction.setIcon({path: "iconGray.png"});
        });
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    if((switchStatus === true)&&(Date.now() < time)){
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
            // var sendClosed = userid + "," + tabId + "," + preU + ",0," + Date.now();
            var sendClosed = Date.now() + ":" + userid + ":" + tabId + ":" + preU + ":0";
            // alert(sendClosed);
            sendInfo(sendClosed);
        }
    }
    if((switchStatus === true)&&(Date.now() > time)){
        chrome.storage.local.set({'sS': false}, function(){
            switchStatus = false;
            chrome.browserAction.setIcon({path: "iconGray.png"});
        });
    }
});