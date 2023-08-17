<?php

defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Auth extends BD_Controller {

    function __construct()
    {
        // Construct the parent class savaran,95
        parent::__construct();
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->load->model('Auth_model');
        $this->load->library('common/common');
        $this->load->helper('common/common');
    }

    /* login user and mechanic */
    public function login_post()
    {
        $email = $this->post('email'); 
        $password = md5($this->input->post('password')); //Pasword Posted
        $kunci = $this->config->item('thekey');
        $invalidLogin = []; //Respon if login invalid
        $query = $this->Auth_model->getCustomFields(Tables::USER,array('email'=>$email),'id, first_name, last_name, email, contact_no, user_group, (CASE WHEN user_group = "1" THEN "Admin" WHEN user_group = "2" THEN "Fan / User" WHEN user_group = "3" THEN "Coach / Trainer" WHEN user_group = "4" THEN "Scout / Club" WHEN user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, dob, gender, address, city, zip_code, country, nationality, status, CASE WHEN profile_pic IS NOT NULL AND profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", id, "/", profile_pic) ELSE "" END as profile_pic, password'); //Model to get single data row from database base on username 
             
        if($query->num_rows() == 0){
            $this->response(['status'=>false,'message'=>'Your email is incorrect.'], REST_Controller::HTTP_OK);
        }else{
            $val = $query->row();
    		$match = $val->password;   //Get password for user from database
            if($password == $match){  //Condition if password matched
               
                if ($val->status==0) {
                     $this->response(['status'=>false,'message'=>'Please first verify your account'], REST_Controller::HTTP_OK);
                }
                if ($val->status==3) {
                     $this->response(['status'=>false,'message'=>'Your account is pending for approval.'], REST_Controller::HTTP_OK);
                }
                if ($val->status==2) {
                     $this->response(['status'=>false,'message'=>'Your account is not approved by admin'], REST_Controller::HTTP_OK);
                }
                if ($val->status==4) {
                    $this->response(['status'=>false,'message'=>'Your account has been Suspended'], REST_Controller::HTTP_OK);
               }
                else{
                    if (!empty($this->input->post('fcm_token'))) {
                        $this->Auth_model->Update(Tables::USER,array('id'=>$val->id),array("fcm_token" => $this->input->post('fcm_token')));
                       
                    }
                    $val->fcm_token =$this->input->post('fcm_token');
                    unset($val->password);
                	$token['id']         = $val->id;  //From here
                    $token['email']      = $val->email;                    
                    $token['user_group'] = $val->user_group;                    
                    $date                = new DateTime();
                    $token['iat']        = $date->getTimestamp();
                    $token['exp']        = $date->getTimestamp() + 60*60*24*365; //To here is to generate token
                    $output['status']    = true; 
                   
                    $output['message']   = 'Login successfully'; 
                    $output['data']      = $val; 
                   
                   
                    $output['token']     = JWT::encode($token,$kunci ); //This is the output token
                    $this->set_response($output, REST_Controller::HTTP_OK); //This is the respon if success
                }
            }else{
                $this->set_response(['status'=>false,'message'=>'Your password is incorrect .'], REST_Controller::HTTP_OK); //This is the respon if failed
            }
        }
    }

    /* Register customer */

    public function register_post()
    {
        $kunci = $this->config->item('thekey');
        $this->form_validation->set_rules('first_name','First Name','required');
        $this->form_validation->set_rules('email','Email','required|valid_email|callback_email_check');
        /*$this->form_validation->set_rules('contact_no','Contact No','required|numeric|min_length[10]|max_length[15]');*/
        $this->form_validation->set_rules('password','Password','required');
        $this->form_validation->set_rules('user_group','User Group','required');
        $this->form_validation->set_rules('term_condition','Term & Condition','required');
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            if (form_error('first_name')) {
               $error = form_error('first_name');
            }else if(form_error('email')){
                $error = form_error('email');
            }else if (form_error('contact_no')) {
                $error = form_error('contact_no');                
            }else if (form_error('password')) {
                $error = form_error('password');
            }else if (form_error('user_group')) {
                $error = form_error('user_group'); 
            }else if (form_error('term_condition')) {
                $error = form_error('term_condition'); 
            }
            $error_message=array(
                'first_name'=>form_error('first_name'),               
                'email'=>form_error('email'),                
                'password'=>form_error('password'),
                'user_group'=>form_error('user_group'),
            );
           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            if($this->input->post('user_group') == 1){
                $this->set_response(['status'=>false,'message'=>"User group have invalid value",'data'=>array('user_group' => "User group have invalid value")],REST_Controller::HTTP_OK);
                return;
            }
            $query = $this->Auth_model->getCustomFields(Tables::USER,array('email'=>strtolower($this->input->post('email'))),'*'); //Model to get single data row from database base on username 
             
            if($query->num_rows() > 0){
                $this->response(['status'=>false,'message'=>'Email already registered with us.', 'data'=>array('email' => "Email already registered with us.")], REST_Controller::HTTP_OK);
            }
            $randomString = $this->common->Generate_hash(16);    
            $this->load->helper('string');            
            $otp = random_string('alnum', 3) . random_string('numeric', 3);
            $post_data = $this->input->post();
            if($post_data['user_group'] == 2 )
                $post_data['status'] = 1;
            else
                $post_data['status'] = 3;             
            $post_data['otp'] = $otp;
            unset($post_data['password']);
            $post_data['password'] = md5($this->input->post('password'));           
                     
            $this->db->trans_begin();
            $user_detail = array(
                'first_name' => ucwords($this->input->post('first_name'),' '),
                'email' => strtolower($this->input->post('email')),                
                'password' => md5($this->input->post('password')),
                'accept_term_condition' => $this->input->post('term_condition'),
                'user_group' => $this->input->post('user_group'),
                'status' => $post_data['status'],
                'otp' => $otp,
                'created_date' => date('Y-m-d H:i:s') ,
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
            
            $user_id =$this->Auth_model->save(Tables::USER,  $user_detail);           
            if ($user_id) {
                $update_data = array();

                /*Upload Profile Pic*/
                if (isset($_FILES['profile_pic']) && !empty($_FILES['profile_pic'])) {
                    $response_data = $this->do_upload('profile','profile_pic', $user_id);
                    if($response_data['valid'])
                        $update_data['profile_pic'] = $response_data['data'];
                }

                /*Upload Professional Certificate*/
                if (isset($_FILES['professional_certificate']) && !empty($_FILES['professional_certificate'])) {
                    $response_data = $this->do_upload('documents','professional_certificate', $user_id);
                    if($response_data['valid'])
                        $update_data['professional_certificate'] = $response_data['data'];
                }

                /*Upload letter of employment*/
                if (isset($_FILES['letter_of_employment']) && !empty($_FILES['letter_of_employment'])) {
                    $response_data = $this->do_upload('documents','letter_of_employment', $user_id);
                    if($response_data['valid'])
                        $update_data['letter_of_employment'] = $response_data['data'];
                }

                /*Upload id card*/
                if (isset($_FILES['id_card']) && !empty($_FILES['id_card'])) {
                    $response_data = $this->do_upload('documents','id_card', $user_id);
                    if($response_data['valid'])
                        $update_data['id_card'] = $response_data['data'];
                }  

                if(count($update_data) > 0 )
                    $affected = $this->Auth_model->update(Tables::USER,array('id'=>$user_id), $update_data);
                 
            }
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.'],REST_Controller::HTTP_OK);
            
            }else{
                $this->db->trans_commit();
                if($post_data['user_group'] == 2 ) {
                    $res = $this->Auth_model->getCustomFields(Tables::USER,array('id'=>$user_id),'*');
                    $row = $res->row();
                    
                    
                    $token['id']        = $user_id;  //From here
                    $token['email']     = $this->input->post('email');
                    $token['user_group'] = $row->user_group;  
                    $date               = new DateTime();
                    $token['iat']       = $date->getTimestamp();
                    $token['exp']       = $date->getTimestamp() + 60*60*24*365; //To here is to generate token
                    
                    $output['status']   = true; 
                    $output['message']  = 'Register successfully'; 
                    $output['data']     = array('user_id'=>$user_id,'user_group'=>$this->input->post('user_group'),'first_name'=>ucfirst($this->input->post('first_name')),'email'=>strtolower($this->input->post('email')),'last_name'=>$row->last_name,'status'=>$row->status); 
                    $output['token']    = JWT::encode($token,$kunci ); //This is the output token
                    $this->set_response($output, REST_Controller::HTTP_OK);
                }
                else{
                    $output['status']   = true; 
                    $output['message']  = 'Register successfully.'; 
                    $output['data']     = array();
                    $output['token']    = "";
                    $this->set_response($output, REST_Controller::HTTP_OK);
                }
               /*----------------------------------*/               
            }
        }
    }

    /*Reset Password */
    public function reset_password_post(){
        $email = $this->post('email'); 
        if(!$email){
            $this->response(['status'=>false,'message'=>'Email address required'], REST_Controller::HTTP_OK);
            return;
        }

        $query = $this->Auth_model->getCustomFields(Tables::USER,array('email'=>$email),'*'); //Model to get single data row from database base on username 
             
        if($query->num_rows() == 0){
            $this->response(['status'=>false,'message'=>'Email is not registered with us.'], REST_Controller::HTTP_OK);
        }else{
            $val = $query->row();
            $this->load->helper('string');
            $otp = random_string('alnum', 3) . random_string('numeric', 3);
            $val->otp = $otp;
            $this->Auth_model->Update(Tables::USER,array('id'=>$val->id),array("otp" => $otp));
            $this->send_reset_password_mail_to_user($val);
            $this->set_response(array('status' => true, 'message' => 'Otp sent on your registered email address.', 'data' => array()), REST_Controller::HTTP_OK);
        }
    }

    

    /* login with social media(Google and Facebook) */
    public function oauth_post()
    {
        $post_data =$this->input->post();
        $query = $this->Auth_model->getCustomFields(Tables::USER,array('oauth_provider'=>$post_data['oauth_provider'],'oauth_uid'=>$post_data['oauth_uid']),'*');
        if ( $query->num_rows()>0) {
             $row =  $query->row();
         }else{
            $oauth_arr = array(
                'oauth_provider'=>$post_data['oauth_provider'],
                'oauth_uid'=>$post_data['oauth_uid'],
                'name'=>$post_data['name'],
                'email'=>$post_data['email'],
                'contact_no'=>$post_data['contact_no'],
                'password'=>date('Y-m-d H:i:s'),
                'user_group'=> $post_data['user_group'],
                'status'=>1,
                'created_date'=>date('Y-m-d H:i:s'),
                'upated_date'=>date('Y-m-d H:i:s'),
            );
            $user_id = $this->Auth_model->save(Tables::USER,$oauth_arr);
             if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.'],REST_Controller::HTTP_OK);
            
            }else{
                $res = $this->Auth_model->getCustomFields(Tables::USER,array('id'=>$user_id),'*');
                $row = $res->row();               
                $this->db->trans_commit();
            }
        }

        $token['id']        = $user_id;  //From here
        $token['email']     = $post_data('email');
        $date               = new DateTime();
        $token['iat']       = $date->getTimestamp();
        $token['exp']       = $date->getTimestamp() + 60*60*24; //To here is to generate token
        
        $output['status']   = true; 
        $output['message']  = 'Register successfully'; 
        $output['data']     = array('user_id'=>$user_id,'user_group'=> $post_data('user_group'),'name'=>ucfirst($this->input->post('name')),'email'=>strtolower($this->input->post('email')),'contact_no'=>$this->input->post('contact_no'),'status'=>$row->status); 
        $output['token']    = JWT::encode($token,$kunci ); //This is the output token
        $this->set_response($output, REST_Controller::HTTP_OK);
               
    
    }

    
    /* Check email is exist */
    public function email_check() {        
        $num   = $this->Auth_model->getSingleRecord(Tables::USER, array('email' => strtolower($this->input->post('email'))));
        if ($num->num_rows()) {
           $this->form_validation->set_message('email_check', 'This email has already been registered.');
            return FALSE;
        } else {
            return TRUE;
        }
    }

    /* Forgot password */
    public function forgot_password_post()
    {
        $res = $this->Auth_model->getCustomFields(Tables::USER,array('email'=>$this->input->post('email')),'id,otp');

            if ($res->num_rows()>0) {
                $row = $res->row();
               
                if ((string) $row->otp == (string) $this->input->post('otp')) {
                    if (!empty($this->input->post('password'))) {
                         $updated = $this->Auth_model->update(Tables::USER,array('id'=>$res->row()->id),array('password'=>md5($this->input->post('password'))));
                        $this->set_response(['status'=>true,'message'=>'Password changed successfully'],REST_Controller::HTTP_OK);
                    }else{
                       $this->set_response(['status'=>false,'message'=>'Password is required'],REST_Controller::HTTP_OK); 
                    }
                   
                }else{
                     $this->set_response(['status'=>false,'message'=>'Otp don not match'],REST_Controller::HTTP_OK);
                }
                
            }else{
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.'],REST_Controller::HTTP_OK);
            }
    }

    public function do_upload($folder_name,$index,$user_id){ 
       
        if (!is_dir('uploads/'.$folder_name.'/'.$user_id)) {
            mkdir('./uploads/'.$folder_name.'/'.$user_id, 0777, TRUE);
        }
        $config['upload_path']   = './uploads/'.$folder_name.'/'.$user_id."/"; 
        $config['allowed_types'] = 'jpg|png|gif|jpeg|doc|docx|pdf|zip'; 
        $config['max_size']      = 10000;        
        $new_name = time().$_FILES[$index]['name'];
        $config['file_name'] = $new_name;       
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
            
         if ( ! $this->upload->do_upload($index)) {
            //echo $this->upload->display_errors();
            return array('valid' => false, 'data' => $this->upload->display_errors());
         }

            
            
         else { 
            $file_array = $this->upload->data();
            $data = array($index=>$file_array['file_name']); 
            return array('valid' => true, 'data' => $file_array['file_name']);  
            /*$req_data['image_name']  =$file_array['file_name'];       
            $this->Auth_model->save(Tables::BOOK_REQUEST_IMAGE,$req_data);*/            
            //return true;
         } 
    }

    /* get color */
    public function get_color_get($value='')
    {
        $query = $this->Auth_model->getCustomFields(Tables::COLOR,array('status'=>1),'color');
        if ($query->num_rows()) {
           $this->set_response(['status'=>true,'data'=>$query->row()],REST_Controller::HTTP_OK);
        }
    }

}
