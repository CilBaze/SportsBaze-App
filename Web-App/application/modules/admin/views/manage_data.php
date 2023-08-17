<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Manage Data</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Manage Data</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="manage-data-section">
        <div class="card vd-card">
            <div class="card-header">
                <div class="d-flex align-items-center">
                    <div class="mr-auto">
                        <h4 class="card-title">Category</h4>
                    </div>
                    <div class="add-option-info">
                    <a href="javascript:void(0)" class="btn-add add-category category_action" data-title="add">Add New Category</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="manage-list-item">
                    <h2>Existing Value</h2>
                    <div class="row">
                        <?php 
                            if($category_data->num_rows() > 0 ) {
                                $cat_count = 1;
                                foreach ($category_data->result() as $category_detail) {
                                    echo '<div class="col-md-6">
                                        <div class="cat-info-card">
                                            <div class="cat-info-serial">
                                               '.$cat_count.'
                                            </div>
                                            <div class="cat-info-content">
                                                <h2>'.ucwords($category_detail->sports_name).'</h2>
                                            </div>
        
                                            <div class="cat-info-action">
                                                <a href="javascript:void(0)" class="edit-btn edit-category category_action" data-id="'.encrypt_decrypt('encrypt',$category_detail->sports_id).'" data-title="edit">
                                                    <i class="las la-edit"></i>
                                                </a>
                                                <a href="javascript:void(0)" class="delete-btn delete-category category_action" data-title="delete" data-id="'.encrypt_decrypt('encrypt',$category_detail->sports_id).'">
                                                   <i class="las la-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>';
                                    $cat_count++;
                                }
                            }
                        ?>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="manage-data-section">
        <div class="card vd-card">
            <div class="card-header">
                <div class="d-flex align-items-center">
                    <div class="mr-auto">
                        <h4 class="card-title">Sub Category</h4>
                    </div>
                    <div class="add-option-info">
                    <a href="javascript:void(0)" class="btn-add add-sub-category sub_category_action" data-title="Add">Add New Sub Category</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                
                <?php 
                    if($category_data->num_rows() > 0 ) {
                        $cat_sub_count = 1;
                        $prev_cat_id = "";
                        foreach ($sub_category_data->result() as $sub_category_detail) {
                            if($sub_category_detail->sports_id == $prev_cat_id){
                                echo '<div class="col-md-6">
                                            <div class="cat-info-card">
                                                <div class="cat-info-serial">
                                                   '.$cat_sub_count.'
                                                </div>
                                                <div class="cat-info-content">
                                                    <h2>'.ucwords($sub_category_detail->sub_sports_name).'</h2>
                                                </div>
            
                                                <div class="cat-info-action">
                                                    <a href="javascript:void(0)" class="edit-btn edit-sub-category sub_category_action" data-id="'.encrypt_decrypt('encrypt',$sub_category_detail->sub_sports_id).'" data-title="edit">
                                                        <i class="las la-edit"></i>
                                                    </a>
                                                    <a href="javascript:void(0)" class="delete-btn delete-sub-category sub_category_action" data-id="'.encrypt_decrypt('encrypt',$sub_category_detail->sub_sports_id).'" data-title="delete">
                                                       <i class="las la-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>';
                            }
                            else{
                                echo $cat_sub_count > 1 ?  "</div></div>" : "";
                                $cat_sub_count = 1;
                                echo '<div class="manage-list-item">
                                        <h2>'.ucwords($sub_category_detail->sports_name).'</h2>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="cat-info-card">
                                                    <div class="cat-info-serial">
                                                       '.$cat_sub_count.'
                                                    </div>
                                                    <div class="cat-info-content">
                                                        <h2>'.ucwords($sub_category_detail->sub_sports_name).'</h2>
                                                    </div>
                
                                                    <div class="cat-info-action">
                                                        <a href="javascript:void(0)" class="edit-btn edit-sub-category sub_category_action" data-id="'.encrypt_decrypt('encrypt',$sub_category_detail->sub_sports_id).'" data-title="edit">
                                                            <i class="las la-edit"></i>
                                                        </a>
                                                        <a href="javascript:void(0)" class="delete-btn delete-sub-category sub_category_action" data-id="'.encrypt_decrypt('encrypt',$sub_category_detail->sub_sports_id).'" data-title="delete">
                                                           <i class="las la-trash"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>';
                            }
                            $prev_cat_id = $sub_category_detail->sports_id;
                            $cat_sub_count++;
                        }
                        echo '</div></div>';
                    }
                ?>
                    
            </div>
        </div>
    </div>
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
    <div class="manage-data-section">
        <div class="card vd-card">
            <div class="card-header">
                <div class="d-flex align-items-center">
                    <div class="mr-auto">
                        <h4 class="card-title">Distance Settings</h4>
                    </div>
                </div>
            </div>
            <div class="card-body">
             <?php echo form_open_multipart(base_url('admin/update_settings')); ?>
                <div class="manage-list-item">
                    <div class="row">                   
                        <?php
                        if($distance_settings_item){
                            foreach ($distance_settings_item as $value) { ?>
                                <div class="col-md-3">
                                    <div class="manage-list-item-inner">
                                        <h2>Distance</h2>  
                                        <div class="cat-info-card">
                                            <div class="cat-info-content">
                                                <input type="number" name="distance[]" class="form-control" value="<?php echo $value;?>" placeholder="Distance in miles" onkeydown="return OnlyNumericKey(event);">
                                            </div>
        
                                            <div class="cat-info-action">
                                                <a href="javascript:void(0)" class="delete-btn remove-distance-item remove-btn" data-title="delete" data-id="'.encrypt_decrypt('encrypt',$category_detail->sports_id).'">
                                                   <i class="las la-trash"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php  }
                            }
                        ?>

                        <div class="col-md-3">
                            <div class="manage-list-item-inner">
                                <h2>Distance</h2>  
                                <div class="cat-info-card">
                                    <div class="cat-info-content" style="width: 100%;">
                                        <input type="number" name="distance[]" class="form-control" value="" placeholder="Distance in miles" onkeydown="return OnlyNumericKey(event);">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 add-more-section">
                            <div class="manage-list-item-inner">
                                <div class="cat-info-card" style="margin-top: 20px;">
                                    <a href="javascript:" class="btn-add add-more-distance">Add More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="manage-list-item">
                    <div class="row"> 
                        <div class="col-md-3">                              
                            <div class="form-group">                                       
                                <button type="submit" class="sb-modal-btn"> Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php echo form_close(); ?>
                    
            </div>
        </div>
    </div>
</div>
            <!-- Modal -->
<div class="modal_section">
    
</div>