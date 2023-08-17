/*Upload Media File*/
$(document).on("change", ".uploadfile", function(){
    
    var files = this.files;   
     var mimeType=this.files[0]['type'];//mimeType=image/jpeg or application/pdf etc...


//ie image/jpeg will be ['image','jpeg'] and we keep the first value
    if(mimeType.split('/')[0] !== 'image'){
        alert('This file type is not allowed');
        return false;
       
    }                       
    var names = [];
    var file_data = files; 
    // for multiple files
    for(var i = 0;i<file_data.length;i++){
        var fd = new FormData();
        fd.append("file", file_data[i]);
        $.ajax({
            url:base_url+'admin/upload_media',
            type:'post',
            data:fd,
            contentType: false,
            processData: false,
            success:function(response){
                let responseInfo = JSON.parse(response);
                if(responseInfo.status) {
                    let fileType = responseInfo.filename.split('.').pop();
                    if(fileType == "mp4"){
                        var mp4Section = '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><video src="'+base_url+'uploads/temp/'+responseInfo.filename+'"></video></div><div class="upload-icon"><i class="lar la-play-circle"></i></div><span class="remove-file" data-filename="'+responseInfo.filename+'"><i class="fa fa-times"></i></span></div></div>'; 
                        $(mp4Section).insertBefore('.upload-section'); 
                    }
                    else{
                        var imgPreview = '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><img src="'+base_url+'uploads/temp/'+responseInfo.filename+'"></div><span class="remove-file" data-filename="'+responseInfo.filename+'"><i class="fa fa-times"></i></span></div></div>'; 
                        $(imgPreview).insertBefore('.upload-section'); 
                    }
                    
                }
                else
                    alert(responseInfo.msg);
                
            },
            error:function(response){
                alert('error : ' + JSON.stringify(response));
            }
        });
        
    }
    
    
});

/*Upload Media File*/
$(document).on("change", ".upload-profile", function(e){
    e.preventDefault() ;
    var files = this.files;    
                           
    var names = [];
    var file_data = files; 
    // for multiple files
    for(var i = 0;i<file_data.length;i++){
        var fd = new FormData();
        fd.append("file", file_data[i]);
        $.ajax({
            url:base_url+'admin/upload_profile_media',
            type:'post',
            data:fd,
            contentType: false,
            processData: false,
            success:function(response){
                let responseInfo = JSON.parse(response);
                if(responseInfo.status) {
                    let fileType = responseInfo.filename.split('.').pop();
                    $('#profile_pic').hide();
                    if(fileType == "mp4"){
                        var mp4Section = '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><video src="'+base_url+'uploads/temp/'+responseInfo.filename+'"></video></div><div class="upload-icon"><i class="lar la-play-circle"></i></div><span class="remove-profile" data-filename="'+responseInfo.filename+'" profile="profile"><i class="fa fa-times"></i></span></div></div>'; 
                        $(mp4Section).insertBefore('.upload-profile-section'); 
                    }
                    else{
                        var imgPreview = '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><img src="'+base_url+'uploads/temp/'+responseInfo.filename+'"></div><span class="remove-profile" data-filename="'+responseInfo.filename+'" profile="profile"><i class="fa fa-times"></i></span></div></div>'; 
                        $(imgPreview).insertBefore('.upload-profile-section'); 
                    }
                    
                }
                else
                    alert(responseInfo.msg);
                
            },
            error:function(response){
                alert('error : ' + JSON.stringify(response));
            }
        });
        
    }
    
    
});

