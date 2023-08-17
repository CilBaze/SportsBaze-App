<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"><?php echo (isset($sub_sports_id) && !empty($sub_sports_id)) ?  "Edit Sub Category": "Add Sub Category";?></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="subCategoryForm">
                    <div class="alert-error-message"></div>
                    <input type="hidden" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>"> 
                    <input type="hidden" name="sub_sports_id" value="<?php echo (isset($sub_sports_id) && !empty($sub_sports_id)) ? $sub_sports_id : ''; ?>">
                    <div class="form-group">
                        <label>Select Category</label>
                        <select class="form-control" name="sports_id">
                            <option value="">Select</option>
                            <?php 
                              if($category_data->num_rows() > 0) {
                                foreach ($category_data->result() as $category_detail) {
                                  $selected = (isset($sports_id) && !empty($sports_id)) ? $sports_id == $category_detail->sports_id? "selected" : "": "";
                                  echo '<option value="'.encrypt_decrypt('encrypt',$category_detail->sports_id).'" '.$selected .'>'.$category_detail->sports_name.'</option>';
                                  
                                }
                              }
                            ?>
                            
                        </select>
                    </div> 
                    <div class="form-group">
                        <label>Sub Category</label>

                        <input type="text" class="form-control" name="sports_name" value="<?php echo (isset($sports_name) && !empty($sports_name)) ? $sports_name : ''; ?>" placeholder="Sub Category">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="sb-modal-btn">Save</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>