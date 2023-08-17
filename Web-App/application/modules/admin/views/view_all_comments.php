<?php

$user_group = get_user_group($post_info->user_group);
$profile_pic = $post_info->profile_pic  != "" ? $post_info->profile_pic : base_url('assets/images/profile.png');
?>
<div class="modal fade" id="allComments-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          <div class="modal-body">
            <div class="allcomments-content">
                <div class="row">
                    <div class="col-6">
                        <div class="modal-feeds-content-item">
                            <div class="modal-feeds-header">
                                <div class="modal-feeds-user-info">
                                    <div class="modal-feeds-user-media">
                                        <?php echo '<img src="'.$profile_pic.'" alt="'.$post_info->user_first_name.'">';?>
                                    </div>
                                    <div class="modal-feeds-user-value">
                                        <?php echo '<h2>'.$post_info->user_first_name.' '.$post_info->user_last_name.'</h2>
                                            <p>'.$user_group.'</p>
                                            <div class="feeds-cat-value">
                                                '.$post_info->sport_name.'- '.$post_info->sub_sports_name.'
                                            </div>';?>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-feeds-body">
                               <div id="modal-feeds-carousel" class="owl-carousel owl-theme">
                                    <?php 
                                        if(is_array($post_images)){

                                            foreach ($post_images as $images_info) {
                                                $default_image_preview = '<img src="'.base_url('assets/images/upload-video-bg.jpg').'" alt="">';
                                                $image_path = explode('.', $images_info->image_url);
                                                    
                                                $fileExtension = end($image_path);
                                                if($fileExtension == "mp4")
                                                    $default_image_preview = '<video src="'.$images_info->image_url.'" controls></video>';
                                                else
                                                    $default_image_preview = '<img src="'.$images_info->image_url.'" alt="">';
                                                echo '<div class="item">
                                                        <div class="modal-feeds-item-media">
                                                            '.$default_image_preview.'
                                                        </div>
                                                    </div>';
                                            }
                                        }
                                    ?>
                                    
                                </div>
                            </div>
                            <div class="modal-feeds-footer">
                                <div class="modal-feeds-option-info">
                                    <div class="modal-feeds-like">
                                        <a href="#">
                                            <i class="fa fa-heart" aria-hidden="true"></i>
                                            <?php echo count($post_likes);?> Likes
                                        </a>
                                    </div>
                                    <div class="modal-feeds-comment">
                                        <a href="#">
                                            <i class="las la-comments"></i>
                                            <?php echo count($post_comments);?> Comments
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="view-comment-card">
                            <div class="view-comment-header">
                                <h2>View all comments</h2>
                            </div>
                            <div class="view-comment-body">
                                <div class="view-comment-body-content">
                                    <div class="view-comment-list">
                                        <?php 
                                        
                                            if($post_comments){
                                                foreach ($post_comments as $comments_info) {
                                                    $user_pic = $comments_info->profile_pic  != "" ? $comments_info->profile_pic : base_url('assets/images/profile.png');

                                                    echo '<div class="view-comment-item">
                                                            <div class="view-comment-item-media">
                                                                <img src="'.$user_pic.'" alt="'.$comments_info->comment_by.'">
                                                            </div>
                                                            <div class="view-comment-item-value">
                                                                <h2>'.$comments_info->comment_by.'</h2>
                                                                <p>'.$comments_info->comments.'</p>
                                                                <div class="view-comment-time">
                                                                    '.time_elapsed_string($comments_info->created_date).'
                                                                </div>
                                                            </div>
                                                        </div>';
                                                }
                                            }
                                        ?>
                                        
                                    </div>
                                </div>
                                <div class="view-comment-footer">
                                    <div class="alert-error-message"></div>
                                    <div class="view-comment-group">
                                        
                                        <input type="text" name="message" placeholder="Message" class="form-control">
                                        <input type="hidden" name="post_id" value="<?php echo $post_info->post_id;?>">
                                        <span class="btn-send">
                                         <button type="button" class="btnSend post_comments_form" id="nav_down post_comments_form"> Send</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script type="text/javascript">
        $( document ).ready(function() {
            $('#modal-feeds-carousel').owlCarousel({
                loop:true,
                nav:true,
                margin:10,
                dots:false,
                autoplay:true,
                items:1,
            });
        });
    </script>