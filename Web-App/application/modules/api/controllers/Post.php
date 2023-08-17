
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Post extends BD_Controller {
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->auth();
        $this->load->model(array('api/Post_Model'));
        $this->load->library(array('common/common'));
        $this->load->helper(array('common/common'));
        //$this->user_data->id
    }

    /* Create Post */
    public function create_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        if($post_type == 'post' || $post_type == 'fitness_studio') {
            $this->form_validation->set_rules('sports_id','Category','required');
            $this->form_validation->set_rules('sub_sports_id','Sub category','required');
        }
        else {
            $this->form_validation->set_rules('title','Title','required');
            $this->form_validation->set_rules('location','Location','required');
        }
        
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            if($post_type == 'post' || $post_type == 'fitness_studio') {
                $error_message=array(                    
                    'sports_id'=>form_error('sports_id'),
                    'sub_sports_id'=>form_error('sub_sports_id'),

                );  
            }
            else {
                $error_message=array(
                    
                    'title'=>form_error('title'),
                    'location'=>form_error('location'),

                );
            }         
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{


            $post_data = $this->input->post();
            if((!isset($_FILES['media']['name']) || empty($_FILES['media']['name']))){
                $this->set_response(['status'=>false,'message'=>'Upload Media file','data'=>array('mediaFile' => 'Upload Media file')],REST_Controller::HTTP_OK);
                return;
            }
            if((!isset($post_data['description']) || empty($post_data['description'])) && (!isset($_FILES['media']['name']) || empty($_FILES['media']['name'])) ) {
                $this->set_response(['status'=>false,'message'=>'Please provide description or upload media','data'=>array('description' => 'Please provide description or upload media')],REST_Controller::HTTP_OK);
                return;
            }
            $post_detail  = array(
                'created_by' => $this->user_data->id,
                'description' => @$this->input->post('description'),                
                'status' => 1,
                'post_type' => $post_type, 
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );  
            if($post_type == 'post' || $post_type == 'fitness_studio'){
                $post_detail['sports_id'] = $this->input->post('sports_id');
                $post_detail['sub_sports_id'] = $this->input->post('sub_sports_id');
            }   
            else {
                $post_detail['title'] = $this->input->post('title');
                $post_detail['location'] = $this->input->post('location');
                if(isset($post_data['website_url']) && !empty($post_data['website_url'])){
                    $website_url = (strpos($post_data['website_url'], 'http://') > -1 || strpos($post_data['website_url'], 'https://') > -1) ? $post_data['website_url'] : "http://".$post_data['website_url'];
                    $post_detail['website_url'] = $website_url;
                }

                if(isset($post_data['link_contact_form']) && !empty($post_data['link_contact_form'])){
                    
                    $post_detail['link_contact_form'] = $post_data['link_contact_form'];
                }
                if(isset($post_data['contact_email']) && !empty($post_data['contact_email'])){
                    
                    $post_detail['contact_email'] = $post_data['contact_email'];
                }
            }  

            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
            	$post_detail['latitude'] = $post_data['latitude'];
            	$post_detail['longitude'] =  $post_data['longitude'];
            }
               
            $post_id = $this->Post_Model->save(Tables::POSTS, $post_detail);
            
            if($post_id) {

                $req_data = array(
                    'post_id' => $post_id,
                    'created_date'=>date('Y-m-d H:i:s'),
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                if ($_FILES && isset($_FILES['media']) && !empty($_FILES['media']['name'])) {
                    $this->do_upload('posts',$req_data,'media', $_FILES['media']);
                }
                                      
                $this->set_response(['status'=>true,'message'=>'Post posted successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /*Get sport center List*/

    public function sport_list_get()
    {
        
        $user_id = $this->user_data->id;
        $filter_post = $this->input->get();

        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $post_filter = array('status' => 1);
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $post_filter['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['filter_type']) && !empty($filter_post['filter_type']))
            $post_filter['filter_type'] = $filter_post['filter_type'];
        if(isset($filter_post['sports_id']) && !empty($filter_post['sports_id']))
            $post_filter['sports_id'] = $filter_post['sports_id'];
        if(isset($filter_post['sub_sports_id']) && !empty($filter_post['sub_sports_id']))
            $post_filter['sub_sports_id'] = $filter_post['sub_sports_id'];
        if(isset($filter_post['latitude']) && !empty($filter_post['latitude']))
            $post_filter['latitude'] = $filter_post['latitude'];
        if(isset($filter_post['longitude']) && !empty($filter_post['longitude']))
            $post_filter['longitude'] = $filter_post['longitude'];
        if(isset($filter_post['distance']) && !empty($filter_post['distance']))
            $post_filter['distance'] = $filter_post['distance'];
        $getAllPosts = $this->Post_Model->getAllPosts($post_filter, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->totalPostCount($post_filter);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
                if($value->shared_post_id){
                    $value->isShared = true;
                    $post_images = $this->Post_Model->getPostImages($value->shared_post_id);
                }
                else{
                    $value->isShared = false;
                    $post_images = $this->Post_Model->getPostImages($value->post_id);
                }
                
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isFavourite = true;
                else
                    $value->isFavourite = false;
                
                $value->isSave = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::MY_POST,array('post_id'=>$value->post_id, 'user_id' => $user_id,'status'=>1),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isSave = true;

                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->total_images = count($post_images);
                $value->post_comments = $post_comments;
                $value->post_likes_count = $this->thousandsCurrencyFormat(count($post_likes));
                $value->post_comments_count = count($post_comments);
                array_push($resultSet['records'], $value);


            }
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK); 

    }
    /*Get Post List*/

    public function list_get($post_type = 'post')
    {
        
        $user_id = $this->user_data->id;
        $filter_post = $this->input->get();

        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $post_filter = array('status' => 1, 'post_type' => $post_type);
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $post_filter['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['filter_type']) && !empty($filter_post['filter_type']))
            $post_filter['filter_type'] = $filter_post['filter_type'];
        if(isset($filter_post['sports_id']) && !empty($filter_post['sports_id']))
            $post_filter['sports_id'] = $filter_post['sports_id'];
        if(isset($filter_post['sub_sports_id']) && !empty($filter_post['sub_sports_id']))
            $post_filter['sub_sports_id'] = $filter_post['sub_sports_id'];
        if(isset($filter_post['latitude']) && !empty($filter_post['latitude']))
            $post_filter['latitude'] = $filter_post['latitude'];
        if(isset($filter_post['longitude']) && !empty($filter_post['longitude']))
            $post_filter['longitude'] = $filter_post['longitude'];
        if(isset($filter_post['distance']) && !empty($filter_post['distance']))
            $post_filter['distance'] = $filter_post['distance'];
        $getAllPosts = $this->Post_Model->getAllPosts($post_filter, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->totalPostCount($post_filter);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
                if($value->shared_post_id){
                    $value->isShared = true;
                    $post_images = $this->Post_Model->getPostImages($value->shared_post_id);
                }
                else{
                    $value->isShared = false;
                    $post_images = $this->Post_Model->getPostImages($value->post_id);
                }
                
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isFavourite = true;
                else
                    $value->isFavourite = false;
                
                $value->isSave = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::MY_POST,array('post_id'=>$value->post_id, 'user_id' => $user_id,'status'=>1),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isSave = true;

                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->total_images = count($post_images);
                $value->post_comments = $post_comments;
                $value->post_likes_count = $this->thousandsCurrencyFormat(count($post_likes));
                $value->post_comments_count = count($post_comments);
                array_push($resultSet['records'], $value);


            }
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK); 

    }
    public function thousandsCurrencyFormat($num) {

        if($num>1000) {
            $x = round($num);
            $x_number_format = number_format($x);
            $x_array = explode(',', $x_number_format);
            $x_parts = array('K', 'M', 'B', 'T');
            $x_count_parts = count($x_array) - 1;
            $x_display = $x;
            $x_display = $x_array[0] . ((int) $x_array[1][0] !== 0 ? '.' . $x_array[1][0] : '');
            $x_display .= $x_parts[$x_count_parts - 1];
            return $x_display;
        }
         return $num;
    }   
    public function my_feed_get($post_type = 'post', $user_id = "")
    {
        
        if($user_id == "")
            $user_id = $this->user_data->id;
        $filter_post = $this->input->get();
        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $condition = array('post_type' => $post_type, 'created_by' => $user_id);
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $condition['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['latitude']) && !empty($filter_post['latitude']))
            $post_filter['latitude'] = $filter_post['latitude'];
        if(isset($filter_post['longitude']) && !empty($filter_post['longitude']))
            $post_filter['longitude'] = $filter_post['longitude'];
        if(isset($filter_post['distance']) && !empty($filter_post['distance']))
            $post_filter['distance'] = $filter_post['distance'];
        $getAllPosts = $this->Post_Model->getAllMyPosts($condition, $offset, $per_page);
        
        $getTotalPosts = $this->Post_Model->totalMyPostCount($condition);
        //echo $this->db->last_query();
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
                if($value->shared_post_id){
                    $value->isShared = true;
                    $post_images = $this->Post_Model->getPostImages($value->shared_post_id);
                }
                else{
                    $value->isShared = false;
                    $post_images = $this->Post_Model->getPostImages($value->post_id);
                }
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $this->user_data->id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$value->post_id, 'user_id' => $this->user_data->id),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isFavourite = true;
                else
                    $value->isFavourite = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->total_images = count($post_images);
                $value->post_comments = $post_comments;
                $value->post_likes_count = count($post_likes);
                $value->post_comments_count = count($post_comments);
                array_push($resultSet['records'], $value);


            }
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK); 

    }

    public function updateitem_post($post_type = 'post')
    {
        //$this->form_validation->set_rules('description','Description','required');
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $user_id = $this->user_data->id;
        $this->form_validation->set_rules('post_id','Post id','required');
        if($post_type == 'post' || $post_type == 'fitness_studio') {
            $this->form_validation->set_rules('sports_id','Category','required');
            $this->form_validation->set_rules('sub_sports_id','Sub category','required');
        }
        else {
            $this->form_validation->set_rules('title','Title','required');
            $this->form_validation->set_rules('location','Location','required');
        }
        
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            if($post_type == 'post' || $post_type == 'fitness_studio') {
                $error_message=array(
                    'post_id' => form_error('title'),
                    'sports_id'=>form_error('sports_id'),
                    'sub_sports_id'=>form_error('sub_sports_id'),

                );  
            }
            else {
                $error_message=array(
                    'post_id'=> form_error('title'),
                    'title'=>form_error('title'),
                    'location'=>form_error('location'),

                );
            }         
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_data = $this->input->post();
            /*if((!isset($_FILES['media']['name']) || empty($_FILES['media']['name']))){
                $this->set_response(['status'=>false,'message'=>'Upload Media file','data'=>array('mediaFile' => 'Upload Media file')],REST_Controller::HTTP_OK);
                return;
            }*/
            /*if((!isset($post_data['description']) || empty($post_data['description'])) && (!isset($_FILES['media']['name']) || empty($_FILES['media']['name'])) ) {
                $this->set_response(['status'=>false,'message'=>'Please provide description or upload media','data'=>array('description' => 'Please provide description or upload media')],REST_Controller::HTTP_OK);
                return;
            }*/
            $query = $this->Post_Model->getCustomFields(Tables::POSTS,array('id'=>$this->input->post('post_id')),'*');
            if($query->num_rows() == 0 ){
                $this->set_response(['status'=>false,'message'=>'Post id does not exists', 'data' => array()],REST_Controller::HTTP_OK);
                return;
            }
            $post_info = $query->row();
            if($post_info->created_by != $user_id || !is_null($post_info->shared_post_id)) {
                $this->set_response(['status'=>false,'message'=>'You have not permission to edit this post', 'data' => array()],REST_Controller::HTTP_OK);
                return;
            }
            $post_detail  = array(
                
                'description' => @$this->input->post('description'),
                'updated_date' =>date('Y-m-d H:i:s'), 
            );  
            if($post_type == 'post' || $post_type == 'fitness_studio'){
                $post_detail['sports_id'] = $this->input->post('sports_id');
                $post_detail['sub_sports_id'] = $this->input->post('sub_sports_id');
            }   
            else {
                $post_detail['title'] = $this->input->post('title');
                $post_detail['location'] = $this->input->post('location');
                if(isset($post_data['website_url']) && !empty($post_data['website_url'])){
                    $website_url = (strpos($post_data['website_url'], 'http://') > -1 || strpos($post_data['website_url'], 'https://') > -1) ? $post_data['website_url'] : "http://".$post_data['website_url'];
                    $post_detail['website_url'] = $website_url;
                }
                if(isset($post_data['link_contact_form']) && !empty($post_data['link_contact_form'])){
                    
                    $post_detail['link_contact_form'] = $post_data['link_contact_form'];
                }
                if(isset($post_data['contact_email']) && !empty($post_data['contact_email'])){
                    
                    $post_detail['contact_email'] = $post_data['contact_email'];
                }
            }  

            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
            	$post_detail['latitude'] = $post_data['latitude'];
            	$post_detail['longitude'] =  $post_data['longitude'];
            }
               
            $post_id = $this->Post_Model->update(Tables::POSTS, array('id' => $this->input->post('post_id')), $post_detail);
            
            if($post_id) {

                $req_data = array(
                    'post_id' => $this->input->post('post_id'),
                    'created_date'=>date('Y-m-d H:i:s'),
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                if ($_FILES && isset($_FILES['media']) && !empty($_FILES['media']['name'])) {
                    $this->do_upload('posts',$req_data,'media', $_FILES['media']);
                }
                                      
                $this->set_response(['status'=>true,'message'=>'Post updated successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }


    /*Delete Post  */
    public function postitem_delete($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $post_id = (int) $this->delete('post_id');
        $user_id = $this->user_data->id;
        $error = "";
        if (!$post_id) {
            
               $error = "Post id required";
            
            $error_message=array(
                
                'post_id'=>"Post id required"

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            
            $query = $this->Post_Model->getCustomFields(Tables::POSTS,array('id'=>$post_id),'id, created_by');
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                if($post_details->created_by == $user_id) {
                    $this->db->trans_begin();
                    $this->Post_Model->delete_by_condition(Tables::POST_COMMENTS, array('post_id' => $post_id));
                    $this->Post_Model->delete_by_condition(Tables::COACHING_ACADEMY_ENQUIRY, array('post_id' => $post_id));
                    $this->Post_Model->delete_by_condition(Tables::POST_LIKE, array('post_id' => $post_id));
                    $this->Post_Model->delete_by_condition(Tables::POST_FAVOURITE, array('post_id' => $post_id));
                    $this->Post_Model->delete_by_condition(Tables::POSTS, array('shared_post_id' => $post_id));
                    $image_query = $this->Post_Model->getCustomFields(Tables::POST_IMAGES,array('post_id'=>$post_id),'id,name');
                    if ($image_query->num_rows()>0) {
                        foreach ($image_query->result() as $image) {
                            $image_file_path = 'uploads/posts/'.$image->name;
                            //echo $file_path ;
                            if (file_exists($image_file_path)) {
                               unlink($image_file_path);
                            }
                            $this->Post_Model->delete_by_condition(Tables::POST_IMAGES,array('id'=>$image->id));
                        }
                    }
                    $this->Post_Model->delete_by_condition(Tables::POSTS, array('id' => $post_id));
                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                        $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.', 'data' => array()],REST_Controller::HTTP_OK);
                    
                    }
                    else{
                        $this->db->trans_commit();
                        $this->set_response(['status'=>true,'message'=>'Post successfully deleted', 'data' => array()],REST_Controller::HTTP_OK);
                    }
                }
                else{
                    $this->set_response(['status'=>false,'message'=>'You have not permission to delete this post', 'data' => array()],REST_Controller::HTTP_OK);
                }
            }
            else{
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.', 'data' => array()],REST_Controller::HTTP_OK);
            }
            
             
        }
    }

    /* Like Post */
    public function like_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                
                'post_id'=>form_error('post_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Post id required','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            /*Check already like*/
            $query = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$post_id, 'user_id' => $this->user_data->id),'id');
            if($query->num_rows() > 0){
                $this->response(['status'=>false,'message'=>'You have already liked this post', 'data' => array('already_like' => 'You have already liked this post')], REST_Controller::HTTP_OK);
                return;
            }

            $post_detail  = array(
                'user_id' => $this->user_data->id,
                'post_id' => $post_id,
                'isLike' => 1, 
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );         
               
            $req_id = $this->Post_Model->save(Tables::POST_LIKE, $post_detail);
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post like successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /* Unlike Post */
    public function unlike_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                
                'post_id'=>form_error('post_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Post id required','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            /*Check already like*/
            $query = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$post_id, 'user_id' => $this->user_data->id),'id');
            if($query->num_rows() == 0){
                $this->response(['status'=>false,'message'=>'You have not liked this post before', 'data' => array('already_unlike' => 'You have not liked this post before')], REST_Controller::HTTP_OK);
                return;
            }

            /*Delete Like records*/
            $req_id = $this->Post_Model->delete_by_condition(Tables::POST_LIKE,array('user_id'=>$this->user_data->id, 'post_id' => $post_id));
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post unlike successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }


    /* Comment on Post */
    public function comment_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_rules('comments','Comments','required');
        $this->form_validation->set_error_delimiters('','');
        $error = "";
        if ($this->form_validation->run()==false) {
            if (form_error('post_id')) 
               $error = form_error('post_id');
            else if(form_error('comments'))
                $error = form_error('comments');
            
            $error_message=array(
                
                'post_id'=>form_error('post_id'),
                'comments'=>form_error('comments'),

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');

            $comment_detail  = array(
                'user_id' => $this->user_data->id,
                'post_id' => $post_id,
                'comments' => $this->input->post('comments'),
                'status' => 1, 
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );         
               
            $req_id = $this->Post_Model->save(Tables::POST_COMMENTS, $comment_detail);
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post comment successfully', 'data' => array('comment_id' => $req_id)],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /*Delete Comment  */
    public function comment_delete($post_type = 'post')
    {
        
        $comment_id = $this->delete('comment_id');
        $user_id = $this->user_data->id;
        $error = "";
        if (!$comment_id) {
            
               $error = "Comments id required";
            
            $error_message=array(
                
                'comment_id'=>"Comments id required"

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            
            $get_comment_info = $this->Post_Model->getCommentDetails($comment_id);
            if($get_comment_info->num_rows() > 0 ) {
                $comment_detials = $get_comment_info->row();
                if($comment_detials->user_id == $user_id || $comment_detials->created_by == $user_id){
                    $req_id = $this->Post_Model->delete_by_condition(Tables::POST_COMMENTS,array('id' => $comment_id));
            
                    if($req_id)     
                        $this->set_response(['status'=>true,'message'=>'Comment deleted successfully'],REST_Controller::HTTP_OK);   
                        
                    else
                        $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
                    
                }
                else
                    $this->set_response(['status'=>false,'message'=>"You have not permission to delete this comment",'data'=>array('comment_id' => 'You have not permission to delete this comment')],REST_Controller::HTTP_OK);
            }
            else {
                $this->set_response(['status'=>false,'message'=>"Comment id does not exists",'data'=>array('comment_id' => 'Comment id does not exists')],REST_Controller::HTTP_OK);
            }

            
            
             
        }
    }

    /* Favourite Post */
    public function favourite_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                
                'post_id'=>form_error('post_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Post id required','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            /*Check already like*/
            $query = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$post_id, 'user_id' => $this->user_data->id),'id');
            if($query->num_rows() > 0){
                $this->response(['status'=>false,'message'=>'You have already favourite this post', 'data' => array('already_like' => 'You have already favourite this post')], REST_Controller::HTTP_OK);
                return;
            }

            $post_detail  = array(
                'user_id' => $this->user_data->id,
                'post_id' => $post_id,
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );         
               
            $req_id = $this->Post_Model->save(Tables::POST_FAVOURITE, $post_detail);
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post make favourite successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /* Unfavourite Post */
    public function unfavourite_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                
                'post_id'=>form_error('post_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Post id required','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            /*Check already like*/
            $query = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$post_id, 'user_id' => $this->user_data->id),'id');
            if($query->num_rows() == 0){
                $this->response(['status'=>false,'message'=>'You have not favourite this post before', 'data' => array('already_unlike' => 'You have not favourite this post before')], REST_Controller::HTTP_OK);
                return;
            }

            /*Delete Like records*/
            $req_id = $this->Post_Model->delete_by_condition(Tables::POST_FAVOURITE,array('user_id'=>$this->user_data->id, 'post_id' => $post_id));
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post make unfavourite successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }


    public function favourite_get($post_type = 'post')
    {
        $user_id = $this->user_data->id;
        $per_page = 20;
        $page_no = 1;
        $filter_post = $this->input->get();
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $condition = array('post_type' => $post_type, 'user_id' => $user_id);
        $getAllPosts = $this->Post_Model->getUserFavourite($condition, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->getUserFavouriteTotal($condition);
        //$result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $getTotalPosts, 'totalPages' => ceil($getTotalPosts/$per_page), 'records' => array());
        
       
            foreach ($getAllPosts as $value) {
                if($value->shared_post_id){
                    $value->isShared = true;
                    $post_images = $this->Post_Model->getPostImages($value->shared_post_id);
                }
                else{
                    $value->isShared = false;
                    $post_images = $this->Post_Model->getPostImages($value->post_id);
                }
                //$post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isFavourite = true;
                
                
                
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->total_images = count($post_images);
                $value->post_comments = $post_comments;
                $value->post_likes_count = count($post_likes);
                $value->post_comments_count = count($post_comments);
                array_push($resultSet['records'], $value);
            }
        
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK);
        
            
    }

    /* Shared Post */
    public function shared_post($post_type = 'post')
    {
        
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                
                'post_id'=>form_error('post_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Post id required','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            /*Check already like*/
            $query = $this->Post_Model->getCustomFields(Tables::POSTS,array('id'=>$post_id),'*');
            if($query->num_rows() == 0){
                $this->response(['status'=>false,'message'=>'Post does not exists', 'data' => array('post_exists' => 'Post does not exists')], REST_Controller::HTTP_OK);
                return;
            }
            
            $post_info = $query->row();
            $post_detail  = array(
                'created_by' => $this->user_data->id,
                
                'description' => @$this->input->post('description'),
                'title' => $post_info->description,
                'sports_id' => $post_info->sports_id,
                'sub_sports_id' => $post_info->sub_sports_id,
                'website_url' => $post_info->website_url,
                'link_contact_form' => $post_info->link_contact_form,
                'contact_email' => $post_info->contact_email,
                'location' => $post_info->location,
                'post_type' => $post_info->post_type,
                'shared_post_id' => $post_info->id,
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );         
               
            $req_id = $this->Post_Model->save(Tables::POSTS, $post_detail);
            
            if($req_id) {          
                $this->set_response(['status'=>true,'message'=>'Post shared successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /*Link Contact Form*/
    public function link_contact_form_post(){
        $this->load->helper('phpmailer');
        $check_suspend_account = $this->Post_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('post_id','Post Id','required');
        $this->form_validation->set_rules('first_name','First name','required');
        $this->form_validation->set_rules('email','Email','required');
        $this->form_validation->set_rules('contact_no','Contact no','required');
        $this->form_validation->set_rules('message','Message','required');
        $this->form_validation->set_error_delimiters('','');
        $error = "";
        if ($this->form_validation->run()==false) {
            if (form_error('post_id')) 
               $error = form_error('post_id');
            else if(form_error('message'))
                $error = form_error('message');
            else if (form_error('first_name')) 
               $error = form_error('first_name');
            else if(form_error('email'))
                $error = form_error('email');
            else if(form_error('contact_no'))
                $error = form_error('contact_no');
            
            $error_message=array(
                
                'post_id'=>form_error('post_id'),
                'message'=>form_error('message'),
                'first_name'=>form_error('first_name'),
                'email'=>form_error('email'),
                'contact_no'=>form_error('contact_no'),

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_id = $this->input->post('post_id');
            $post_data = $this->input->post();
            $post_detail = $this->Post_Model->get_post_detail($post_id);

            if($post_detail->num_rows() > 0 ) {
                $post_info = $post_detail->row();
                $this->Post_Model->save(Tables::COACHING_ACADEMY_ENQUIRY, array(
                    'post_id' => $post_id,
                    'user_id' => $this->user_data->id,
                    'first_name' => @$post_data['first_name'],
                    'last_name' => @$post_data['last_name'],
                    'email'     => @$post_data['email'],
                    'contact_no' => @$post_data['contact_no'],
                    'message' => @$post_data['message']

                ));
                $contentHtml = "<p>Hi, ".$post_info->user_first_name." ".@$post_info->user_last_name."</p>";
                $contentHtml .= '<p>You have received an equiry request. Details are following:</p>';
                $contentHtml .= '<p>Name: '.@$post_data['first_name'].' '.@$post_data['last_name'].'</p>';
                $contentHtml .= '<p>Email: '.@$post_data['email'].'</p>'; 
                $contentHtml .= '<p>Contact No: '.@$post_data['contact_no'].'</p>';
                $contentHtml .= '<p>Message: '.@$post_data['message'].'</p>';       
                $contentHtml .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";
                $from = array(DEFAULT_EMAIL_FROM, DEFAULT_SITE_TITLE);

                
                if(isset($post_info->contact_email) && !empty($post_info->contact_email))
                	@phpmail_send(DEFAULT_EMAIL_FROM, $post_info->contact_email, "Enquiry - ".$post_info->title, $contentHtml);
                
                //$this->sendEmail("mohdarshad3@gmail.com", "Enquiry - ".$post_info->title, $contentHtml);
                $this->set_response(['status'=>true,'message'=>'Thank you for contacting us.', 'data' => array()],REST_Controller::HTTP_OK);
            }
            else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Invalid post id.'));
            }
             
        }
    
    }

    /* upload image of post */
    public function do_upload($folder_name,$req_data,$index, $files){ 
       
        if (!is_dir('uploads/'.$folder_name)) {
            mkdir('./uploads/'.$folder_name, 0777, TRUE);
        }
        $config['upload_path']   = './uploads/'.$folder_name; 
        $config['allowed_types'] = 'jpg|png|gif|jpeg|mp4'; 
        $config['max_size']      = 1024000; 
        $this->load->library('upload', $config);
        
        if(is_array($files['name'])){


            foreach ($files['name'] as $key => $image) {   
                $_FILES['uploadFile']['name']= $files['name'][$key];
                $_FILES['uploadFile']['type']= $files['type'][$key];
                $_FILES['uploadFile']['tmp_name']= $files['tmp_name'][$key];
                $_FILES['uploadFile']['error']= $files['error'][$key];
                $_FILES['uploadFile']['size']= $files['size'][$key];
                $new_name = time().$_FILES['uploadFile']['name'];
                $config['file_name'] = $new_name;       
                
                $this->upload->initialize($config);
                    
                 if ( ! $this->upload->do_upload('uploadFile')) {
                    $error = array('error' => $this->upload->display_errors()); 
                    //echo $this->upload->display_errors();
                    return false;
                    
                 }else { 
                    $file_array = $this->upload->data();
                    if($_FILES['uploadFile']['type'] == "video/mp4"){
                        $file_name_without_extension = explode(".", $file_array['file_name']);
                        array_pop($file_name_without_extension);
                        
                        $thumbnail_image_name = implode('.', $file_name_without_extension).".jpeg";
                        $thumbnail_image = $config['upload_path']."/".$thumbnail_image_name;
                        $source_file = $config['upload_path']."/".$file_array['file_name'];
                        $genrate_thumb_image = generate_video_thumbnail($source_file, $thumbnail_image);
                        if($genrate_thumb_image)
                            $req_data['thumbnail_image']  = $thumbnail_image_name;
                        $compress_video_name = strtotime(date('YmdHis')).$file_array['file_name'];
                        $compress_video_path = $config['upload_path']."/".$compress_video_name;
                        $compress_video = compress_video_file($source_file, $compress_video_path);
                        $req_data['name']  = $compress_video_name; 
                    }
                    else
                        $req_data['name']  = $file_array['file_name'];       
                    $this->Post_Model->save(Tables::POST_IMAGES,$req_data); 
                    
                 } 
            }
        }
        else{
           $_FILES['uploadFile']['name']= $files['name'];
            $_FILES['uploadFile']['type']= $files['type'];
            $_FILES['uploadFile']['tmp_name']= $files['tmp_name'];
            $_FILES['uploadFile']['error']= $files['error'];
            $_FILES['uploadFile']['size']= $files['size'];
            $new_name = time().$_FILES['uploadFile']['name'];
            $config['file_name'] = $new_name;       
            
            $this->upload->initialize($config);
                
             if ( ! $this->upload->do_upload('uploadFile')) {
              
                $error = array('error' => $this->upload->display_errors()); 
                 //echo $this->upload->display_errors();
                 //exit;
                return false;
                
             }else { 
                $file_array = $this->upload->data();
                if($_FILES['uploadFile']['type'] == "video/mp4"){
                    $file_name_without_extension = explode(".", $file_array['file_name']);
                    array_pop($file_name_without_extension);
                    
                    $thumbnail_image_name = implode('.', $file_name_without_extension).".jpeg";
                    $thumbnail_image = $config['upload_path']."/".$thumbnail_image_name;
                    $source_file = $config['upload_path']."/".$file_array['file_name'];
                    $genrate_thumb_image = generate_video_thumbnail($source_file, $thumbnail_image);
                    if($genrate_thumb_image)
                        $req_data['thumbnail_image']  = $thumbnail_image_name;
                    $compress_video_name = strtotime(date('YmdHis')).$file_array['file_name'];
                    $compress_video_path = $config['upload_path']."/".$compress_video_name;
                    $compress_video = compress_video_file($source_file, $compress_video_path);
                    $req_data['name']  = $compress_video_name; 
                }
                else
                    $req_data['name']  =$file_array['file_name'];       
                $this->Post_Model->save(Tables::POST_IMAGES,$req_data); 
                
             } 
        }
        return true;
    }

    public function save_my_post_post($value='')
    {
        $arr = array(
            'user_id'=>$this->user_data->id,
            'post_id'=>$this->input->post('post_id'),
            
        );
        if ($this->input->post('status')==2) {
            $arr['updated_date']=date('Y-m-d H:i:s');
            $arr['status']=2;
            $id = $this->Post_Model->update(Tables::MY_POST,array('post_id'=>$this->input->post('post_id')),$arr);
            if ($id) {
                $this->set_response(['status'=>true,'message'=>'Unsaved successfully',],REST_Controller::HTTP_OK);
            }else{
                $this->set_response(['status'=>false,'message'=>'Plase try after some time',],REST_Controller::HTTP_OK);
            }
        }else{
            $arr['updated_date']=date('Y-m-d H:i:s');
            $arr['created_date']=date('Y-m-d H:i:s');
            $arr['status']=1;
            $id = $this->Post_Model->save(Tables::MY_POST,$arr);

            if ($id) {
                $this->set_response(['status'=>true,'message'=>'Saved successfully',],REST_Controller::HTTP_OK);
            }else{
                $this->set_response(['status'=>false,'message'=>'Plase try after some time',],REST_Controller::HTTP_OK);
            }
        }
    }

    /* Favourite Post */
   public function get_my_post_list_get($post_type = 'post')
    {
        $user_id = $this->user_data->id;
        $per_page = 20;
        $page_no = 1;
        $filter_post = $this->input->get();
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $condition = array('post_type' => $post_type, 'user_id' => $user_id);
        $getAllPosts = $this->Post_Model->getUserFavourite1($condition, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->getUserFavouriteTotal1($condition);
        //$result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $getTotalPosts, 'totalPages' => ceil($getTotalPosts/$per_page), 'records' => array());
        
       
            foreach ($getAllPosts as $value) {
                if($value->shared_post_id){
                    $value->isShared = true;
                    $post_images = $this->Post_Model->getPostImages($value->shared_post_id);
                }
                else{
                    $value->isShared = false;
                    $post_images = $this->Post_Model->getPostImages($value->post_id);
                }
                //$post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $favourite_by_user = $this->Post_Model->getCustomFields(Tables::POST_FAVOURITE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($favourite_by_user->num_rows() > 0)
                    $value->isFavourite = true;
                else
                    $value->isFavourite = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->total_images = count($post_images);
                $value->post_comments = $post_comments;
                $value->post_likes_count = count($post_likes);
                $value->post_comments_count = count($post_comments);
                array_push($resultSet['records'], $value);
            }
        
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK);
        
            
    }

    public function unsave_from_my_post_post()
    {
        $post_data = $this->input->post();
        if (isset($post_data['my_post_id']) && !empty($post_data['my_post_id'])) {
           $affected = $this->Post_Model->delete_by_condition(Tables::MY_POST,array('id'=>$post_data['my_post_id']));
           if ($affected) {
                $this->set_response(['status'=>true,'message'=>'Removed from your list successfully'],REST_Controller::HTTP_OK);
           }else{
                $this->set_response(['status'=>false,'message'=>'Error occurred, Please try after some time'],REST_Controller::HTTP_OK);
           }
        }else{
            $this->set_response(['status'=>false,'message'=>'Invalid parameter'],REST_Controller::HTTP_OK);
        }
    }

    /* book appintment */
    public function book_appointment_post($value='')
    {
        $arr = array(
            'post_id'=>$this->input->post('post_id'),
            'user_id'=>$this->user_data->id,
            'first_name'=>$this->input->post('first_name'),
            'last_name'=>$this->input->post('last_name'),
            'phone_number'=>$this->input->post('phone_number'),
            'email'=>$this->input->post('email'),
            'date'=>date('Y-m-d',strtotime($this->input->post('date'))),
            'time'=>date('H:i:s',strtotime($this->input->post('time'))),
            'message'=>$this->input->post('message'),
            'created_date'=>date('Y-m-d H:i:s'),
        );
        $id = $this->Post_Model->save(Tables::BOOK_APPOINTMENT,$arr);
        if ($id) {
            $this->set_response(['status'=>true,'message'=>'Appointment has been booked successfully'],REST_Controller::HTTP_OK);
        }else{
            $this->set_response(['status'=>false,'message'=>'Error occurred, Please try after some time'],REST_Controller::HTTP_OK);
        }
    }

    

}
