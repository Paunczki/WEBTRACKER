var tabIdToPreviousUrl = {};

function writeToDB(data){
    var req = new XMLHttpRequest();
    req.open('POST', 'script.php', true);
    req.send(data);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
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
        }
        if(newU === undefined){
            newU = 'newtab';
        }
        if(!(newU === undefined)){
            var array2 = (changeInfo.url).split('/');
            newU = array2[2];
        }
        if((preU !== newU)&&(!(preU==='undefined'))&&(!(preU==='newtab'))&&(!(newU==='newtab'))){
            var sendEnd = tabId + "," + preU + ",0," + Date.now();
            alert(sendEnd);
            writeToDB(sendEnd);
        }
        if((preU !== newU)&&(!(newU==='newtab'))){
            var sendStart = tabId + "," + newU + ",1," + Date.now();
            alert(sendStart);
            writeToDB(sendStart);
        }
        tabIdToPreviousUrl[tabId] = changeInfo.url;
    }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
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
        var sendClosed = tabId + "," + preU + ",0," + Date.now()
        alert(sendClosed);
        writeToDB(sendClosed);
    }
});