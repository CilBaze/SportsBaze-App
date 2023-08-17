
/*Get Category Form*/
$(document).on('click', '.category_action', function () {
    var action = $(this).attr('data-title');
    var id = '';
    if(action == "edit" || action == "delete")
        id = $(this).attr('data-id');
    if(action == "delete") {
        var obj = $(this);
        if(confirm("Are you sure to delete this category?")){
            $.ajax({
                type: 'post',
                url: base_url+'admin/delete_category',
                data: "sports_id=" + id,
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
            url: base_url+'admin/get_category_modal?sports_id='+id,
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
    var formdata = { sports_id: $(this).find('input[name=sports_id]').val(), sports_name: $(this).find('input[name=sports_name]').val()};
    
    $.ajax({
        url: base_url + "admin/add_category",
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


/*Get Sub Category Form*/
$(document).on('click', '.sub_category_action', function () {
    var action = $(this).attr('data-title');
    var id = '';
    if(action == "edit" || action == "delete")
        id = $(this).attr('data-id');
    if(action == "delete") {
        var obj = $(this);
        if(confirm("Are you sure to delete this sub category?")){
            $.ajax({
                type: 'post',
                url: base_url+'admin/delete_subcategory',
                data: "sports_id=" + id,
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
            url: base_url+'admin/get_subcategory_modal?sub_sports_id='+id,
            success: function (data) {
                
                $(".modal_section").html(data);
                $("#edit-form").modal("show");
            }
        });
    }
});

/*Add Sub Category*/
$(document).on('submit',"#subCategoryForm",function(e) {
    e.preventDefault();
    var formdata = { sub_sports_id: $(this).find('input[name=sub_sports_id]').val(), sports_id: $(this).find('select[name=sports_id]').val(), sports_name: $(this).find('input[name=sports_name]').val()};
    
    $.ajax({
        url: base_url + "admin/add_subcategory",
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


