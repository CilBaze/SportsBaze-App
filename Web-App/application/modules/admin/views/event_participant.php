<div class="container-fluid">
                <div class="we-page-title">
                    <div class="row">
                        <div class="col-md-5 align-self-center">
                            <h3 class="we-page-heading">Event Participant</h3> </div>
                        <div class="col-md-7 align-self-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Event Participant</li>
                            </ol>
                        </div>
                    </div>
                </div>


                <div class="user-data-section">
                    <div class="user-list-item">
                        <div class="user-table-filter">
                            <form method="get" action="<?php echo base_url('admin/events_participant');?>">
                                 <div class="row">
                                    
                                    <div class="col-md-4">
                                        <div class="form-group">
                                           <input type="text" class="form-control" name="keywords" placeholder="Name" value="<?php echo $filter_data['keywords'];?>">
                                        </div>
                                        <input type="hidden" name="post_id" value="<?php echo $filter_data['post_id'];?>">
                                        
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                           <input type="date" class="form-control" name="start_date" placeholder="Start Date" value="<?php echo (isset($filter_data['start_date']))?$filter_data['start_date']:'';?>">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                           <input type="date" class="form-control" name="end_date" placeholder="End Date" value="<?php echo (isset($filter_data['end_date']))?$filter_data['end_date']:'';?>">
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <button class="btn-download"><i class="las la-search"></i> Search</button>
                                    </div>

                                    
                                </div>
                            </form>
                            
                        </div>
                        <div class="user-table">
                            <table>
                                <thead>
                                    <th>Event Name</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </thead>
                                <tbody>
                                    <?php 
                                       //$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
                                       if(isset($result) && is_array($result)) {
                                          if(count($result) > 0) {
                                             foreach ($result as $user_info) { 
                                                
                                             ?>
                                                <tr>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <div class="table-info-value"><?php echo $user_info->title;?></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <div class="table-info-value"><?php echo $user_info->first_name. " ".$user_info->last_name?></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <div class="table-info-value"><?php echo $user_info->email;?> </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <div class="table-info-value"><?php echo $user_info->contact_no;?></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <div class="table-info-value"><?php echo $user_info->message;?></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="table-text-info">
                                                            <?php echo date('d, F Y', strtotime($user_info->created_date));?>
                                                        </div>
                                                    </td>
                                                </tr>
                                       <?php }
                                          }
                                          else
                                            echo '<tr><td colspan="6">
                                                      <div class="table-text-info">
                                                         <div class="table-info-value">No records found</div>

                                                      </div>
                                                   </td></tr>' ;

                                       }
                                    ?>
                                    
                                </tbody>
                            </table>
                            <div style="margin-top: 20px;">
                            <?= !empty($links) ? $links : ''; ?>
                            </div>
                        </div>
                    </div>
                </div>

               

            </div>
            <div class="modal_section">
        
            </div>