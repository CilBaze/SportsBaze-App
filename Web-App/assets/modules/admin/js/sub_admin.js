$(document).on('click','#add-user',function(e) {
	 e.preventDefault();
	$.ajax({
        type: 'get',
        url: base_url+'admin/add_user',
        success: function (data) {
            
            $(".modal_section").html(data);
            $("#edit-form").modal("show");
        }
    });
});

$(document).on('click','.edit-profile',function(e) {
	
	 var id = $(this).data('id');
	$.ajax({
        type: 'get',
        url: base_url+'admin/add_user/'+id,
        success: function (data) {            
            $(".modal_section").html(data);
            $("#edit-form").modal("show");
        }
    });
});
$(document).on('click','.delete-profile',function(e) {
	
	var id = $(this).data('id');	
  	if (confirm("Are you sure you want to delete?")) {
	    $.ajax({
	        type: 'get',
	        url: base_url+'admin/delete_admin_user/'+id,
	        dataType:'json',
	        success: function (data) {            
	           //alert(data.message);
	           $('.alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + data.message + '</div>');
	           setTimeout(function(){ location.reload(true)}, 1000);
	           //location.reload();
	           
	        }
    	});
	 } 
	
});

