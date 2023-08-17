
<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Upload Video</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Upload Video</li>
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
                                        <label>Select Category</label>
                                        <select class="form-control bind-sub-category" name="sports_id">
                                            <option value="">Select</option>
                                            <?php 
                                              if($category_data->num_rows() > 0) {
                                                foreach ($category_data->result() as $category_detail) {
                                                  echo '<option value="'.$category_detail->sports_id.'">'.$category_detail->sports_name.'</option>';
                                                  
                                                }
                                              }
                                            ?>
                                            
                                        </select>
                                    </div> 
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Select Sub Category</label>
                                        <select class="form-control" name="sub_sports_id" id="sub_sports_id">
                                            <option value="" >select</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea type="" class="form-control"  placeholder="" name="description"></textarea>
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
                            <form method="get" action="<?php echo base_url('admin/upload_video');?>">
                                <input class="form-control" type="text" name="keywords" value="<?php  echo @$this->input->get('keywords');?>" placeholder="Enter keyword...">
                                <i class="search-form-icon fa fa-search search-posts" aria-hidden="true"></i>
                            </form>
                        </div>
                    </div>

                    <div class="feeds-content-list">
                        <?php 
                            if(isset($recent_posts['records']) && !empty($recent_posts['records'])) {
                                foreach ($recent_posts['records'] as $posts) {
                                    $profile_pic = $posts->profile_pic  != "" ? $posts->profile_pic : base_url('assets/images/profile.png');
                                    $user_group = get_user_group($posts->user_group);
                                    $default_image_preview = '<img src="'.base_url('assets/images/upload-video-bg.jpg').'" alt="">';
                                    if(count($posts->post_images) > 0 ){
                                        $first_image = $posts->post_images[0];
                                        
                                        $image_path = explode('.', $first_image->image_url);
                                        
                                        $fileExtension = end($image_path);
                                        if($fileExtension == "mp4")
                                            $default_image_preview = '<video src="'.$first_image->image_url.'" height="300px" controls></video>


                                            <video controls="controls" height="300px">
                                            <source src="'.$first_image->image_url.'" type="video/mp4">
                                            <p>Video is not Supporting</p>
                                        </video>





                                        ';
                                        else
                                            $default_image_preview = '<img src="'.$first_image->image_url.'" alt="">';
                                    }
                                    echo '<div class="feeds-content-item">
                                            <div class="feeds-header">
                                                <div class="feeds-user-info">
                                                    <div class="feeds-user-media">
                                                        <img src="'.$profile_pic.'" alt="'.$posts->user_first_name.'">
                                                    </div>
                                                    <div class="feeds-user-value">
                                                        <h2>'.$posts->user_first_name.' '.$posts->user_last_name.'</h2>
                                                        <p>'.$user_group.'</p>
                                                        <div class="feeds-cat-value">
                                                            '.$posts->sport_name.'- '.$posts->sub_sports_name.'
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="feeds-user-action">
                                                    <a href="javascript:void(0)" class="action-btn edit-post-item" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                       <i class="fa fa-pencil"></i>
                                                    </a>
                                                </div>
                                                <div class="feeds-user-action">
                                                    <a href="javascript:void(0)" class="action-btn delete-post-item" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                       <i class="fa fa-times"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="feeds-body">';?>
                                        <div class="sb-feeds-slider">
                                            <div id="sb-feeds-slider<?php echo $posts->post_id;?>" class="sb-feeds-slider owl-carousel owl-theme"> 
                                                <?php if(count($posts->post_images) > 0 ){          
                                                    foreach ($posts->post_images as $image) {
                                                       
                                                    $first_image = $image->image_url;
                                                    $image_path = explode('.', $first_image);
                                                    $fileExtension = end($image_path);
                                        
                                                echo '<div class="item"><div class="sb-feeds-media">';
                                                        if($fileExtension == "mp4"){
                                                            echo '<video  controls class="inlineVideo">
                                                            <source src="'.$image->image_url.'">
                                                            </video>';
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
                                            <?php echo  '<div class="feeds-body-content"><p>'.$posts->description.'</p></div>
                                            </div>
                                            <div class="feeds-footer">
                                                <div class="feeds-option-info">
                                                    <div class="feeds-like">
                                                        <a href="javascript:void(0);" class="view-all-like" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                            <i class="fa fa-heart" aria-hidden="true"></i>
                                                            '.count($posts->post_likes).' Likes
                                                        </a>
                                                    </div>
                                                    <div class="feeds-comment">
                                                        <a href="javascript:void(0);" class="view-all-comments" data-id="'.encrypt_decrypt('encrypt', $posts->post_id).'">
                                                            <i class="las la-comments"></i>
                                                            '.count($posts->post_comments).' Comments
                                                        </a>
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
<div class="modal_section"></div>