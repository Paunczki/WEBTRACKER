var tabIdToPreviousUrl = {};

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
            // alert(tabId + "  -  " + preU + "  -  0  -  " + Date.now());
            // need method to send to script.php
        }
        if((preU !== newU)&&(!(newU==='newtab'))){
            // alert(tabId + "  -  " + newU + "  -  1  -  " + Date.now());
            // need method to send to script.php
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
        // alert(tabId + "  -  " + preU + "  -  0  -  " + Date.now());
        // need method to send to script.php
    }
});