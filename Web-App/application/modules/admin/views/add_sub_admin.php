
<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><?php echo (isset($users))?'Edit':'Sub admin user';?></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="sb-modal-form">
            <form method="post" action="<?php echo base_url('admin/add_user');?>" id="add_user_modal">
              <div class="alert-error-message"></div>
              
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="<?php echo (isset($users))?$users->first_name:'';?>">                    
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" value="<?php echo (isset($users))?$users->email:'';?>">
              </div>
              <input type="hidden" name="user_id" value="<?php echo (isset($users))?$users->id:'';?>">
              <?php if (!isset($users)) {?>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" name="password">
                </div>
                <div class="form-group">
                  <label for="conf_password">Confirm Password</label>
                  <input type="password" class="form-control" id="conf_password" name="conf_password">
                </div>
              <?php }?>
                
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
  /*Save Post Data*/
$(document).on('submit',"#add_user_modal",function(e) {
    e.preventDefault();
    var formdata = { user_id: $(this).find('input[name=user_id]').val(), name: $(this).find('input[name=name]').val(),email: $(this).find('input[name=email]').val(),password: $(this).find('input[name=password]').val(),conf_password: $(this).find('input[name=conf_password]').val()};
    
    $.ajax({
        url: base_url + "admin/save_user",
        data: formdata,
        type: 'POST',
        dataType: 'json',
        beforeSend: function() {
           $(".sb-modal-btn").html('Upload <i class="fa fa-spinner fa-spin"></i>').attr('disabled', 'disabled');
           $("#postForm .alert-error-message").html('');
        },
        success: function(res) {
            if (res.status == 1) {
                $('#add_user_modal .alert-error-message').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.message + '</div>');
                $('#add_user_modal').find('input[name=user_id]').val("");
                setTimeout(function(){ location.reload(true)}, 1000);
            }
            else 
                $('#add_user_modal .alert-error-message').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + res.message + '</div>');
            $(".sb-modal-btn").html('Upload ').removeAttr('disabled');

        },
        error:function(res){
            
        }
    });
});
</script>