
<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"><?php echo (isset($event_id) && !empty($event_id)) ?  "Edit Event": "Add Event";?></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="categoryForm">
                    <div class="alert-error-message"></div>
                    <input type="hidden" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>"> 
                    <input type="hidden" name="event_id" value="<?php echo (isset($event_id) && !empty($event_id)) ? encrypt_decrypt('encrypt',$event_id) : ''; ?>"> 
                    <div class="form-group ">
                        <label>Event Name</label>

                        <input type="text" class="form-control" name="event_name" value="<?php echo (isset($event_name) && !empty($event_name)) ? $event_name : ''; ?>" placeholder="Event Name">
                    </div>

                    <div class="form-group ">
                        <label>Event Date</label>

                        <input type="date" class="form-control" name="event_date" value="<?php echo (isset($event_date) && !empty($event_date)) ? date('Y-m-d', strtotime($event_date)) : ''; ?>" placeholder="Event Date">
                        
                    </div>
                    <div class="form-group address-row">
                        <label>Event Location</label>
                        <input type="hidden" name="latitude" class="lat" value="<?php echo (isset($latitude) && !empty($latitude)) ? $latitude : ''; ?>">
                        <input type="hidden" name="longitude" class="lng" value="<?php echo (isset($longitude) && !empty($longitude)) ? $longitude : ''; ?>">
                        <input type="text" class="form-control autocomplete" name="location" value="<?php echo (isset($location) && !empty($location)) ? $location : ''; ?>" placeholder="Event Location" autocomplete="off">
                    </div>
                    <div class="form-group">
                        <label>Postal Code</label>

                        <input type="text" class="form-control postal_code" name="postal_code" placeholder="Postal Code" value="<?php echo (isset($postal_code) && !empty($postal_code)) ? $postal_code : ''; ?>">
                    </div>
                    <div class="form-group">
                        <label>Event Description</label>

                        <textarea class="form-control" name="event_description" placeholder="Event Description"><?php echo (isset($event_description) && !empty($event_description)) ? $event_description : ''; ?></textarea>
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
    <style type="text/css">
    .pac-container {
        z-index: 999999999999999999;
    }
</style>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<?php echo  GOOGLE_API_KEY;?>&libraries=places&callback=initAutocomplete"></script>