/*Remove Upload File*/
$(document).on("click", ".remove-file", function(){

    let name = $(this).attr('data-filename');
    let pro = $(this).attr('profile');
    var obj = $(this);
    $.ajax({
        url: base_url + "admin/delete_temp_image",
        type: 'POST',
        data: {name: name},
        dataType: 'json',        
        success: function(res) {
            if(pro=='profile'){
                 $('#profile_pic').show();
            }
            if (res.status == 1) {
               obj.closest('.col-md-3').remove(); 
            }
            

        },
        error:function(res){
            
        }
    });
})
/*Remove Upload File*/
$(document).on("click", ".remove-profile", function(){
    
    let name = $(this).attr('data-filename');
    let pro = $(this).attr('profile');
    var obj = $(this);
    $.ajax({
        url: base_url + "admin/delete_temp_profile_image",
        type: 'POST',
        data: {name: name},
        dataType: 'json',        
        success: function(res) { 
            if(pro=='profile'){
                 $('#profile_pic').show();
            }           
            if (res.status == 1) {
               obj.closest('.col-md-3').remove(); 
            }
            

        },
        error:function(res){
            
        }
    });
})

/*Save Post Data*/
$(document).on('submit',"#traineeForm",function(e) {
    e.preventDefault();
    var formdata = { trainee_id: $(this).find('input[name=trainee_id]').val(), title: $(this).find('input[name=title]').val(),description: $(this).find('textarea[name=description]').val(),speciality: $(this).find('input[name=speciality]').val(),skill: $(this).find('input[name=skill]').val(),experience: $(this).find('input[name=experience]').val(),rating: $(this).find('input[name=rating]').val(),email: $(this).find('input[name=email]').val()};
    
    $.ajax({
        url: base_url + "admin/save_trainee",
        data: formdata,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
           $(".sb-modal-btn").html('Upload <i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');
           $("#postForm .alert-error-message").html('');
        },
        success: function(res) {
            if (res.status == 1) {
                $('#traineeForm .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                $('#traineeForm').find('input[name=post_id]').val("");
                setTimeout(function(){ location.reload(true)}, 1000);
            }
            else 
                $('#traineeForm .alert-error-message').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
            $(".sb-modal-btn").html('Upload ').removeAttr('disabled');

        },
        error:function(res){
            
        }
    });
});

/*Search Post*/
$(document).on('click', '.search-posts', function(){
    $(this).closest('form').submit();
});

$(document).on('click', '.view-all-comments', function(){
    let id = $(this).attr('data-id');

    $.ajax({
        type: 'get',
        url: base_url+'admin/get_all_comments/'+id,
        success: function (data) {
            
            $(".modal_section").html(data);
            $("#allComments-modal").modal("show");
        }
    });
});

/*Post Comments*/
$(document).on('click', '.post_comments_form', function(){
    
    var formdata = { post_id: $('.view-comment-group').find('input[name=post_id]').val(), message: $('.view-comment-group').find('input[name=message]').val()};
    
    $.ajax({
        url: base_url + "admin/post_comments",
        data: formdata,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
           $(".post_comments_form").html('Save <i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');
           $(".view-comment-footer .alert-error-message").html('');
        },
        success: function(res) {
            if (res.status == 1) {
                $('.view-comment-footer .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                //setTimeout(function(){ location.reload(true)}, 1000);
                var commentHtml = '<div class="view-comment-item"><div class="view-comment-item-media"><img src="'+res.data.profile_pic+'" alt="'+res.data.comments_by+'"></div><div class="view-comment-item-value"><h2>'+res.data.comments_by+'</h2><p>'+res.data.comments+'</p><div class="view-comment-time">Just Now</div></div></div>';
                $('#allComments-modal .view-comment-list').append(commentHtml);
                $('.view-comment-group').find('input[name=message]').val('');
                setTimeout(function(){ $('.view-comment-footer .alert-error-message').html('');}, 1000);

            }
            else 
                $('.view-comment-footer .alert-error-message').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
            $(".post_comments_form").html('Save ').removeAttr('disabled');

        },
        error:function(res){
            
        }
    });
});

