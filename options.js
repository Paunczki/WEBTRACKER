$(function(){
    $('#saveTime').click(function(){
        var time = Number($('#timer').val());
        if(Number.isNaN(time)){
            alert('Please use actual numbers');
        }
        else{
            chrome.storage.sync.set({'time' : time}, function(){
                alert('Value saved as --> ' + time + ' milliseconds');
                alert('To begin recording open the popup and move the switch to "ON"');
                close();
            });
        }
    });
});