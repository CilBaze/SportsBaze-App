<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">View Session</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="categoryForm">
                    <div class="alert-error-message"></div>
                     <?php if ($user_info->num_rows()) {
                            foreach ($user_info->result() as  $row) {?>
                      <div class="user-session-info">
                        <ul class="Trainer-other-list">
                          <li>
                            <span class="pd-left">Name:</span>
                            <span class="pd-right"><?php echo $row->name ;?></span>
                          </li>
                          <li>
                            <span class="pd-left">Profile Name:</span>
                            <span class="pd-right"><?php echo $row->profile_name;?></span>
                          </li>
                          <li>
                            <span class="pd-left">Date:</span>
                            <span class="pd-right"><?php echo date('m-d-Y',strtotime($row->date));?></span>
                          </li>
                          <li>
                            <span class="pd-left">Time:</span>
                            <span class="pd-right"><?php echo date('H:i A',strtotime($row->time));?></span>
                          </li>
                          <li>
                            <span class="pd-left">Type:</span>
                            <span class="pd-right"><?php echo $row->type;?></span>
                          </li>
                          <li>
                            <span class="pd-left">Meeting Link:</span>
                            <span class="pd-right"><?php echo $row->meeting_link;?></span>
                          </li>
                        </ul>
                      </div>
                    <?php }                            
                            }?>   
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>