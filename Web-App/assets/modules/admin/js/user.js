$(document).ready(function() {
	$(document).on('click', '.btnaction', function () {
            var action = $(this).attr('data-original-title');
            var id = $(this).attr('id');
            if (action == 'edit' || action == "view") {
                $.ajax({
                    type: 'post',
                    url: base_url+'admin/getUser',
                    data: "user_id=" + id,
                    success: function (data) {
                        $("#confirm").modal("show");
                        $("#response").html(data);
                    }
                });
            }
            if (action == 'delete') {
                $('#confirmdel')
                        .modal('show', {backdrop: 'static', keyboard: false})
                        .one('click', '#delete', function (e) {
                            
                            $.ajax({
                                type: 'post',
                                url: base_url+'admin/delete_user',
                                data: "user_id=" + id,
                                dataType:'json',
                                success: function (data) {
                                    
                                    if (data.status) {
                                        location.reload();
                                        $('#msg').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
                                        $('.hiderow' + id).closest('tr').hide();
                                    }else{
                                        $('#msg').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                                    }

                                }
                            });
                        });
            }
        });
    $(document).on('click', '.bind_status', function() {
        var form = $(this).closest('form');
        $(form).find('input[name=status]').val($(this).attr('data-id'));
        $(form).submit();
    });
    $(document).on('change', '.user_group_filter', function() {
        var form = $(this).closest('form');        
        $(form).submit();
    });
    /*View Uploaded Documnets*/
    $(document).on('click', '.view-uplaoded-documents', function() {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: base_url+'admin/view_upload_documents/'+id,
            success: function (data) {
                
                $(".modal_section").html(data);
                $("#edit-form").modal("show");
            }
        });
    });
    /*View Uploaded Documnets*/
    $(document).on('click', '#view-user-profile', function() {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: base_url+'admin/view_user_detail/'+id,
            success: function (data) {                
                $(".modal_section").html(data);
                $("#edit-form").modal("show");
            }
        });
    });
    /*Delete User Profile*/
    $(document).on('click', '.delete-profile', function() {
        if(confirm("Are you sure to delete this user?")){
            let id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: base_url+'admin/delete_user',
                data: "user_id=" + id,
                dataType:'json',
                success: function (data) {
                    
                    if (data.status) {
                        location.reload();
                        $('#msg').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
                        $('.hiderow' + id).closest('tr').hide();
                    }else{
                        $('#msg').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                    }

                }
            });
        }
    })

    /*Approve/UnApprove User Profile*/
    $(document).on('click', '.approve-profile', function() {
        if(confirm("Are you sure to approve this user?")){
            let id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: base_url+'admin/change_profile_status',
                data: {"user_id": id, "status": 1},
                dataType:'json',
                success: function (data) {
                    
                    if (data.status) {
                        location.reload();
                        $('#msg').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
                        
                    }else{
                        $('#msg').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                    }

                }
            });
        }
    })

    $(document).on('click', '.reject-profile', function() {
        if(confirm("Are you sure to unapprove this user?")){
            let id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: base_url+'admin/change_profile_status',
                data: {"user_id": id, "status": 2},
                dataType:'json',
                success: function (data) {
                    
                    if (data.status) {
                        location.reload();
                        $('#msg').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
                        
                    }else{
                        $('#msg').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                    }

                }
            });
        }
    })

    $(document).on('click', '.suspend-profile', function() {
        if(confirm("Are you sure to suspend this user?")){
            let id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: base_url+'admin/change_profile_status',
                data: {"user_id": id, "status": 4},
                dataType:'json',
                success: function (data) {
                    
                    if (data.status) {
                        location.reload();
                        $('#msg').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
                        
                    }else{
                        $('#msg').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
                    }

                }
            });
        }
    })
});