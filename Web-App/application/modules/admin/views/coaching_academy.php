<div class="container-fluid">
                <div class="we-page-title">
                    <div class="row">
                        <div class="col-md-5 align-self-center">
                            <h3 class="we-page-heading">Coaching Academy</h3> </div>
                        <div class="col-md-7 align-self-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Coaching Academy</li>
                            </ol>
                        </div>
                    </div>
                </div>


                <div class="upload-video-section">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="upload-video-form">
                                <form action="<?php echo base_url('admin/save_upload_video');?>" method="post" enctype="multipart/form-data" id="postForm">
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Title</label>
                                                    <input type="text" name="title" class="form-control"  placeholder="">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group address-row">
                                                    <input type="hidden" name="latitude" class="lat" value="">
                                                    <input type="hidden" name="longitude" class="lng" value="">
                                                    <label>Location</label>
                                                    <input type="text" name="location" class="form-control autocomplete"  placeholder="" autocomplete="off">
                                                </div>
                                            </div>
                                             <div class="col-md-6">
                                                <div class="form-group address-row">
                                                   
                                                    <label>Postal Code</label>
                                                    <input type="text" name="postal_code" class="form-control postal_code"  placeholder="Postal Code">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Link contact us form</label>                
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="radio-inline">
                                                      <input type="radio" name="link_contact_form" value="0" >No
                                                    </label>
                                                    <label class="radio-inline">
                                                      <input type="radio" name="link_contact_form" value="1" checked>Yes
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Contact Email</label>
                                                    <input type="text" name="contact_email" class="form-control"  placeholder="">
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <textarea class="form-control"  placeholder="" name="description"></textarea>
                                                </div>
                                            </div>
                                            <input type="hidden" name="post_id" value="">
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
                                        <form method="get" action="<?php echo base_url('admin/gym');?>">
                                            <input class="form-control" type="text" name="keywords" value="<?php  echo @$this->input->get('keywords');?>" placeholder="Enter keyword...">
                                            <i class="search-form-icon fa fa-search search-posts" aria-hidden="true"></i>
                                        </form>
                                    </div>
                                </div>

                                <div class="feeds-content-list">
                                    <?php 
                                        if(isset($recent_posts['records']) && !empty($recent_posts['records'])) {
                                            foreach ($recent_posts['records'] as $posts) {
                                                $location = ($posts->postal_code)?$posts->location.', '.$posts->postal_code:$posts->location;
                                                $profile_pic = $posts->profile_pic  != "" ? $posts->profile_pic : base_url('assets/images/profile.png');
                                                $user_group = get_user_group($posts->user_group);
                                                $default_image_preview = '<img src="'.base_url('assets/images/upload-video-bg.jpg').'" alt="">';
                                                //$website_url = $posts->website_url ? $posts->website_url : '#';
                                                if(count($posts->post_images) > 0 ){
                                                    $first_image = $posts->post_images[0];
                                                    
                                                    $image_path = explode('.', $first_image->image_url);
                                                    
                                                    $fileExtension = end($image_path);
                                                    if($fileExtension == "mp4")
                                                        $default_image_preview = '<video src="'.$first_image->image_url.'" controls></video>';
                                                    else
                                                        $default_image_preview = '<img src="'.$first_image->image_url.'" alt="">';
                                                }
                                                echo '<div class="sb-feeds-content-item">
                                                        <div class="feeds-user-action">
                                                            
                                                            <a href="javascript:void(0)" class="action-btn delete-post-item pull-right" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                               <i class="fa fa-times"></i>
                                                            </a>
                                                            <a href="javascript:void(0)" class="action-btn edit-post-item pull-right" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                               <i class="fa fa-pencil"></i>
                                                            </a>
                                                        </div>
                                                        <h2>'.$posts->title.'</h2>
                                                        <div class="sb-feeds-media">';?>
                                                            <div class="sb-feeds-slider">
                                                                <div id="sb-feeds-slider<?php echo $posts->post_id;?>" class="sb-feeds-slider owl-carousel owl-theme"> 
                                                                    <?php if(count($posts->post_images) > 0 ){          
                                                                        foreach ($posts->post_images as $image) {
                                                                           
                                                                        $first_image = $image->image_url;
                                                                        $image_path = explode('.', $first_image);
                                                                        $fileExtension = end($image_path);
                                                            
                                                                    echo '<div class="item"><div class="sb-feeds-media">';
                                                                            if($fileExtension == "mp4"){
                                                                                echo '<video src="'.$image->image_url.'" controls></video>';
                                                                            }else{
                                                                                echo '<img src="'.$image->image_url.'" alt="">';
                                                                            }
                                                                        echo '</div></div>'; 
                                                                }}?>

                                                                </div>
                                                            </div>    

                                                                <script type="text/javascript">
                                                                     $(document).ready(function () {
                                                                        $('#sb-feeds-slider<?php echo $posts->post_id;?>').owlCarousel({
                                                                            loop:true,
                                                                            margin:10,
                                                                            nav:true,
                                                                            dots:false,
                                                                            items:1 

                                                                        });
                                                                    });
                                                                </script>
                                            <?php echo '
                                                        </div>
                                                        <p>Description: '.$posts->description.'</p>
                                                        
                                                        <div class="sb-feeds-footer">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="loaction-info">
                                                                        <i class="las la-map-marker-alt"></i> '.$location.'
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="col-md-6 text-left">
                                                                    <a class="Visit-btn" href="'.base_url('admin/enquiry?post_id?='.$posts->post_id).'"  title="">
                                                                        Contact
                                                                    </a>
                                                                </div>
                                                                <div class="col-md-6 text-right">
                                                                    <div class="date-time">
                                                                        '.time_elapsed_string($posts->created_date).'
                                                                    </div>
                                                                </div>
                                                            </div>
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