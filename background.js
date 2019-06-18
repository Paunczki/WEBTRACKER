var tabIdToPreviousUrl = {};
var nowTime = Date.now();
var timeIncremement = 20000;

function sendInfo(input){
    var webSocket = new WebSocket("wss://localhost:8123");
    webSocket.onopen = function() {
        webSocket.send(input);
    }
    webSocket.close();
}

// function writeToDB(input){
//     $.ajax({
//         type: 'post',
//         url: 'https://localhost/db1/script.php',
//         data: {input: input},
//         success: function(){
//             alert("it workin'");
//         }
//     })
// }

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
            alert(sendDone);
            sendInfo(sendStart);
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
                sendInfo(sendEnd);
            }
            if((preU !== newU)&&(!(newU==='newtab'))&&(changeInfo.status === 'loading')){
                var sendStart = tabId + "," + newU + ",1," + Date.now();
                alert(sendStart);
                sendInfo(sendStart);
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

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    timers = nowTime + timeIncrement
    if((switchStatus === true)&&(Date.now() < timers)){
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
            sendInfo(sendClosed);
        }
    }
});