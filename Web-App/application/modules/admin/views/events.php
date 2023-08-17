<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Events</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Event</li>
                </ol>
            </div>
        </div>
    </div>


    <div class="user-data-section">
        <div class="user-list-item">
            <div class="user-table-filter">
                <form action="<?php echo base_url('admin/events');?>" method="get">
                     <div class="row">
                        <!-- <div class="col-md-3 text-right">
                            <div class="form-group">
                               <button class="btn-download"><i class="las la-download"></i> Download Data</button>
                            </div>
                        </div> -->
                        <div class="col-md-3">
                            <div class="form-group">
                               <input type="text" class="form-control" name="keywords" value="<?php echo (isset($filter_data['keywords']))?$filter_data['keywords']:'';?>" placeholder="Search by Name/Location">
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="form-group">
                               <input type="date" class="form-control" name="start_date" value="<?php echo (isset($filter_data['start_date']))?$filter_data['start_date']:'';?>">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button class="btn-download"><i class="las la-search"></i> Search</button>
                        </div>
                        <div class="col-md-1">
                            <a class="btn-download" href="<?php echo base_url('admin/events');?>"><i class="las la-sync-alt"></i></a>
                        </div>
                        <div class="col-md-3 ">
                            <div class="form-group">
                                <div class="add-option-info">
                                <a class="btn-download event_action" data-title="add" href="javascript:void(0);"><i class="las la-plus" type="button"></i>Add New Event</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="user-table">
                <table>
                    <thead>
                        <th>Event Name</th>
                        <th>Event Date</th>
                        <th>Created By</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th style="white-space: nowrap;">Action</th>
                    </thead>
                    <tbody>
                        <?php 
                           //$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
                           if(isset($result) && is_array($result)) {
                              if(count($result) > 0) {
                                 foreach ($result as $user_info) { 
                                    $profile_pic = $user_info->profile_pic ? base_url('uploads/profile/'.$user_info->event_id.'/'.$user_info->profile_pic) : base_url('assets/images/profile.png');
                                    $event_id_encypt = encrypt_decrypt('encrypt', $user_info->event_id);
                                 ?>
                                    <tr>
                                        <td>
                                            <div class="table-text-info">
                                                <div class="table-info-value"><?php echo $user_info->event_name;?></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="table-text-info">
                                                <div class="table-info-value"><?php echo $user_info->event_date ? date('d, F Y', strtotime($user_info->event_date)) : "";?></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="table-text-info">
                                                <div class="table-info-value"><?php echo $user_info->user_first_name;?> <?php echo $user_info->user_last_name;?></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="table-text-info">
                                                <div class="table-info-value"><?php echo $user_info->event_description;?></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="table-text-info">
                                                <div class="table-info-value"><?php echo ($user_info->postal_code)?$user_info->location.', '.$user_info->postal_code:$user_info->location;?></div>
                                            </div>
                                        </td>
                                        <td style="white-space: nowrap;">
                                            <div class="table-text-info">
                                                <a href="javascript:void(0)" class="edit-btn action-btn event_action" data-id="<?php echo $event_id_encypt;?>" data-title="edit">
                                                            <i class="las la-edit"></i>
                                                        </a>
                                                        <a href="<?php echo base_url('admin/events_participant?post_id='.$user_info->event_id);?>" class="action-btn"  title="View Participant">
                                                            <i class="las la-eye"></i>
                                                        </a>
                                                        <a href="javascript:void(0)" class="delete-btn action-btn event_action" data-id="<?php echo $event_id_encypt;?>" data-title="delete">
                                                           <i class="las la-trash"></i>
                                                        </a>
                                            </div>
                                        </td>
                                    </tr>
                           <?php }
                              }
                              else
                                echo '<tr><td colspan="5">
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