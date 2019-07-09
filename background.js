var tabIdToPreviousUrl = {};
var nowTime = Date.now();
var timeIncremement = 20000;

//

function sendInfo(input){
    var webSocket = new WebSocket("wss://localhost:8123");
    webSocket.onopen = function() {
        webSocket.send(input);
    }
    webSocket.close();
}

/*
function sendInfo(input){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "localhost:8123", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: value
    }));
    xhr.close();
}
*/

/*
function sendInfo(input) {
    function posAjax(url,data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if(xhr.readyState>3 && xhr.status==200){
                success(xhr.responseText);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        chr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        chr.send(params);
        return xhr;
    }
}
*/

// function sendInfo(input){
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