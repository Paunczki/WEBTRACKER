/*$(function(){
    $('click').keyup(function(){
        $('#greet').text(Date.now() + ' ' + $('#name').val());
    })
})*/

function myAlert(){
    alert('this is a web tracker')
}
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('alertButton').addEventListener('click', myAlert);
})

chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerHTML);

//changing button text when clicked
function change() // no ';' here
{
    var elem = document.getElementById("button");
    if (elem.value == "Off") elem.value = "On";
    else elem.value = "Off";
}













//not sure which will work
//these 2 are together
/*
chrome.tabs.onCreated.addEventListener((tabId, createdInfo) => {  
    
});

chrome.window.onCreated.addListener((tabID, createdInfo)) 

chrome.tabs.onRemoved.addEventListener((tabId, removeInfo) => {
    console.log(`The tab with id: ${tabId}, is closing`);
});

//this one is alone but is on background.js as well - https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    alert('updated from contentscript');
 });
 */