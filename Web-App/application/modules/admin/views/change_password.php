<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Change Password</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Change Password</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="upload-video-section">
        <div class="row">
            <div class="col-md-12">
                <?php $this->load->view('common/error');?>
                <div class="upload-video-form">
                    <form action="<?php echo base_url('admin/change_password');?>" method="post" enctype="multipart/form-data" id="change_password">
                        <div class="alert-error-message"></div>
                        <div class="upload-video-info">                            
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Old Password</label>
                                        <input class="form-control" name="current_password" type="password" value="<?php echo (empty(form_error('current_password')))?set_value('current_password'):'';?>">
                                        <?php echo form_error('current_password');?>
                                    </div> 
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>New Password</label>
                                        <input class="form-control" name="new_password" type="password">
                                        <?php echo form_error('new_password');?>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input class="form-control" name="confirm_password" type="password">
                                        <?php echo form_error('confirm_password');?>
                                    </div>
                                </div>
                                
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <button type="submit" class="sb-modal-btn">Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</div>
