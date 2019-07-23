var tabIdToPreviousUrl = {};
var nowTime = Date.now();
var timeIncremement = 5000;

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
chrome.storage.local.get('sS', function(status){
    switchStatus = status.sS;
});

chrome.storage.local.get('time', function(stamp){
    timeIncrement = stamp.time;
})

chrome.storage.onChanged.addListener(function() {
    chrome.storage.local.get('sS', function(status){
        switchStatus = status.sS;
        if(switchStatus === true){
            nowTime = Date.now();
        }
    });
});

var newWebsite; var timers; var previousWebsite;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    timers = nowTime + timeIncremement;
    if((switchStatus === true)&&(Date.now() < timers)){
        if((!(newWebsite === previousWebsite))&&(!(newWebsite === 'newtab'))&&(changeInfo.status === 'complete')){
            var sendDone = tabId + "," + newWebsite + ",2," + Date.now();
            chrome.storage.local.set({'sendDone':sendDone}, function(){});
            chrome.storage.local.get('sendDone', function(status){
                alert(status.sendDone);
                // sendInfo(sendStart);
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
                var sendEnd = tabId + "," + preU + ",0," + Date.now();
                alert(sendEnd);
                // sendInfo(sendEnd);
            }
            if((preU !== newU)&&(!(newU==='newtab'))&&(changeInfo.status === 'loading')){
                var sendStart = tabId + "," + newU + ",1," + Date.now();
                alert(sendStart);
                // sendInfo(sendStart);
            }
            tabIdToPreviousUrl[tabId] = changeInfo.url;
        }
    }
    if((switchStatus === true)&&(Date.now() > timers)){
        chrome.storage.local.set({'sS': false}, function(){
            switchStatus = false;
        });
    }
});

var timers2;
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
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
            var sendClosed = tabId + "," + preU + ",0," + Date.now();
            alert(sendClosed);
            // sendInfo(sendClosed);
        }
    }
    if((switchStatus === true)&&(Date.now() > timers2)){
        chrome.storage.local.set({'sS': false}, function(){
            switchStatus = false;
        });
    }
});