/*Delete Post Data*/
$(document).on('click', '.delete-post-item', function(){

    if(!confirm("Are you sure to delete this records"))
        return false;
    let trainee_id = $(this).attr('data-id');
    $.ajax({
        url: base_url + "admin/delete_training_item",
        type: 'POST',
        data: {trainee_id: trainee_id},
        dataType: 'json',        
        success: function(res) {
            if (res.status == 1) {
               $('#traineeForm .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                setTimeout(function(){ location.reload(true)}, 1000); 
            }
            else{
                $('#traineeForm .alert-error-message').html('<div class="alert alert-error alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                
            }
            

        },
        error:function(res){
            
        }
    });
});

 $(document).on('click', '.view-trainer-profile', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: base_url+'admin/view_trainer_profile/'+id,
        success: function (data) {
            
            $(".modal_section").html(data);
            $("#edit-form").modal("show");
        }
    });
});
 $(document).on('click', '.view-trainer-session', function() {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: base_url+'admin/view_trainer_session/'+id,
        success: function (data) {
            
            $(".modal_section").html(data);
            $("#edit-form").modal("show");
        }
    });
});

/*Get Post Details*/
$(document).on('click', '.edit-post-item', function(){

    if(!confirm("Are you sure to edit this record"))
        return false;
    let trainee_id = $(this).attr('data-id');
    $.ajax({
        url: base_url + "admin/get_training_item",
        type: 'POST',
        data: {trainee_id: trainee_id},
        dataType: 'json',        
        success: function(res) {
            if (res.status == 1) {
               let post_details = res.data;
               $('#traineeForm').find('input[name=title]').val(post_details.title);
               $('#traineeForm').find('input[name=email]').val(post_details.email);
               $('#traineeForm').find('input[name=speciality]').val(post_details.speciality);
               $('#traineeForm').find('input[name=skill]').val(post_details.skill);
               $('#traineeForm').find('input[name=trainee_id]').val(post_details.id);
               $('#traineeForm').find('input[name=experience]').val(post_details.experience);
               $('#traineeForm').find('input[name=rating]').val(post_details.rating);
               $('#traineeForm').find('textarea[name=description]').val(post_details.description);
              // $('.upload-profile-section').html('<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><img src="'+base_url+'/uploads/profile_pic/'+post_details.id+'/'+post_details.profile_pic+'"></div><span class="remove-file" data-filename="'+post_details.id+'"><i class="fa fa-times"></i></span></div></div>'); 
               if(Array.isArray(post_details.images)) {
                   let uploadedImage = "";
                   post_details.images.forEach(function(item, index){
                        let fileType = item.name.split('.').pop();
                        if(fileType == "mp4")
                            uploadedImage+= '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><video src="'+item.name+'"></video></div><div class="upload-icon"><i class="lar la-play-circle"></i></div><span class="remove-exists-file" data-filename="'+item.image_id+'"><i class="fa fa-times"></i></span></div></div>'; 
                         
                        else
                            uploadedImage+= '<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><img src="'+item.name+'"></div><span class="remove-file" data-filename="'+item.image_id+'"><i class="fa fa-times"></i></span></div></div>'; 
                        
                   });
                   $(uploadedImage).insertBefore('.upload-section');
                   if (post_details.profile_pic) {
                       $('<div class="col-md-3"><div class="upload-media-item"><div class="upload-image"><img src="'+base_url+'/uploads/profile_pic/'+post_details.id+'/'+post_details.profile_pic+'"></div><span class="remove-profile" data-filename="'+post_details.profile_pic+'" profile="profile"><i class="fa fa-times"></i></span></div></div>').insertBefore('.upload-profile-section');
                       $('#profile_pic').hide();
                   }
                       
               }
            }
            else{
                $('#postForm .alert-error-message').html('<div class="alert alert-error alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.msg + '</div>');
                
            }
            

        },
        error:function(res){
            
        }
    });
});

/*Remove Existing Upload File*/
$(document).on("click", ".remove-exists-file", function(){
    let name = $(this).attr('data-filename');
    var obj = $(this);
    $.ajax({
        url: base_url + "admin/delete_exit_post_image",
        type: 'POST',
        data: {image_id: name},
        dataType: 'json',        
        success: function(res) {
            if (res.status == 1) {
               obj.closest('.col-md-3').remove(); 
            }
            

        },
        error:function(res){
            
        }
    });
})