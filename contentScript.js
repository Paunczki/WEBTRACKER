function changeURL(){
  alert('url change');
}

chrome.tabs.onUpdated.addListener(changeURL);












//with thing from popup.js - same website as thing above this things tie in popup.js (the stackoverflow.. its just another answer)
//i believe content scripts change the something or do something on the page the user is on.. so we don't really need this just
// thought it might make the thing in popup.js make more sense when trying to see what we can do. if that makes any sense whatsoever
/*chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // listen for messages sent from background.js
      if (request.message === 'hello!') {
        console.log(request.url) // new url is now in content scripts!
      }
  });*/