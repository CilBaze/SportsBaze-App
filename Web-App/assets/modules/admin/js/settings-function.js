// Add Setting
$(document).on('submit',"#update_settings",function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    formdata.append('csrf_test_name', $.cookie('csrf_cookie_name'));
    $.ajax({
        url: base_url + "admin/update_settings",
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
           $(".reply-request-message").html('Submit <i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');
           $("#replyRequest .alert-error-message").html('');
        },
        success: function(res) {
            if (res.status == 1) {
                $('#replyRequest .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                setTimeout(function(){ location.reload(true)}, 1000);
            }
            else 
                $('#replyRequest .alert-error-message').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
            $(".reply-request-message").html('Submit ').removeAttr('disabled');

        },
        error:function(res){
            
        }
    });
});
$(document).on("click",".add-more-distance", function(){
    var distanceHtml = '<div class="col-md-3"> <div class="manage-list-item-inner"> <h2>Distance</h2> <div class="cat-info-card"> <div class="cat-info-content"> <input type="number" name="distance[]" class="form-control" value="" placeholder="Distance in miles" onkeydown="return OnlyNumericKey(event);"> </div> <div class="cat-info-action"> <a href="javascript:" class="delete-btn remove-btn remove-distance-item"><i class="las la-trash"></i></a> </div> </div> </div> </div>';
    $(distanceHtml).insertBefore($(this).closest('.add-more-section'));
});
$(document).on("click",".remove-distance-item", function(){
    $(this).closest('.col-md-3').remove();
});

function OnlyNumericKey(e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||

        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
        (e.keyCode >= 35 && e.keyCode <= 40)) 
                return;

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) 

        e.preventDefault();

    

}