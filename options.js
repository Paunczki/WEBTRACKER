$(function(){
    $('#saveTime').click(function(){
        var time = $('#time').val();
        if(time){
            chrome.storage.sync.set({'time' : time}, function(){
                close();
            });
        }
    });
});