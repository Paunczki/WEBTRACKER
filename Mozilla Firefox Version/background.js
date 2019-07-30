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
browser.storage.local.get('userid', function(items) {
    userid = items.userid;
    if (userid) {
        useToken(userid);
    } 
    else {
        userid = getRandomToken();
        browser.storage.local.set({'userid': userid}, function() {});
    }
    function useToken(userid) {
        // alert(userid);
    }
});

var tabIdToPreviousUrl = {};
var nowTime = Date.now();
var timeIncremement = 20000;

function sendInfo(input){
    // alert("hello " + input);
    var request = new XMLHttpRequest();
    var url = "https://cybersecurity.cs.luc.edu/JohnTest/" + input;
    request.open("POST", url, true); 
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); 
    request.send("data")
    // request.onreadystatechange = function () {
    //   request.send(input);
    // }
}

var switchStatus = false;
browser.storage.local.get('sS', function(status){
    switchStatus = status.sS;
});

browser.storage.local.get('time', function(stamp){
    timeIncrement = stamp.time;
})

browser.storage.onChanged.addListener(function() {
    browser.storage.local.get('sS', function(status){
        switchStatus = status.sS;
        if(switchStatus === true){
            nowTime = Date.now();
        }
    });
});

var newWebsite; var timers; var previousWebsite;
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    timers = nowTime + timeIncremement;
    if((switchStatus === true)&&(Date.now() < timers)){
        if((!(newWebsite === previousWebsite))&&(!(newWebsite === 'newtab'))&&(changeInfo.status === 'complete')){
            // var sendDone = userid + "," + tabId + "," + newWebsite + ",2," + Date.now();
            var sendDone = Date.now() + ":" + userid + ":" + tabId + ":" + newWebsite + ":2";
            browser.storage.local.set({'sendDone':sendDone}, function(){});
            browser.storage.local.get('sendDone', function(status){
                // console.log(status.sendDone);
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
                // console.log(sendEnd);
                sendInfo(sendEnd);
            }
            if((preU !== newU)&&(!(newU==='newtab'))&&(changeInfo.status === 'loading')){
                // var sendStart = userid + "," + tabId + "," + newU + ",1," + Date.now();
                var sendStart = Date.now() + ":" + userid + ":" + tabId + ":" + newU + ":1";
                // console.log(sendStart);
                sendInfo(sendStart);
            }
            tabIdToPreviousUrl[tabId] = changeInfo.url;
        }
    }
    if((switchStatus === true)&&(Date.now() > timers)){
        browser.storage.local.set({'sS': false}, function(){
            switchStatus = false;
        });
    }
});

var timers2;
browser.tabs.onRemoved.addListener(function(tabId, removeInfo){
    timers2 = nowTime + timeIncremement;
    if((switchStatus === true)&&(Date.now() < timers2)){
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
            // console.log(sendClosed);
            sendInfo(sendClosed);
        }
    }
    if((switchStatus === true)&&(Date.now() > timers2)){
        browser.storage.local.set({'sS': false}, function(){
            switchStatus = false;
        });
    }
});