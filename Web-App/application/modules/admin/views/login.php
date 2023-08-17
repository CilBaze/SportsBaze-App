<div class="auth-content-info">
    <div class="auth-left-content">
        <div class="auth-media">
            <img src="<?php echo base_url('assets/images/login-bg.png');?>" alt="Logo background">
        </div>
    </div>
    <div class="auth-right-content">
        <div class="form-content">
        <div class="logo-media">
            <img src="<?php echo base_url('assets/images/logo.png');?>" alt="logo" height="60">
        </div>
        <div class="auth-form">
            <form class="form-horizontal" action="<?php echo  base_url('admin/login');?>" method="post" role="form">
                <?php $this->load->view('common/error');?>
                <div class="form-group">
                    <input name="email" id="email" placeholder="Email Id" type="email" value="<?php echo set_value('email');?>" class="form-control" required>
                </div>
                <div class="form-group">
                    <input name="password" id="password" placeholder="Enter Password" type="password" class="form-control" required>
                    <?php echo form_error('password'); ?>
                </div>
                <div class="form-group">
                    <button type="submit" class="auth-btn">Login</button>
                </div>
                <div class="form-group">
                    <p class="forgot-text"><a href="javascript:void(0);" class="" id="forgot-password">Forgot Password?</a></p>
                </div>
            </form>
        </div>
    </div>
    </div>
</div>

<div class="modal fade sb-modal" id="forgot-form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog forgot-form" role="document" >
  </div>
</div>                 

