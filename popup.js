//working on/off change
$(function() {
    var switchStatus = false;
    $("#togBtn").on('change', function() {
        if($('#box').is(':checked')) {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
        }
        else {
            switchStatus = $("#togBtn").is(':checked');
            alert(switchStatus); //to verify
        }
    });
});
