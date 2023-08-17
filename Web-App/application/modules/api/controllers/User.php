
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User extends BD_Controller {
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->auth();
        $this->load->model(array('api/User_model'));
        $this->load->library(array('common/common'));
    }

    /*Get User Account Status*/
    public function account_status_get(){
        $user_id = $this->user_data->id;
        $user_query = $this->User_model->getCustomFields(Tables::USER,array('id'=>$user_id),'id, first_name, last_name, email, contact_no, user_group, (CASE WHEN user_group = "1" THEN "Admin" WHEN user_group = "2" THEN "Fan / User" WHEN user_group = "3" THEN "Coach / Trainer" WHEN user_group = "4" THEN "Scout / Club" WHEN user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, status');
        if($user_query->num_rows() > 0 ){
            
            $this->response(array("status" => true, 'message'=>'',"data" => $user_query->row()),REST_Controller::HTTP_OK);
        }
        else
           $this->response(array("status" => false, 'message'=>'User info not found',"data" => new stdClass()),REST_Controller::HTTP_OK); 
    }
    /*Get User Profile*/
    public function profile_get(){
        $user_id = $this->user_data->id;
        $user_query = $this->User_model->get_profile($user_id);
        if($user_query->num_rows() > 0 ){
            $user_info = $user_query->row();
            $user_info->total_posts = 0;
            $user_info->total_follower = 0;
            $user_info->total_following = 0; 
            $user_stat_query = $this->User_model->countStatsData($user_id);
            if($user_stat_query->num_rows() > 0){
                $statData = $user_stat_query->row();
                $user_info->total_posts = $statData->totalPost;
                $user_info->total_follower = $statData->totalFollower;
                $user_info->total_following = $statData->totalFollowing;
            }
            $this->response(array("status" => true, 'message'=>'',"data" => $user_info),REST_Controller::HTTP_OK);
        }
        else
           $this->response(array("status" => false, 'message'=>'User info not found',"data" => new stdClass()),REST_Controller::HTTP_OK); 
    }
    /*Get Public profile*/
    public function publicprofile_get($user_id){
        //$user_id = $this->user_data->id;
        $user_query = $this->User_model->get_profile($user_id);
        if($user_query->num_rows() > 0 ){
            $check_user_follow = $this->User_model->getCustomFields(Tables::USER_FOLLOWER,array('follower_id'=>$user_id, 'following_id' => $this->user_data->id),'id');
            $user_info = $user_query->row();
            $user_info->total_posts = 0;
            $user_info->isFollow = false;
            if($check_user_follow->num_rows() > 0)
              $user_info->isFollow = true;
            $user_info->total_follower = 0;
            $user_info->total_following = 0; 
            $user_stat_query = $this->User_model->countStatsData($user_id);
            if($user_stat_query->num_rows() > 0){
                $statData = $user_stat_query->row();
                $user_info->total_posts = $statData->totalPost;
                $user_info->total_follower = $statData->totalFollower;
                $user_info->total_following = $statData->totalFollowing;
            }
            $this->response(array("status" => true, 'message'=>'',"data" => $user_info),REST_Controller::HTTP_OK);
        }
        else
           $this->response(array("status" => false, 'message'=>'User info not found',"data" => new stdClass()),REST_Controller::HTTP_OK); 
    }
    /* follow user */
    public function follow_post()
    {
        $this->form_validation->set_rules('user_id','User id','required');

        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                'user_id'=>form_error('user_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $follower_id = $this->input->post('user_id');
            $user_id = $this->user_data->id; 
            $follow_query = $this->User_model->getCustomFields(Tables::USER_FOLLOWER,array('follower_id'=>$follower_id, 'following_id' => $user_id),'id');
            if($follow_query->num_rows() == 0) {
                $follow_id = $this->User_model->save(Tables::USER_FOLLOWER, array('follower_id'=>$follower_id, 'following_id' => $user_id, 'created_date' => date('Y-m-d H:i:s')));
                if ($follow_id) {
                    $query = $this->User_model->get_following_token($follow_id);
                    $row = $query->row();
                    $load['title']  = SITE_TITLE;
                    $load['msg']    = $row->following_name.' has started following you';
                    $load['action'] = 'PENDING';
                    $load['follow_id'] = $follow_id;
                   
                    $token = $row->follower_fcm_token;                        
                    $this->common->android_push($token, $load);
                }
                $this->set_response(['status'=>true,'message'=>'Follow successfully'],REST_Controller::HTTP_OK); 
            }
            else
                $this->response(array("status" => false, 'message'=>'You are already following this user'));
            
             
        }
    }
    /* get notifiction */
    public function bell_notification_get()
    {        
        $query = $this->User_model->get_bell_notification($this->user_data->id);  
        $query1 = $this->User_model->get_user_notification($this->user_data->id);        
        
        $resultSet=array('total_message'=>'','records' => array()); 
        if ($query1->num_rows()) { 
            $row = $query1->row();
            $row->flag = 1;// seen user notification        
            array_push($resultSet['records'], $row); 
            //$this->set_response(['status'=>true,'message'=>'','data'=>$resultSet],REST_Controller::HTTP_OK);     
         }    
        if ($query->num_rows()) {
            $resultSet['total_message'] = $query->num_rows();
            foreach ($query->result() as $value) {
                $value->flag = 2; //seen user follow notification
               array_push($resultSet['records'], $value);
            }             
             
        }
        if (($query1->num_rows()==0) && ($query->num_rows()==0)) {
           $this->response(array("status" => false, 'message'=>'No notification','data'=>$resultSet));
        }
       else{
           $this->set_response(['status'=>true,'message'=>'','data'=>$resultSet],REST_Controller::HTTP_OK); 
        }
        
    }

    /* see the notification */
    public function see_notification_post()
    {
        $this->User_model->update(Tables::USER_FOLLOWER,array('id'=>$this->input->post('id')),array('isseen'=>1));
        //echo $this->db->last_query();
        $this->set_response(['status'=>true,'message'=>''],REST_Controller::HTTP_OK);
    }

    /* see the notification */
    public function see_user_notification_post()
    {
        $this->User_model->update(Tables::USER,array('id'=>$this->user_data->id),array('isseen'=>1));
        $this->set_response(['status'=>true,'message'=>''],REST_Controller::HTTP_OK);
    }

    /* clear notification */
    public function clear_notification_post()
    {
         $this->User_model->update(Tables::USER,array('id'=>$this->user_data->id),array('isseen'=>1));
          $this->User_model->update(Tables::USER_FOLLOWER,array('follower_id'=>$this->user_data->id),array('isseen'=>1));
        
          $this->set_response(['status'=>true,'message'=>''],REST_Controller::HTTP_OK);
    }

    /* send push notification of chat */
    public function chat_pushnotification_post()
    {
        $to = $this->input->post('user_id');
        $message = $this->input->post('message');
        $from = $this->user_data->id;

        $query = $this->User_model->getCustomFields(Tables::USER,array('id'=>$from),'id,CONCAT(first_name," ",IFNULL(last_name,"")) as name');
        //echo $this->db->last_query();
        $query1 = $this->User_model->getCustomFields(Tables::USER,array('id'=>$to),'id,CONCAT(first_name," ",IFNULL(last_name,"")) as name,fcm_token');
        //echo $this->db->last_query();
        $row = $query->row();
        $load=array();
        $load['title']  = SITE_TITLE;
        $load['msg']    = $row->name.' has messaged you';
        $load['message']    =  $message;
        $load['action'] = 'PENDING';
        $load['user_id'] = $to; 
        $token = $query1->row()->fcm_token;                             
        $this->common->android_push($token, $load);
        $this->set_response(['status'=>true,'message'=>''],REST_Controller::HTTP_OK);
    }


    /* Unfollow user */
    public function unfollow_post()
    {
        $this->form_validation->set_rules('user_id','User id','required');

        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(
                'user_id'=>form_error('user_id'),

            );           
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $follower_id = $this->input->post('user_id');
            $user_id = $this->user_data->id; 
            $follow_query = $this->User_model->getCustomFields(Tables::USER_FOLLOWER,array('follower_id'=>$follower_id, 'following_id' => $user_id),'id');
            if($follow_query->num_rows() > 0) {
                $this->User_model->delete_by_condition(Tables::USER_FOLLOWER, array('follower_id'=>$follower_id, 'following_id' => $user_id));
                $this->set_response(['status'=>true,'message'=>'Unfollow successfully'],REST_Controller::HTTP_OK); 
            }
            else
                $this->response(array("status" => false, 'message'=>'You are not following this user'));
            
             
        }
    }

    /* follow user list */
    public function follow_get($user_id = "")
    {
        $session_user_id = $this->user_data->id;
        $filter_post = $this->input->get();
        if($user_id == "")
            $user_id = $this->user_data->id;
        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $follow_query = $this->User_model->getAllFollower($user_id, $session_user_id, $offset, $per_page);
        $getTotalFollowing = $this->User_model->totalFollowerCount($user_id);
        $result = $getTotalFollowing->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        if($follow_query->num_rows() > 0 )
            $resultSet['records'] = $follow_query->result();
        $this->response(array("status" => true, 'message'=>'',"data" => $resultSet),REST_Controller::HTTP_OK);
    }

    /* following user list */
    public function following_get($user_id = "")
    {
        $session_user_id = $this->user_data->id;
        $filter_post = $this->input->get();
        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        if($user_id == "")
            $user_id = $this->user_data->id;

        $follow_query = $this->User_model->getAllFollowing($user_id, $session_user_id, $offset, $per_page);
        $getTotalFollowing = $this->User_model->totalFollowingCount($user_id);
        $result = $getTotalFollowing->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        if($follow_query->num_rows() > 0 )
            $resultSet['records'] = $follow_query->result();
        $this->response(array("status" => true, 'message'=>'',"data" => $resultSet),REST_Controller::HTTP_OK);

    }

    public function update_profile_post()
    {
        
        $this->form_validation->set_rules('first_name','First Name','required');
        /*$this->form_validation->set_rules('contact_no','Contact No','required|numeric|min_length[10]|max_length[15]');*/
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            if (form_error('first_name')) {
               $error = form_error('first_name');
            }else if (form_error('contact_no')) {
                $error = form_error('email');                
            }
            $error_message=array(
                'first_name'=>form_error('first_name'),               
                'contact_no'=>form_error('contact_no')
            );
           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            
            $post_data = $this->input->post();
            $this->db->trans_begin();
            $user_detail = array(
                'first_name' => ucwords($this->input->post('first_name'),' '),
                'updated_date' => date('Y-m-d H:i:s') ,

                 );
            if(isset($post_data['last_name']) && !empty($post_data['last_name']))
               $user_detail['last_name'] = $post_data['last_name'];

            if(isset($post_data['fcm_token']) && !empty($post_data['fcm_token']))
               $user_detail['fcm_token'] = $post_data['fcm_token'];

            if(isset($post_data['contact_no']) && !empty($post_data['contact_no']))
               $user_detail['contact_no'] = $post_data['contact_no']; 

            if(isset($post_data['sports']) && !empty($post_data['sports']))
               $user_detail['sports_id'] = $post_data['sports'];

            if(isset($post_data['scouting_sports']) && !empty($post_data['scouting_sports']))
               $user_detail['scouting_sports_id'] = $post_data['scouting_sports'];

            if(isset($post_data['is_freelance']) && !empty($post_data['is_freelance']))
               $user_detail['is_freelance'] = $post_data['is_freelance'];
            else
                $user_detail['is_freelance'] = 0;

            if(isset($post_data['parent_first_name']) && !empty($post_data['parent_first_name']))
               $user_detail['parent_first_name'] = $post_data['parent_first_name'];

            if(isset($post_data['parent_last_name']) && !empty($post_data['parent_last_name']))
               $user_detail['parent_last_name'] = $post_data['parent_last_name'];

            if(isset($post_data['parent_email']) && !empty($post_data['parent_email']))
               $user_detail['parent_email'] = $post_data['parent_email'];

            if(isset($post_data['parent_contact_no']) && !empty($post_data['parent_contact_no']))
               $user_detail['parent_contact_no'] = $post_data['parent_contact_no']; 

            if(isset($post_data['dob']) && !empty($post_data['dob']))
               $user_detail['dob'] = date('Y-m-d', strtotime($post_data['dob'])); 

            if(isset($post_data['gender']) && !empty($post_data['gender']))
               $user_detail['gender'] = $post_data['gender'];  

            if(isset($post_data['address']) && !empty($post_data['address']))
               $user_detail['address'] = $post_data['address'];  

            if(isset($post_data['city']) && !empty($post_data['city']))
               $user_detail['city'] = $post_data['city'];  

            if(isset($post_data['zip_code']) && !empty($post_data['zip_code']))
               $user_detail['zip_code'] = $post_data['zip_code']; 

            if(isset($post_data['country']) && !empty($post_data['country']))
               $user_detail['country'] = $post_data['country']; 

            if(isset($post_data['nationality']) && !empty($post_data['nationality']))
               $user_detail['nationality'] = $post_data['nationality'];  

            if(isset($post_data['current_club']) && !empty($post_data['current_club']))
               $user_detail['current_club'] = $post_data['current_club'];

            if(isset($post_data['favourite_club']) && !empty($post_data['favourite_club']))
               $user_detail['favourite_club'] = $post_data['favourite_club'];

            if(isset($post_data['preferred_foot']) && !empty($post_data['preferred_foot']))
               $user_detail['preferred_foot'] = $post_data['preferred_foot'];

            if(isset($post_data['height']) && !empty($post_data['height']))
               $user_detail['height'] = $post_data['height'];

            if(isset($post_data['profession']) && !empty($post_data['profession']))
               $user_detail['profession'] = $post_data['profession']; 
            
            $user_id =$this->User_model->update(Tables::USER, array('id' => $this->user_data->id) ,$user_detail);           
            if ($user_id) {
                $update_data = array();

                /*Upload Profile Pic*/
                if (isset($_FILES['profile_pic']) && !empty($_FILES['profile_pic'])) {
                    $response_data = $this->do_upload('profile','profile_pic', $this->user_data->id);
                    if($response_data['valid'])
                        $update_data['profile_pic'] = $response_data['data'];
                }

                /*Upload Professional Certificate*/
                if (isset($_FILES['professional_certificate']) && !empty($_FILES['professional_certificate'])) {
                    $response_data = $this->do_upload('documents','professional_certificate', $this->user_data->id);
                    if($response_data['valid'])
                        $update_data['professional_certificate'] = $response_data['data'];
                }

                /*Upload letter of employment*/
                if (isset($_FILES['letter_of_employment']) && !empty($_FILES['letter_of_employment'])) {
                    $response_data = $this->do_upload('documents','letter_of_employment', $this->user_data->id);
                    if($response_data['valid'])
                        $update_data['letter_of_employment'] = $response_data['data'];
                }

                /*Upload id card*/
                if (isset($_FILES['id_card']) && !empty($_FILES['id_card'])) {
                    $response_data = $this->do_upload('documents','id_card', $this->user_data->id);
                    if($response_data['valid'])
                        $update_data['id_card'] = $response_data['data'];
                }  

                if(count($update_data) > 0 )
                    $affected = $this->User_model->update(Tables::USER,array('id'=>$this->user_data->id), $update_data);
                 
            }
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.'],REST_Controller::HTTP_OK);
            
            }else{
                $this->db->trans_commit();
                $res = $this->User_model->getCustomFields(Tables::USER,array('id'=>$this->user_data->id),'id, first_name, last_name, email, contact_no, user_group, (CASE WHEN user_group = "1" THEN "Admin" WHEN user_group = "2" THEN "Fan / User" WHEN user_group = "3" THEN "Coach / Trainer" WHEN user_group = "4" THEN "Scout / Club" WHEN user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, dob, gender, address, city, zip_code, country, nationality, status, parent_first_name, parent_last_name, parent_email, parent_contact_no, current_club, favourite_club, preferred_foot, height, profession, CASE WHEN profile_pic IS NOT NULL AND profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", id, "/", profile_pic) ELSE "" END as profile_pic, CASE WHEN professional_certificate IS NOT NULL AND professional_certificate != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", professional_certificate) ELSE "" END as professional_certificate, CASE WHEN letter_of_employment IS NOT NULL AND letter_of_employment != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", letter_of_employment) ELSE "" END as letter_of_employment , CASE WHEN id_card IS NOT NULL AND id_card != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", id_card) ELSE "" END as id_card');

                $row = $res->row();
                
                
                $output['status']   = true; 
                $output['message']  = 'Profile updated successfully'; 
                $output['data']     = $row;
                $this->set_response($output, REST_Controller::HTTP_OK);
               /*----------------------------------*/               
            }
        }
    }

    /*Get User List*/
    public function list_get(){
        $user_id = $this->user_data->id;
        $condition = "user_group != '1' AND id !=".$user_id;
        $get_data = $this->input->get();
        if(isset($get_data['keyword']) && !empty($get_data['keyword']))
            $condition.=" AND (concat(first_name, ' ', last_name)  like '%".$get_data['keyword']."%' OR email like '%".$get_data['keyword']."%')";
        $user_query = $this->User_model->get_user_list($condition);
        if($user_query->num_rows() > 0 ){
            $user_info = $user_query->result();
            
            $this->response(array("status" => true, 'message'=>'',"data" => $user_info),REST_Controller::HTTP_OK);
        }
        else
           $this->response(array("status" => false, 'message'=>'User info not found',"data" => array()),REST_Controller::HTTP_OK); 
    }

    public function do_upload($folder_name,$index,$user_id){ 
       
        if (!is_dir('uploads/'.$folder_name.'/'.$user_id)) {
            mkdir('./uploads/'.$folder_name.'/'.$user_id, 0777, TRUE);
        }
        $config['upload_path']   = './uploads/'.$folder_name.'/'.$user_id."/"; 
        $config['allowed_types'] = 'jpg|png'; 
        $config['max_size']      = 10000;        
        $new_name = time().$_FILES[$index]['name'];
        $config['file_name'] = $new_name;       
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
            
         if ( ! $this->upload->do_upload($index)) 

            return array('valid' => false, 'data' => $this->upload->display_errors());
            
         else { 
            $file_array = $this->upload->data();
            
            $data = array($index=>$file_array['file_name']); 
            return array('valid' => true, 'data' => $file_array['file_name']);  
            /*$req_data['image_name']  =$file_array['file_name'];       
            $this->Auth_model->save(Tables::BOOK_REQUEST_IMAGE,$req_data);*/            
            //return true;
         } 
    }

}
