<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"><?php echo (isset($sports_id) && !empty($sports_id)) ?  "Edit Category": "Add Category";?></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="categoryForm">
                    <div class="alert-error-message"></div>
                    <input type="hidden" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>"> 
                    <input type="hidden" name="sports_id" value="<?php echo (isset($sports_id) && !empty($sports_id)) ? $sports_id : ''; ?>"> 
                    <div class="form-group">
                        <label>Category</label>

                        <input type="text" class="form-control" name="sports_name" value="<?php echo (isset($sports_name) && !empty($sports_name)) ? $sports_name : ''; ?>" placeholder="Category">
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