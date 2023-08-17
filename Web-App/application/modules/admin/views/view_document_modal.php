<div class="modal sb-modal fade" id="edit-form" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">View Documents</h5>
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
                        <tbody>
                          <tr>
                            <td>Professional Certificate</td>
                            <?php 
                            if ($user_info->professional_certificate) {
                              $file_arr = explode('.', $user_info->professional_certificate);
                              if ($file_arr[1]=='pdf') {?>
                                <td><?php echo ($user_info->professional_certificate) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->professional_certificate).'" class="action-btn" target="_blank"><i class="las la-file-pdf" style="font-size: 18px;"></i></a></a>': "No Documents";?>
                              <?php }else{?>
                                <td><?php echo ($user_info->professional_certificate) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->professional_certificate).'" class="action-btn" target="_blank"><img width="150px;" height="150px;" src="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->professional_certificate).'"/></a>': "No Documents";?></td>
                            <?php }                              
                            }
                            ?>
                              
                          </tr>
                          <tr>
                            <td>Letter of Employement</td>
                            <?php 
                            if ($user_info->letter_of_employment) {
                              $file_arr1 = explode('.', $user_info->letter_of_employment);
                              if ($file_arr1[1]=='pdf') {?>
                                <td><?php echo ($user_info->letter_of_employment) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->letter_of_employment).'" class="action-btn" target="_blank"><i class="las la-file-pdf" style="font-size: 18px;"></i></a></a>': "No Documents";?></td>
                              <?php }else{?>
                                <td><?php echo ($user_info->letter_of_employment) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->letter_of_employment).'" class="action-btn" target="_blank"><img width="150px;" height="150px;" src="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->letter_of_employment).'"/></a>': "No Documents";?></td>
                            <?php }                              
                            }
                            ?>
                            <!-- <td><?php echo ($user_info->letter_of_employment) ? '<img width="150px;" height="150px;" src="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->letter_of_employment).'"': "No Documents";?></td>
                            <td><?php echo ($user_info->letter_of_employment) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->letter_of_employment).'" class="action-btn" target="_blank"><i class="las la-eye"></i></a></a>': "";?> -->
                          </tr>
                          <tr>
                            <td>Id Proof</td>
                            <?php 
                            if ($user_info->id_card) {
                              $file_arr2 = explode('.', $user_info->id_card);
                              if ($file_arr2[1]=='pdf') {?>
                                <td><?php echo ($user_info->id_card) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->id_card).'" class="action-btn" target="_blank"><i style="font-size: 18px;" class="las la-eye"></i></a></a>': "No Documents";?></td>
                              <?php }else{?>
                                <td><?php echo ($user_info->id_card) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->id_card).'" class="action-btn" target="_blank"><img width="150px;" height="150px;" src="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->id_card).'"/></a>': "No Documents";?></td>
                            <?php }                              
                            }
                            ?>
                            <!-- <td><?php echo ($user_info->id_card) ? '<img width="150px;" height="150px;" src="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->id_card).'"': "No Documents";?></td>
                            <td><?php echo ($user_info->id_card) ? '<a href="'.base_url('uploads/documents/'.$user_info->id.'/'.$user_info->id_card).'" class="action-btn" target="_blank"><i class="las la-file-pdf"></i></a></a>': "";?></td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>