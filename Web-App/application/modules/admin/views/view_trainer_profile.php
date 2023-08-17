<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Trainer Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="categoryForm">
                    <div class="alert-error-message"></div>
                    <div class="user-Trainer-info">
                      <ul class="Trainer-other-list">
                        <li>
                          <span class="pd-left">Name:</span>
                          <span class="pd-right"><?php echo $user_info->title;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Email:</span>
                          <span class="pd-right"><?php echo $user_info->email;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Speciality:</span>
                          <span class="pd-right"><?php echo $user_info->speciality;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Skill Set:</span>
                          <span class="pd-right"><?php echo $user_info->skill;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Years of Experience:</span>
                          <span class="pd-right"><?php echo $user_info->experience;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Rating:</span>
                          <span class="pd-right"><?php echo $user_info->rating;?></span>
                        </li>
                        <li>
                          <span class="pd-left">Description:</span>
                          <span class="pd-right"><?php echo $user_info->description;?></span>
                        </li>
                      </ul>
                    
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>