$(function(){
    $('#saveTime').click(function(){
        var time = Number($('#timer').val());
        if(Number.isNaN(time)){
            console.log('Please use actual numbers');
        }
        else{
            browser.storage.sync.set({'time' : time}, function(){
                console.log('Value saved as --> ' + time + ' milliseconds');
                console.log('To begin recording open the popup and move the switch to "ON"');
                close();
            });
        }
    });
});