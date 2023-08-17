

<div class="vd_content-wrapper">
    <div class="vd_container">
        <div class="vd_content clearfix">
            <div class="vd_head-section clearfix">
                <div class="vd_panel-header">

                    <div class="vd_panel-menu hidden-sm hidden-xs" data-intro="<strong>Expand Control</strong><br/>To expand content page horizontally, vertically, or Both. If you just need one button just simply remove the other button code." data-step=5  data-position="left">

                        <div data-action="remove-navbar" data-original-title="Remove Navigation Bar Toggle" data-toggle="tooltip" data-placement="bottom" class="remove-navbar-button menu"> <i class="fa fa-arrows-h"></i> </div>
                        <div data-action="remove-header" data-original-title="Remove Top Menu Toggle" data-toggle="tooltip" data-placement="bottom" class="remove-header-button menu"> <i class="fa fa-arrows-v"></i> </div>
                        <div data-action="fullscreen" data-original-title="Remove Navigation Bar and Top Menu Toggle" data-toggle="tooltip" data-placement="bottom" class="fullscreen-button menu"> <i class="glyphicon glyphicon-fullscreen"></i> </div>
                    </div>
                </div>
            </div>
            <div class="vd_content-section clearfix">
                <div class="panel widget light-widget">
                    <div class="panel-heading vd_bg-grey">
                        <h3 class="panel-title" style="color:#fff"> <span class="menu-icon"> <i class="fa fa-dot-circle-o"></i> </span> Update Mechanic</h3>
                    </div>
                    <?php $post = $post->row_array();?>
                    <div class="panel-body">
                        <div class="panel widget">
                            <div  class="panel-body">
                                <?php $this->load->view('common/error');?>
                                <form action="<?php echo base_url('admin/update_mechanic/'.$post['id']);?>" method="post" enctype="multipart/form-data">
                                    <div class="col-md-12 label-H">
                                        <a class="btn-or" href="<?php echo base_url('admin/mechanic')?>">Back</a>
                                    </div>
                                    <div class="col-md-6">
                                      <input type="hidden" name="user_id" value="<?php echo $post['id'];?>">
                                        <label for="name">Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Name" name="name" value="<?php echo ($post['name'])?$post['name']:set_value('name'); ?>">
                                        <?php echo form_error('name'); ?>
                                        
                                      </div>
                                      <div class="col-md-6">
                                        <label for="email">Email<span class="text-danger">*</span></label>
                                        <span class="form-control"><?php echo ($post['email'])?$post['email']:set_value('email'); ?></span>
                                        
                                      </div>
                                      <div class="col-md-6 mt-20">
                                        <label for="mobile">Contact No<span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="contact_no" placeholder="Contact No" name="contact_no" value="<?php echo ($post['contact_no'])?$post['contact_no']:set_value('contact_no'); ?>">
                                        <?php echo form_error('contact_no'); ?>
                                      </div>
                                      <div class="col-md-6 mt-20">
                                        <input type="hidden" name="card_id" value="<?php echo ($post['card_id'])?$post['card_id']:''?>">
                                        <label for="brand">Account Holder Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="card_holder_name" placeholder="A/C Holder Name" name="account_holder_name" value="<?php echo ($post['account_holder_name'])?encrypt_decrypt('decrypt',$post['account_holder_name']):''; ?>">
                                        <?php echo form_error('account_holder_name'); ?>
                                        
                                        
                                      </div>
                                      <div class="col-md-6 mt-20 label-H">
                                        <label for="set_option">Bank Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="bank_name" placeholder="Bank Name" name="bank_name" value="<?php echo  ($post['bank_name'])?encrypt_decrypt('decrypt',$post['bank_name']):''; ?>">                                       
                                        <?php echo form_error('bank_name'); ?>
                                    </div>
                                    <div class="col-md-6 mt-20">
                                        <label for="year">Account No<span class="text-danger">*</span></label>
                                         <input type="text" class="form-control" id="account_number" placeholder="Account no" name="account_number" value="<?php echo ($post['account_number'])?encrypt_decrypt('decrypt',$post['account_number']):''; ?>">                                       
                                        <?php echo form_error('account_number'); ?>
                                        
                                    </div>
                                    <div class="col-md-6 mt-20">
                                        <label for="year">Routing No<span class="text-danger">*</span></label>
                                         <input type="text" class="form-control" id="routing_number" placeholder="Routing no" name="routing_number" value="<?php echo ($post['routing_number'])?encrypt_decrypt('decrypt',$post['routing_number']):''; ?>">                     
                                        <?php echo form_error('routing_number'); ?>                            
                                    </div>
                                    <!-- <div class="col-md-6 mt-20">
                                        <label for="year">Business Name<span class="text-danger">*</span></label>
                                         <input type="text" class="form-control" id="business_name" placeholder="Business name" name="business_name" value="<?php echo $post['business_name']; ?>">                     
                                        <?php echo form_error('business_name'); ?>
                                    </div> -->
                                     
                                    <div class="col-md-6 mt-20">
                                         <input type="hidden" name="business_id" value="<?php echo ($post['business_id'])?$post['business_id']:''?>">
                                        <label for="rate">Business Address<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="rate" placeholder="Business Address" name="business_address" value="<?php echo $post['business_address'];?>"> 
                                        <?php echo form_error('business_address'); ?>
                                    </div>
                                    <div class="col-md-6 mt-20">
                                        <label for="rate">Range<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="service_range" placeholder="Range" name="service_range" value="<?php echo $post['service_range'];?>"> 
                                        <?php echo form_error('service_range'); ?>
                                    </div>
                                    <div class="col-md-6 mt-20">
                                        <label class="control-label ">Status</label>
                                        <div id="email-input-wrapper"  class="controls ">
                                            <div class="vd_radio radio-success">
                                                <input type="radio" <?php echo !empty($post['status']) ? $post['status'] == 1 ? 'checked' : ''  : '' ?> class="radiochk status" value="1" id="optionsRadios8" name="status">
                                                <label for="optionsRadios8"> Active</label>
                                                <input type="radio" <?php echo empty($post['status']) ? 'checked' : '' ?> value="2" class="radiochk status" id="optionsRadios9" name="status">
                                                <label for="optionsRadios9"> Inactive</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mt-20">
                                        
                                        <button type="submit" class="btn btn-or">Submit</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
