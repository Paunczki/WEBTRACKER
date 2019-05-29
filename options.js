$(function(){
    $('#saveTime').click(function(){
        var time = $('#time').val();
        if(time){
            chrome.storage.sync.set({'time' : time}, function(){
                close();
            });
        }
    });

    $('#saveFile').click(function(){
        chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
            writableFileEntry.createWriter(function(writer) {
              writer.onerror = errorHandler;
              writer.onwriteend = function(e) {
                console.log('write complete');
              };
              writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
            }, errorHandler);
        });
    }); 
});