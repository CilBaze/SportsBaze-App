
/*Get Events Form*/
$(document).on('click', '.event_action', function () {
    var action = $(this).attr('data-title');
    var id = '';
    if(action == "edit" || action == "delete")
        id = $(this).attr('data-id');
    if(action == "delete") {
        var obj = $(this);
        if(confirm("Are you sure to delete this event?")){
            $.ajax({
                type: 'post',
                url: base_url+'admin/delete_events',
                data: "event_id=" + id,
                success: function () {
                    obj.closest('.col-md-6').remove();
                    setTimeout(function(){ location.reload(true)}, 1000);
                }
            });
        }
    }
    else{
        $.ajax({
            type: 'get',
            url: base_url+'admin/get_event_modal?event_id='+id,
            success: function (data) {
                
                $(".modal_section").html(data);
                $("#edit-form").modal("show");
            }
        });
    }
});
/*Add Category*/
$(document).on('submit',"#categoryForm",function(e) {
    e.preventDefault();
    var formdata = { event_id: $(this).find('input[name=event_id]').val(),
     event_name: $(this).find('input[name=event_name]').val(),
     event_location: $(this).find('input[name=location]').val(),
     latitude: $(this).find('input[name=latitude]').val(),
     longitude: $(this).find('input[name=longitude]').val(),
     event_description: $(this).find('textarea[name=event_description]').val(),
     event_date: $(this).find('input[name=event_date]').val(),
     postal_code: $(this).find('input[name=postal_code]').val(),
    };
    
    $.ajax({
        url: base_url + "admin/add_events",
        data: formdata,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
           $(".sb-modal-btn").html('Save <i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');
           $("#edit-form .alert-error-message").html('');
        },
        success: function(res) {
            if (res.status == 1) {
                $('#edit-form .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                setTimeout(function(){ location.reload(true)}, 1000);
            }
            else 
                $('#edit-form .alert-error-message').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
            $(".sb-modal-btn").html('Save ').removeAttr('disabled');

        },
        error:function(res){
            
        }
    });
});




