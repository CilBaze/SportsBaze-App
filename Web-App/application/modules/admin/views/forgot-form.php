<style type="text/css">
  .modal-content {
      background: #fff;
  }
</style>
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">Forgot Password</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div id="message"></div>
     <form id="forgot-email-form">
        <div class="form-group">
          <label for="recipient-name" class="col-form-label">Email:</label>
          <input type="text" class="form-control" id="email" name="email">
        </div>
        <button type="button" class="sb-modal-btn" id="forgot-email">Submit</button>
      </form>
  </div>
 
</div>

<script type="text/javascript">
  $(document).on('click','#forgot-email',function(){
    var email =$('#forgot-email-form #email').val();
    ///console.log(email);
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /*if (email==' ') {
      $('#message').html('<div class="alert alert-danger" role="alert">Email field is required</div>');
      return false;
    }else*/ if(reg.test(email) == false){     
      $('#message').html('<div class="alert alert-danger" role="alert">Email is not valid</div>');
      return false;
    }else{
    $.ajax({
      url:base_url+'admin/forgot_password',
      data:{email:email},
      dataType:'json',
      type:'post',
      success:function(data){
        if (data.status) {
          $('#forgot-form').modal('show');
          //$('.forgot-form').html(data.div);
          $('#message').html('<div class="alert alert-success" role="alert">'+data.message+'</div>');
        }else{
          $('#message').html('<div class="alert alert-danger" role="alert">'+data.message+'</div>');
        }
      }
    });
  }
  });
</script>
  