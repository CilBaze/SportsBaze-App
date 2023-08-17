<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">View Profile</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="sb-modal-form">
                <form method="post" action="" id="categoryForm">
                    <div class="alert-error-message"></div>
                    <div class="user-table">
                      <table>
                        <?php //print_r($user_info);?>
                        <tbody>
                          <tr>
                            <td>Name:</td>
                            <td><?php echo $user_info->first_name;?><?php echo $user_info->last_name;?></td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td><?php echo $user_info->email;?></td>
                          </tr>
                          <tr><td>Parent/Guardian</td></tr>
                          <tr>
                            <td>Name</td>
                            <td><?php echo $user_info->parent_first_name;?><?php echo $user_info->parent_last_name;?></td>
                          </tr>
                          <tr>
                            <td>Email:</td>
                            <td><?php echo $user_info->parent_email;?></td>
                          </tr>
                          <tr>
                            <td>Phone No:</td>
                            <td><?php echo $user_info->parent_contact_no;?></td>
                          </tr>
                          <tr>
                            <td>Sport:</td>
                            <td><?php echo $user_info->sport_name;?></td>
                          </tr>
                          <tr>
                            <td>DOB:</td>
                            <td><?php echo date('d M Y',strtotime($user_info->dob));?></td>
                          </tr>
                          <tr>
                            <td>Gender:</td>
                            <td><?php echo $user_info->gender;?></td>
                          </tr>
                          <tr>
                            <td>Address:</td>
                            <td><?php echo $user_info->address;?></td>
                          </tr>
                          <tr>
                            <td>City:</td>
                            <td><?php echo $user_info->city;?></td>
                          </tr><tr>
                            <td>Zip Code:</td>
                            <td><?php echo $user_info->zip_code;?></td>
                          </tr>
                          <tr>
                            <td>Country:</td>
                            <td><?php echo $user_info->country;?></td>
                          </tr>
                          <tr>
                            <td>Nationality:</td>
                            <td><?php echo $user_info->nationality;?></td>
                          </tr>
                          <tr>
                            <td>Phone Number:</td>
                            <td><?php echo $user_info->contact_no;?></td>
                          </tr>
                          <?php if ($user_info->user_group==5) {?>
                          <tr>
                            <td>Current Club:</td>
                            <td><?php echo $user_info->current_club;?></td>
                          </tr>
                          <tr>
                            <td>Favorite Club:</td>
                            <td><?php echo $user_info->favourite_club;?></td>
                          </tr>
                          <tr>
                            <td>Preferred foot:</td>
                            <td><?php echo $user_info->preferred_foot;?></td>
                          </tr>
                          <tr>
                            <td>Height:</td>
                            <td><?php echo $user_info->height;?></td>
                          </tr>
                        <?php }else if($user_info->user_group==4){?>
                          <tr>
                            <td>Scouting for: </td>
                            <td><?php echo $user_info->scouting_name;?></td>
                          </tr>
                        <?php }?>
                        </tbody>
                      </table>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>