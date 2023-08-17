<style type="text/css">
    .auth-section .container {
    max-width: 33%;
}
</style>
<div class="auth-content-info">
    <!-- <div class="auth-left-content">
        <div class="auth-media">
            <img src="<?php echo base_url('assets/images/login-bg.png');?>" alt="Logo background">
        </div>
    </div> -->
    <div class="auth-right-content">
        <div class="form-content">
        <div class="logo-media">
            <!-- <img src="<?php echo base_url('assets/images/logo.png');?>" alt="logo" height="60"> -->
            <h3 style="color: #fff;">Reset Password</h3>
        </div>
        <div class="auth-form">
            <form class="form-horizontal" action="<?php echo  base_url('admin/reset_password/'.$id.'/'.$time);?>" method="post" role="form">
                <input type="hidden" name="auth_id" value="<?php echo encrypt_decrypt('encrypt',$row->id);?>">
                <?php $this->load->view('common/error');?>                  
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="New Password" name="password" required="" value="<?php echo set_value('password');?>">
                    <?php echo form_error('password');?>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Confirm Password" name="confirm_password"  required>
                    <?php echo form_error('confirm_password'); ?>
                </div>
                               
                <div class="form-group">                    
                    <button class="auth-btn" type="submit" >Submit</button>
                    
                </div>
            </form>
        </div>
    </div>
    </div>
</div>          





