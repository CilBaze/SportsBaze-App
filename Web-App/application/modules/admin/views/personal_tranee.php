<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Personal Trainer</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Personal Trainer</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="upload-video-section">
        <div class="row">
            <div class="col-md-7">
                <div class="upload-video-form">
                    <form action="<?php echo base_url('admin/save_trainee');?>" method="post" enctype="multipart/form-data" id="traineeForm">
                        <div class="alert-error-message"></div>
                        <div class="upload-video-info">
                            <div class="row">
                                
                                <div class="col-md-3 upload-section">
                                    <div class="form-group">
                                        <div class="upload-file">
                                            <input type="file" name="" id="addfile" class="uploadfile addfile" data-multiple-caption="{count} files selected" multiple="" accept=".gif,.png,.jpeg,.jpg,.mp4">
                                            <label for="addfile">
                                                <div class="upload-media">
                                                    <i class="las la-plus-circle"></i>
                                                </div> 
                                                <span>Choose a file…</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div class="row">
                                
                                <div class="col-md-3 upload-profile-section">
                                    <div class="form-group" id="profile_pic">
                                         <label>Profile Pic</label>
                                        <div class="upload-file">
                                            <input type="file" name="" id="addfile1" class="upload-profile addfile" data-multiple-caption="{count} files selected" multiple="" accept=".gif,.png,.jpeg,.jpg,.mp4" style="    width: 0.1px;height: 0.1px;    opacity: 0;overflow: hidden;    position: absolute;z-index: -1;">
                                            <label for="addfile1">
                                                <div class="upload-media">
                                                    <i class="las la-plus-circle"></i>
                                                </div> 
                                                <span>Choose a profile…</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" name="title" class="form-control"  placeholder="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="text" name="email" class="form-control"  placeholder="">
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Speciality</label>
                                        <input type="text" name="speciality" class="form-control"  placeholder="Speciality">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Skill Set</label>
                                        <input type="text" name="skill" class="form-control" placeholder="Skill">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Years of Experience</label>
                                        <input type="text" name="experience" class="form-control"  placeholder="Experience">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Rating</label>
                                        <input type="text" name="rating" class="form-control"  placeholder="Rating">
                                    </div>
                                </div>
                               
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea class="form-control"  placeholder="" name="description"></textarea>
                                    </div>
                                </div>
                                <input type="hidden" name="trainee_id" value="">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button type="submit" class="sb-modal-btn">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-5">
                <div class="feeds-sidebar">
                    <div class="feeds-search">
                        <div class="sidebar-form-group">
                            <form method="get" action="<?php echo base_url('admin/personal_trainee');?>">
                                <input class="form-control" type="text" name="keywords" value="<?php  echo @$this->input->get('keywords');?>" placeholder="Enter keyword...">
                                <i class="search-form-icon fa fa-search search-posts" aria-hidden="true"></i>
                            </form>
                        </div>
                    </div>

                    <div class="feeds-content-list">
                        <?php 

                            if(isset($recent_posts['records']) && !empty($recent_posts['records'])) {
                                foreach ($recent_posts['records'] as $trainee) {
                                      //print_r($trainee);
                                    $profile_pic = ($trainee->profile_pic)?$trainee->profile_pic : base_url('assets/images/profile.png');                                    
                                    echo '<div class="sb-feeds-content-item">
                                            <div class="sb-feeds-header">
                                                <div class="sb-feeds-user-info">
                                                    <div class="sb-feeds-user-media">
                                                        <img src="'. $profile_pic.'">
                                                    </div>
                                                    <div class="sb-feeds-user-text">
                                                        <h2>'.$trainee->title.'</h2>
                                                    </div>
                                                </div>
                                                <div class="feeds-user-action">
                                                    <a href="javascript:void(0)" class="action-btn delete-post-item pull-right" data-id="'.encrypt_decrypt('encrypt', $trainee->id).'">
                                                       <i class="fa fa-times"></i>
                                                    </a>
                                                </div>
                                                <div class="feeds-user-action">
                                                    <a href="javascript:void(0)" class="action-btn edit-post-item pull-right" data-id="'.encrypt_decrypt('encrypt', $trainee->id).'">
                                                       <i class="fa fa-pencil"></i>
                                                    </a>
                                                </div>
                                            </div>';?>
                                          
                                        <div class="sb-feeds-slider">
                                            <div id="sb-feeds-slider<?php echo $trainee->id;?>" class="sb-feeds-slider owl-carousel owl-theme"> 
                                                <?php if(count($trainee->post_images) > 0 ){          
                                                    foreach ($trainee->post_images as $image) {
                                                       
                                                    $first_image = $image->name;
                                                    $image_path = explode('.', $first_image);
                                                    $fileExtension = end($image_path);
                                        
                                                echo '<div class="item"><div class="sb-feeds-media">';
                                                        if($fileExtension == "mp4"){
                                                            echo '<video src="'.$image->name.'" controls></video>';
                                                        }else{
                                                            echo '<img src="'.$image->name.'" alt="">';
                                                        }
                                                    echo '</div></div>'; 
                                    }}?>

                                    </div>
                                </div> 
                                <script type="text/javascript">
                                     $(document).ready(function () {
                                        $('#sb-feeds-slider<?php echo $trainee->id;?>').owlCarousel({
                                            loop:true,
                                            margin:10,
                                            nav:true,
                                            dots:false,
                                            items:1 

                                        });
                                    });
                                </script>
                                    <?php echo '<p>Email: '.$trainee->email.'</p>
                                            <p>Description: '.$trainee->description.'</p> 
                                            <div class="sb-feeds-footer">
                                                
                                                <a class="Visit-btn view-trainer-profile" href="javascript:void(0);" title="View Profile" data-id="'.encrypt_decrypt('encrypt',$trainee->id).'">
                                                    View Profile
                                                </a>
                                                <a class="Visit-btn view-trainer-session" href="javascript:void(0);" title=" View session" data-id="'.encrypt_decrypt('encrypt',$trainee->id).'">
                                                    View session
                                                </a>
                                            </div>
                                        </div>';
                                }
                            }
                        ?>
                        

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal_section"></div>