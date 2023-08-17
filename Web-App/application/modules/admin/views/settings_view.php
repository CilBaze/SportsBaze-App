<?php 
$logo_settings_item = array();
$distance_settings_item = array();
if($settings->num_rows() > 0 ) {
    foreach ($settings->result() as $key => $settingData) {
        if($settingData->option_name == "logo_settings") 
            $logo_settings_item = ($settingData->option_value) ? unserialize($settingData->option_value) : array();
        else if($settingData->option_name == "distance_settings") 
            $distance_settings_item = ($settingData->option_value) ? unserialize($settingData->option_value) : array();
    }    
}
?>
<div class="container-fluid">
                <div class="we-page-title">
                    <div class="row">
                        <div class="col-md-5 align-self-center">
                            <h3 class="we-page-heading">Settings</h3> </div>
                        <div class="col-md-7 align-self-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Settings</li>
                            </ol>
                        </div>
                    </div>
                </div>


                <div class="manage-data-section">
                    <div class="card vd-card">
                        
                        <div class="card-body">
                            <div class="manage-list-item sb-modal-form">
                                <?php $this->load->view('common/error'); ?>
                                <?php echo form_open_multipart(base_url('admin/update_settings')); ?> 
                                <div class="row">
                                    <div class="col-md-12"><h2>Mobile Screen Settings</h2><hr /></div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dark Logo</label>
                                            <input type="file" name="dark_logo">

                                        </div>
                                        <?php 
                                            if(isset($logo_settings_item['dark_logo']) && !empty($logo_settings_item['dark_logo'])){
                                                echo '<div class="preview_area">
                                                    <div class="preview">
                                                        <img src="'.base_url('uploads/logo/'.$logo_settings_item['dark_logo']).'">
                                                    </div>
                                                </div>';    
                                            }
                                        ?>
                                        <div class="form-group"><input type="radio" name="active_logo" value="1" <?php echo (isset($logo_settings_item['active_logo']) && $logo_settings_item['active_logo'] == 1) ? "checked": "";?>><label>Active</label></div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Light Logo</label>
                                            <input type="file" name="light_logo">
                                        </div>
                                        <?php 
                                            if(isset($logo_settings_item['light_logo']) && !empty($logo_settings_item['light_logo'])){
                                                echo '<div class="preview_area">
                                                    <div class="preview">
                                                        <img src="'.base_url('uploads/logo/'.$logo_settings_item['light_logo']).'">
                                                    </div>
                                                </div>';    
                                            }
                                        ?>
                                        <div class="form-group"><input type="radio" name="active_logo" value="2" <?php echo (isset($logo_settings_item['active_logo']) && $logo_settings_item['active_logo'] == 2) ? "checked": "";?>><label>Active</label></div>
                                    </div>
                                    <div class="col-md-12"><h2>Distance Settings</h2><hr /></div>
                                    <?php
                                        if($distance_settings_item){
                                            foreach ($distance_settings_item as $value) { ?>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Distance</label>
                                                        <input type="number" name="distance[]" class="form-control" value="<?php echo $value;?>" placeholder="Distance in miles" onkeydown="return OnlyNumericKey(event);">
                                                    </div>
                                                    <a href="javascript:" class="remove-btn remove-distance-item"><i class="fa fa-times"></i></a>
                                                </div> 
                                            <?php  }
                                        }
                                    ?>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Distance</label>
                                            <input type="number" name="distance[]" class="form-control" value="" placeholder="Distance in miles" onkeydown="return OnlyNumericKey(event);">
                                        </div>
                                    </div>
                                    <div class="col-md-12 add-more-section">
                                        <a href="javascript:" class="btn-add pull-right add-more-distance">Add More</a>
                                    </div>

                                    
                                                                 
                                    <div class="col-md-12"><hr /></div>
                                    
                                    <div class="col-md-12"></div>
                                    <div class="col-md-3">                              
                                        <div class="form-group">                                       
                                            <button type="submit" class="sb-modal-btn"> Update</button>
                                        </div>
                                    </div>
                                </div> 
                                <?php echo form_close(); ?>
                            </div>
                        </div>
                    </div>
                </div>

                


            </div>
