<?php 

defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * 
*/

class Admin extends MY_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->config->load('config');
		$this->load->model(array('Admin_model','api/Sport_model'));
		$this->load->library(array('common/Tables','pagination','common/common'));
		$this->load->helper(array('common/common','url'));
        $this->config->load('config');
		
	}

	/* Load home page */

	public function index()
	{	
		$data['css_array']       = $this->config->config['login_css'];
        $data['js_array']        = $this->config->config['login_js'];
		$data['title'] 			 ='Admin Login '.SITE_TITLE;
		$data['keyword'] 		 ='Admin Login '.SITE_TITLE;
		$data['description'] 	 ='Admin Login '.SITE_TITLE;
		$data['content']		 ='admin/login';
		echo Modules::run('template/login_template',$data);
		

	}
	/* login admin */
	public function login()
	{
       
		$this->form_validation->set_rules('email','Email','required');
		$this->form_validation->set_rules('password','Password','required');
		$this->form_validation->set_error_delimiters('<div class="error">', '</div>');
		if ($this->form_validation->run()==false) {
            $data['css_array']       = $this->config->config['login_css'];
            $data['js_array']        = $this->config->config['login_js'];
			$data['title'] 			 ='Admin Login '.SITE_TITLE;
			$data['keyword'] 		 ='Admin Login '.SITE_TITLE;
			$data['description'] 	 ='Admin Login '.SITE_TITLE;
			$data['content']		 ='admin/login';
			echo Modules::run('template/login_template',$data);
		}else{
			$res =$this->Admin_model->getCustomFields(Tables::USER,array('email'=>$this->input->post('email'),'user_group'=>1),'*');
           
			$flag =1;
			if ($res->num_rows()>0) {
				$row = $res->row();

				if ($row->password != md5($this->input->post('password'))) {
					$flag =2;
					$this->session->set_flashdata('error_msg','Password is incorrect');
				}else{
					
					$this->session->set_userdata("admin_user", $row);

					$this->session->set_flashdata('success_msg','Login successfully');
				}
			}else{
				$flag =2;
				$this->session->set_flashdata('error_msg','Email is incorrect');
			}
			if ($flag==1) {
				redirect('admin/dashboard');
			}else{
				redirect('admin/login');
			}
		}
	}

    /* forgot form */
    public function forgot_form()
    {
        $this->load->view('admin/forgot-form',NULL);
    }

    /* send email for reset password */
    public function forgot_password()
    {        
        $query = $this->Admin_model->getCustomFields(Tables::USER,array('email'=>$this->input->post('email'),'user_group'=>'1'),'email,id');
        if ($query->num_rows()>0) {
           
           $this->send_reset_password_mail($query->row());
          echo json_encode(array('status'=>true,'message'=>'Email is sent to '.$this->input->post('email')));
        }else{
            echo json_encode(array('status'=>false,'message'=>$this->input->post('email').' email is not registered'));
        }
    }

    /* reset password */
    public function reset_password($id,$time)
    {
        $email = encrypt_decrypt('decrypt',$id);        
        $current_date = strtotime(date('Y-m-d H:i:s'));
        if ($current_date<=$time) {  
            $query = $this->Admin_model->getCustomFields(Tables::USER,array('email'=>$email,'user_group'=>1),'id,email');
            if ($query->num_rows()>0) {
                $row = $query->row();
                $this->form_validation->set_rules('password','Password','required');
                $this->form_validation->set_rules('confirm_password','Confirm Password','required|matches[password]');
                $this->form_validation->set_error_delimiters('<span class="error">','</span>');
                if ($this->form_validation->run()==true) {
                 
                  $affected_row = $this->Admin_model->update(Tables::USER,array('id'=>encrypt_decrypt('decrypt',$this->input->post('auth_id'))),array('password'=>md5($this->input->post('password'))));
                  $this->session->set_flashdata('success_msg','Password is changed successfully');
                  redirect('admin/login');
                }else{
                    $data['css_array']       = $this->config->config['login_css'];
                    $data['js_array']        = $this->config->config['login_js'];
                    $data['title']           ='Reset Password '.SITE_TITLE;
                    $data['keyword']         ='Reset Password '.SITE_TITLE;
                    $data['description']     ='Reset Password '.SITE_TITLE;
                    $data['content']         ='admin/reset_password';
                    $data['row']             = $row;
                    $data['id']              = $id;
                    $data['time']            = $time;
                    echo Modules::run('template/login_template',$data);
                }
            }else{
                 echo '<h1>This link has been expired</h1>';
            }     
            
            
        }else{
            echo '<h1>This link has been expired</h1>';
        }
    }
    public function forgot()
    {       
       $affected_row = $this->Admin_model->update(Tables::ADMIN,array('id'=>encrypt_decrypt('decrypt',$this->input->post('id'))),array('password'=>md5($this->input->post('password'))));
      
       if ($affected_row) {
           echo json_encode(array('status'=>true,'message'=>'Password changed successfully'));
       }else{
         echo json_encode(array('status'=>false,'message'=>'Error occurred, Please try after some time'));
       }
    }

    /* Dashboard */
    public function dashboard()
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['dashbord_css'];
        $data['js_array']        = $this->config->config['dashbord_js'];
        $data['title']           = 'Dashboard '.SITE_TITLE;
        $data['keyword']         = 'Dashboard '.SITE_TITLE;
        $data['description']     = 'Dashboard '.SITE_TITLE;
        $data['stats_info']      =  $this->Admin_model->get_user_count_stats();
        $data['fan_chart_data'] =  $this->Admin_model->get_user_chart_data(2);
        $data['coach_chart_data'] =  $this->Admin_model->get_user_chart_data(3);
        $data['club_chart_data'] =  $this->Admin_model->get_user_chart_data(4);
        $data['athlete_chart_data'] =  $this->Admin_model->get_user_chart_data(5);
        $data['post_chart_data'] =  $this->Admin_model->get_post_chart_data('post');
        $data['content']         ='admin/dashboard';
        echo Modules::run('template/admin_template',$data);
    }

    /* Manage Data */
    public function manage_data()
    {
        $this->adminAuthentication();
        $this->load->model(array('api/Sport_model'));

        $data['css_array']       = $this->config->config['manage_data_css'];
        $data['js_array']        = $this->config->config['manage_data_js'];
        $data['title']           = 'Manage Data '.SITE_TITLE;
        $data['keyword']         = 'Manage Data '.SITE_TITLE;
        $data['description']     = 'Manage Data '.SITE_TITLE;
        $data['category_data']   =  $this->Admin_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL AND taxonomy_type = "post"','id as sports_id,name as sports_name');
        $data['sub_category_data']=  $this->Sport_model->getAllSubSports();
        $settings                = $this->Admin_model->get_settings(); 
        $data['settings']   = $settings; 
        $data['content']         ='admin/manage_data';
        echo Modules::run('template/admin_template',$data);
    }

    /* Manage Fitness Data */
    public function manage_fitness_data()
    {
        $this->adminAuthentication();
        $this->load->model(array('api/Sport_model'));

        $data['css_array']       = $this->config->config['manage_data_css'];
        $data['js_array']        = $this->config->config['manage_fitness_data_js'];
        $data['title']           = 'Manage Data '.SITE_TITLE;
        $data['keyword']         = 'Manage Data '.SITE_TITLE;
        $data['description']     = 'Manage Data '.SITE_TITLE;
        $data['category_data']   =  $this->Admin_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL AND taxonomy_type = "fitness_studio"','id as sports_id,name as sports_name');
        $data['sub_category_data']      =  $this->Sport_model->getAllSubSports(array('taxonomy_type' => 'fitness_studio'));

        $data['content']         ='admin/manage_data';
        echo Modules::run('template/admin_template',$data);
    }

    /*Load Category Modal*/
    public function get_category_modal($taxonomy_type = 'post'){
        $this->adminAuthentication();
        $get_data = $this->input->get();
        if(isset($get_data['sports_id']) && !empty($get_data['sports_id'])) {
            $sports_id = encrypt_decrypt('decrypt', $get_data['sports_id']);
            $category_data   =  $this->Admin_model->getCustomFields(Tables::SPORTS, array('id' => $sports_id, 'taxonomy_type' => $taxonomy_type),'id as sports_id,name as sports_name');
            if($category_data->num_rows() > 0) {
                $categoryData = $category_data->row();
                $get_data['sports_name'] = $categoryData->sports_name;
            }
        }
        echo $this->load->view('admin/category_modal', $get_data);
    }

    /* Add Category */
    public function add_category($taxonomy_type = 'post'){
        $this->adminAuthentication();
        $this->form_validation->set_rules('sports_name','Category Name','required');
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){            
            $sports_id   = $this->input->post('sports_id');
            if($sports_id)
                $sports_id = encrypt_decrypt('decrypt', $sports_id);
            
            $data_array = array(
                'name' => $this->input->post('sports_name'),
                'taxonomy_type' => $taxonomy_type,
                'status'     => 1
            );
            $condition = array('name' => $this->input->post('sports_name'), 'taxonomy_type' => $taxonomy_type);
            if($sports_id)
                $condition['id !='] = $sports_id;
            
            $checkCategoryExist = $this->Admin_model->getCustomFields(Tables::SPORTS,$condition,'id as sports_id,name as sports_name');

            if($checkCategoryExist->num_rows() > 0 ) {
                echo json_encode(array('status'=>2,'msg'=> "Category name already exists!"));
                die();
            }
            if($sports_id)
                $add_category = $this->Admin_model->update(Tables::SPORTS, array('id' => $sports_id),$data_array);
            else
                $add_category = $this->Admin_model->Save(Tables::SPORTS,$data_array);
            /*if($add_category) {
                $old_image = $this->input->post('old_image');
                if($old_image && isset($data_array['term_image']))
                    @unlink('./uploads/category/'.$old_image);
            }*/
            echo json_encode(array('status'=>1,'msg'=>($sports_id) ? "Updated Successfully" : "Added Successfully"));
        }
        else
            echo json_encode(array('status'=>2,'msg'=>'Please fill category name.'));
    }

    /*Load Subcategory Modal*/
    public function get_subcategory_modal($taxonomy_type = 'post'){
        $this->adminAuthentication();
        $get_data = $this->input->get();
        $get_data['category_data']   =  $this->Admin_model->getCustomFields(Tables::SPORTS,'parent_sports_id IS NULL AND taxonomy_type = "'.$taxonomy_type.'"','id as sports_id,name as sports_name');
        if(isset($get_data['sub_sports_id']) && !empty($get_data['sub_sports_id'])) {
            $sub_sports_id = encrypt_decrypt('decrypt', $get_data['sub_sports_id']);
            $category_data   =  $this->Admin_model->getCustomFields(Tables::SPORTS, array('id' => $sub_sports_id),'id as sub_sports_id,name as sports_name, parent_sports_id as sports_id');
            if($category_data->num_rows() > 0) {
                $categoryData = $category_data->row();
                $get_data['sports_name'] = $categoryData->sports_name;
                $get_data['sports_id'] = $categoryData->sports_id;
            }
        }
        echo $this->load->view('admin/subcategory_modal', $get_data);
    }


    /* Add Sub Category */
    public function add_subcategory($taxonomy_type = 'post'){
        $this->adminAuthentication();
        $this->form_validation->set_rules('sports_name','Sub Category Name','required');
        $this->form_validation->set_rules('sports_id','Category','required');
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){            
            $sub_sports_id   = $this->input->post('sub_sports_id');
            $sports_id   = $this->input->post('sports_id');
            $sports_id = encrypt_decrypt('decrypt', $sports_id);
            if($sub_sports_id)
                $sub_sports_id = encrypt_decrypt('decrypt', $sub_sports_id);
            
            $data_array = array(
                'name' => $this->input->post('sports_name'),
                'parent_sports_id' => $sports_id,
                'taxonomy_type' => $taxonomy_type,
                'status'     => 1
            );
            $condition = array('name' => $this->input->post('sports_name'), 'parent_sports_id' => $sports_id, 'taxonomy_type' => $taxonomy_type);
            if($sub_sports_id)
                $condition['id !='] = $sub_sports_id;
            
            $checkCategoryExist = $this->Admin_model->getCustomFields(Tables::SPORTS,$condition,'id as sub_sports_id,name as sports_name');

            if($checkCategoryExist->num_rows() > 0 ) {
                echo json_encode(array('status'=>2,'msg'=> "Sub category name already exists!"));
                die();
            }
            if($sub_sports_id)
                $add_category = $this->Admin_model->update(Tables::SPORTS, array('id' => $sub_sports_id),$data_array);
            else
                $add_category = $this->Admin_model->Save(Tables::SPORTS,$data_array);
            /*if($add_category) {
                $old_image = $this->input->post('old_image');
                if($old_image && isset($data_array['term_image']))
                    @unlink('./uploads/category/'.$old_image);
            }*/
            echo json_encode(array('status'=>1,'msg'=>($sub_sports_id) ? "Updated Successfully" : "Added Successfully"));
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));
    }

    public function delete_category(){
        $this->adminAuthentication();
        $sports_id = $this->input->post('sports_id');
        if($sports_id){
            $sports_id = encrypt_decrypt('decrypt', $sports_id);
            $checkCategoryExist = $this->Admin_model->getCustomFields(Tables::SPORTS,array('id' => $sports_id),'id as sub_sports_id,name as sports_name');
            if($checkCategoryExist->num_rows() > 0){
                $this->db->trans_begin();
                $this->Admin_model->update(Tables::USER, array('sports_id' => $sports_id), array('sports_id' => ''));
                $this->Admin_model->update(Tables::USER, array('scouting_sports_id' => $sports_id), array('scouting_sports_id' => ''));
                
                $this->Admin_model->update(Tables::POSTS, array('sports_id' => $sports_id), array('sports_id' => '', 'sub_sports_id' => ''));
                $this->Admin_model->delete_by_condition(Tables::SPORTS, array('parent_sports_id' => $sports_id));
                $this->Admin_model->delete_by_condition(Tables::SPORTS, array('id' => $sports_id));
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('status'=>2,'msg'=>"Please try again, Something is wrong.")); 
                    die(); 
                    
                
                }
                else{
                    $this->db->trans_commit();
                    echo json_encode(array('status'=>1,'msg'=>"Deleted successfully")); 
                    die(); 
                }
            }
            else
              echo json_encode(array('status'=>2,'msg'=>"Invalid request"));  

        }
        else
            echo json_encode(array('status'=>2,'msg'=>"Invalid request"));
    }

    public function delete_subcategory(){
        $this->adminAuthentication();
        $sports_id = $this->input->post('sports_id');
        if($sports_id){
            $sports_id = encrypt_decrypt('decrypt', $sports_id);
            $checkCategoryExist = $this->Admin_model->getCustomFields(Tables::SPORTS,array('id' => $sports_id),'id as sub_sports_id,name as sports_name');
            if($checkCategoryExist->num_rows() > 0){
                $this->db->trans_begin();
                //$this->Admin_model->update(Tables::USER, array('sports_id' => $sports_id), array('sports_id' => ''));
                
                $this->Admin_model->update(Tables::POSTS, array('sub_sports_id' => $sports_id), array('sub_sports_id' => ''));
                
                $this->Admin_model->delete_by_condition(Tables::SPORTS, array('id' => $sports_id));
                if ($this->db->trans_status() === FALSE) {
                    $this->db->trans_rollback();
                    echo json_encode(array('status'=>2,'msg'=>"Please try again, Something is wrong.")); 
                    die(); 
                    
                
                }
                else{
                    $this->db->trans_commit();
                    echo json_encode(array('status'=>1,'msg'=>"Deleted successfully")); 
                    die(); 
                }
            }
            else
              echo json_encode(array('status'=>2,'msg'=>"Invalid request"));  

        }
        else
            echo json_encode(array('status'=>2,'msg'=>"Invalid request"));
    }

    /* Upload Video */
    public function upload_video()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['upload_video_css'];
        $data['js_array']        = $this->config->config['upload_video_js'];
        $data['title']           = 'Upload Video '.SITE_TITLE;
        $data['keyword']         = 'Upload Video '.SITE_TITLE;
        $data['description']     = 'Upload Video '.SITE_TITLE;
        $data['category_data']   =  $this->Admin_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL AND taxonomy_type= "post"','id as sports_id,name as sports_name');
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        $filter_condition = array('status' => 1,'post_type'=>'post');
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        $getAllPosts = $this->Post_Model->getAllPosts($filter_condition, $offset, $per_page);
        
        $getTotalPosts = $this->Post_Model->totalPostCount($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
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
                          
                //$post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->post_comments = $post_comments;
                array_push($resultSet['records'], $value);


            }
        }
        $data['recent_posts'] = $resultSet;
        $data['content']         ='admin/upload_video';
        echo Modules::run('template/admin_template',$data);
    }


    /* Fitness Studio */
    public function fitness_studio()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['upload_video_css'];
        $data['js_array']        = $this->config->config['fitness_studio_js'];
        $data['title']           = 'Fitness Studio '.SITE_TITLE;
        $data['keyword']         = 'Fitness Studio '.SITE_TITLE;
        $data['description']     = 'Fitness Studio '.SITE_TITLE;
        $data['category_data']   =  $this->Admin_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL AND taxonomy_type= "fitness_studio"','id as sports_id,name as sports_name');
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        $filter_condition = array('status' => 1, 'post_type' => 'fitness_studio');
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        $getAllPosts = $this->Post_Model->getAllPosts($filter_condition, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->totalPostCount($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
               
                $post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->post_comments = $post_comments;
                array_push($resultSet['records'], $value);


            }
        }
        $data['recent_posts'] = $resultSet;
        $data['content']         ='admin/fitness_studio';
        echo Modules::run('template/admin_template',$data);
    }

    /* Sports Center */
    public function sports_center()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['sports_center_css'];
        $data['js_array']        = $this->config->config['sports_center_js'];
        $data['js_external_array'] = array('https://maps.googleapis.com/maps/api/js?key='. GOOGLE_API_KEY.'&libraries=places&callback=initAutocomplete');
        $data['title']           = 'Sports Center '.SITE_TITLE;
        $data['keyword']         = 'Sports Center '.SITE_TITLE;
        $data['description']     = 'Sports Center '.SITE_TITLE;
        
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        $data['filter_data'] =  $filter_post;
        $filter_condition = array('status' => 1);
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['filter_type']) && !empty($filter_post['filter_type']))
            $filter_condition['post_type'] = $filter_post['filter_type'];
        $getAllPosts = $this->Post_Model->getAllPosts($filter_condition, $offset, $per_page);
        //echo $this->db->last_query();
        $getTotalPosts = $this->Post_Model->totalPostCount($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
               
                $post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->post_comments = $post_comments;
                array_push($resultSet['records'], $value);


            }
        }
        $data['recent_posts'] = $resultSet;
        $data['content']         ='admin/sports_center';
        echo Modules::run('template/admin_template',$data);
    }

    /* Get Coaching Academy Enquiry list  */
    public function book_appointment($id='')
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['event_css'];
        $data['js_array']        = $this->config->config['event_js'];

        $config = array();

        $filter_data = $this->input->get();
         $filter_data['post_id'] = encrypt_decrypt('decrypt',$id);
       /* if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;*/
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/enquiry";
        $config["total_rows"] = $this->Admin_model->totalBookingCount($filter_data)->row()->total_count;

       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        
        $data["result"] =$this->Admin_model->getAllBooking( $filter_data,$config["per_page"], $page)->result();
        //echo $this->db->last_query();die; 
        
        $data['title']           ='Sports Centre Enquiry '.SITE_TITLE;
        $data['keyword']         ='Sports Centre Enquiry '.SITE_TITLE;
        $data['description']     ='Sports Centre Enquiry '.SITE_TITLE;
        $data['content']         ='admin/book_appointment';
        echo Modules::run('template/admin_template',$data);
    }

    /* Gym */
    public function gym()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['sports_center_css'];
        $data['js_array']        = $this->config->config['gym_js'];
        $data['js_external_array'] = array('https://maps.googleapis.com/maps/api/js?key='. GOOGLE_API_KEY.'&libraries=places&callback=initAutocomplete');
        $data['title']           = 'Gym '.SITE_TITLE;
        $data['keyword']         = 'Gym '.SITE_TITLE;
        $data['description']     = 'Gym '.SITE_TITLE;
        
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        $filter_condition = array('status' => 1, 'post_type' => 'gym');
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        $getAllPosts = $this->Post_Model->getAllPosts($filter_condition, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->totalPostCount($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {
               
                $post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->post_comments = $post_comments;
                array_push($resultSet['records'], $value);


            }
        }
        $data['recent_posts'] = $resultSet;
        $data['content']         ='admin/gym';
        echo Modules::run('template/admin_template',$data);
    }

    /* Gym */
    public function personal_trainee()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['sports_center_css'];
        $data['js_array']        = $this->config->config['personal_trainee_js'];
        /*$data['js_external_array'] = array('https://maps.googleapis.com/maps/api/js?key='. GOOGLE_API_KEY.'&libraries=places&callback=initAutocomplete');*/
        $data['title']           = 'Personal Trainer '.SITE_TITLE;
        $data['keyword']         = 'Personal Trainer '.SITE_TITLE;
        $data['description']     = 'Personal Trainer '.SITE_TITLE;
        
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        //$filter_condition = array('status' => 1, 'post_type' => 'gym');
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        $getAllPosts = $this->Post_Model->get_trainee($filter_condition, $offset, $per_page);

        $getTotalPosts = $this->Post_Model->get_total_trainee($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $getTotalPosts->num_rows(), 'totalPages' => ceil($getTotalPosts->num_rows()/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {               
                $post_images = $this->Post_Model->get_trainee_image($value->id);
                
                $value->post_images = $post_images;              
                array_push($resultSet['records'], $value);
            }
        }
        $data['recent_posts']    = $resultSet;
        $data['content']         ='admin/personal_tranee';
        echo Modules::run('template/admin_template',$data);
    }

    /* save trainee */
    public function save_trainee($post_type = 'post')
    {

        $this->adminAuthentication();        
        $this->form_validation->set_rules('title','Title','required');
        $this->form_validation->set_rules('rating','Rating','less_than[6]');
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){            
            $admin_user = $this->session->userdata('admin_user');
            $image_array = $this->session->userdata('images');
            $user_id = $admin_user->id;
            $post_data = $this->input->post();

            if(empty($post_data['trainee_id']) && (!isset($post_data['description']) || empty($post_data['description'])) && (!isset($image_array) || empty($image_array)) ) {
                echo json_encode(array('status'=>2,'msg'=>"Please provide description or upload media"));
                
                return;
            }
            $post_detail  = array(
                'description' => @$this->input->post('description'),              
                'updated_date' =>date('Y-m-d H:i:s'), 
            ); 
            if(empty($post_data['trainee_id'])){
                $post_detail['created_by'] = $user_id;
                $post_detail['created_date'] = date('Y-m-d H:i:s');
                
            }           
                $post_detail['title'] = $this->input->post('title');
                $post_detail['email'] = $this->input->post('email');
                $post_detail['speciality'] = $this->input->post('speciality');
                $post_detail['skill'] = $this->input->post('skill');
                $post_detail['experience'] = $this->input->post('experience');
                $post_detail['rating'] = $this->input->post('rating');                
            if(empty($post_data['trainee_id'])){
                $trainee_id = $this->Admin_model->save(Tables::TRAINEE, $post_detail);
            }
            else {
                $trainee_id = $post_data['trainee_id'];
                $this->Admin_model->update(Tables::TRAINEE, array('id' => $trainee_id), $post_detail);
            }

            
            if($trainee_id) {

                $req_data = array(
                    'trainee_id' => $trainee_id,
                    'created_date'=>date('Y-m-d H:i:s'),
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                $temp = ($this->session->userdata('images')) ? $this->session->userdata('images') : array();
                $profile_temp = ($this->session->userdata('profile_images')) ? $this->session->userdata('profile_images') : array();
                //print_r($profile_temp[0]['file_name']);die;   

                if ($profile_temp[0]['file_name'] ) {
                     $folder_path1 = './uploads/profile_pic/'.$trainee_id;
                    if (!is_dir(FCPATH . $folder_path1)) 
                        mkdir(FCPATH . $folder_path1, 0777, true);
                     copy('./uploads/temp/'. $profile_temp[0]['file_name'],$folder_path1.'/'. $profile_temp[0]['file_name']);
                    //$req_data['name']  =  $profile_temp;
                   $this->Admin_model->update(Tables::TRAINEE,array('id'=>$trainee_id),array('profile_pic'=> $profile_temp[0]['file_name'])); 
                    @unlink('./uploads/temp/'. $profile_temp[0]['file_name']);
                    $this->session->set_userdata('profile_images','');
                }

                if(count($temp) > 0 ) { 
                    //$sub_path = date('Y').'/'.date('m');
                    $folder_path = './uploads/trainee';
                    if (!is_dir(FCPATH . $folder_path)) 
                        mkdir(FCPATH . $folder_path, 0777, true);
                    
                    foreach ($temp as $key => $value) {
                        if($value['file_name']) {                         
                           
                            $req_data = array(
                                'trainee_id' => $trainee_id,
                                'created_date'=>date('Y-m-d H:i:s'),
                                'updated_date'=>date('Y-m-d H:i:s'),
                            );
                            if(strpos($value['file_name'], '.mp4') > -1){

                                $file_name_without_extension = explode(".", $value['file_name']);

                                array_pop($file_name_without_extension);
                                
                                $thumbnail_image_name = implode('.', $file_name_without_extension).".jpeg";
                                $thumbnail_image = $folder_path."/".$thumbnail_image_name;
                                
                                $source_file = './uploads/temp/'.$value['file_name'];                               
                                $genrate_thumb_image = generate_video_thumbnail($source_file, $thumbnail_image);
                                if($genrate_thumb_image)
                                    $req_data['thumbnail_image']  = $thumbnail_image_name;
                                //$compress_video_name = strtotime(date('YmdHis')).$value['file_name'];
                                $compress_video_name = $value['file_name'];
                                
                                $compress_video_path = $folder_path."/".$compress_video_name;
                                
                                $compress_video = compress_video_file($source_file, $compress_video_path);
                                $req_data['name']  = $compress_video_name; 
                               
                            }else{
                                copy('./uploads/temp/'.$value['file_name'], $folder_path.'/'.$value['file_name']);
                                $req_data['name']  = $value['file_name'];       
                            }
                            $this->Admin_model->save(Tables::TRAINEE_IMAGE,$req_data); 
                            

                            @unlink('./uploads/temp/'.$value['file_name']);
                           
                            
                        }
                    }
                    $this->session->set_userdata('images', array());
                    
                }
                                      
                 echo json_encode(array('status'=>1,'msg'=>(empty($post_data['trainee_id'])) ? 'Save successfully' : "Updated successfully"));
                 die();  
                
            }else{
                 echo json_encode(array('status'=>1,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }
    /*View trainer profile*/
    public function view_trainer_profile($user_id){
        $trainee_id = encrypt_decrypt('decrypt', $user_id);
        $support_documents = $this->Admin_model->getCustomFields(Tables::TRAINEE,array('id' => $trainee_id),'*');
        if($support_documents->num_rows() > 0 ){
            $files = array();
            
            $userInfo = $support_documents->row();
            $get_data['user_info'] = $userInfo; 
            echo $this->load->view('admin/view_trainer_profile', $get_data);

            
        }else{
            //$get_data['user_info'] = new stdClass(); 
            //echo $this->load->view('admin/view_trainer_profile', $get_data);
        }
    }
    /*View trainer profile*/
    public function view_trainer_session($user_id){
        $trainee_id = encrypt_decrypt('decrypt', $user_id);
        $support_documents = $this->Admin_model->getCustomFields(Tables::TRAINEE_SESSION,array('trainee_id' => $trainee_id),'*');       
            $get_data['user_info'] =  $support_documents; 
            echo $this->load->view('admin/view_session', $get_data);

            
       
    }
    /*Get Post Details Upload Vedio*/
    public function get_training_item($post_type = 'post'){
        $this->adminAuthentication();
        $this->load->model(array('api/Post_Model'));
        $this->form_validation->set_rules('trainee_id','Trainee id','required');        
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 
            $trainee_id = $this->input->post('trainee_id');
            $trainee_id = encrypt_decrypt('decrypt', $trainee_id);
            $query = $this->Admin_model->getCustomFields(Tables::TRAINEE,array('id'=>$trainee_id),'*');
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                          
                
                $post_images = $this->Post_Model->get_trainee_image($post_details->id);;
                $post_details->images = $post_images;
                echo json_encode(array('status'=>1,'msg'=>'Post info', 'data' => $post_details));
                 die();   
                

                   
                
            }else{
                 echo json_encode(array('status'=>2,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }

    /*Delete Upload Vedio*/
    public function delete_training_item($post_type = 'post'){
        $this->adminAuthentication();        
        $this->form_validation->set_rules('trainee_id','Trainee id','required');       
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 
            $trainee_id = $this->input->post('trainee_id');
            $trainee_id = encrypt_decrypt('decrypt', $trainee_id);
            $query = $this->Admin_model->getCustomFields(Tables::TRAINEE,array('id'=>$trainee_id),'id, created_by');
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                
                    $this->db->trans_begin(); 
                    $image_query = $this->Admin_model->getCustomFields(Tables::TRAINEE_IMAGE,array('trainee_id'=>$trainee_id),'id,name');
                    if ($image_query->num_rows()>0) {
                        foreach ($image_query->result() as $image) {
                            $image_file_path = 'uploads/trainee/'.$image->name;
                            //echo $file_path ;
                            if (file_exists($image_file_path)) {
                               unlink($image_file_path);
                            }
                            $this->Admin_model->delete_by_condition(Tables::TRAINEE_IMAGE,array('id'=>$image->id));
                        }
                    }
                    $this->Admin_model->delete_by_condition(Tables::TRAINEE_SESSION, array('trainee_id' => $trainee_id));
                    $this->Admin_model->delete_by_condition(Tables::TRAINEE, array('id' => $trainee_id));
                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                        
                        echo json_encode(array('status'=>2,'msg'=>'Please try again, Something is wrong.'));
                        die();
                    
                    }
                    else{
                        $this->db->trans_commit();
                        
                        echo json_encode(array('status'=>1,'msg'=>'Successfully deleted'));
                        die();
                    }
                

                   
                
            }else{
                 echo json_encode(array('status'=>2,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }

    /* Coaching Academy */
    public function coaching_academy()
    {
        $this->adminAuthentication();
        $this->session->set_userdata('images', array());
        $this->load->model(array('api/Post_Model'));
        $data['css_array']       = $this->config->config['sports_center_css'];
        $data['js_array']        = $this->config->config['coaching_academy_js'];
        $data['js_external_array'] = array('https://maps.googleapis.com/maps/api/js?key='. GOOGLE_API_KEY.'&libraries=places&callback=initAutocomplete');
        $data['title']           = 'Coaching Academy '.SITE_TITLE;
        $data['keyword']         = 'Coaching Academy '.SITE_TITLE;
        $data['description']     = 'Coaching Academy '.SITE_TITLE;
        
        $offset = 0;
        $page_no = 1;
        $per_page = 100;
        $filter_post = $this->input->get();
        $filter_condition = array('status' => 1, 'post_type' => 'coaching_academy');
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $filter_condition['keywords'] = $filter_post['keywords'];
        $getAllPosts = $this->Post_Model->getAllPosts($filter_condition, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->totalPostCount($filter_condition);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        $admin_user = $this->session->userdata('admin_user');
        $user_id = $admin_user->id;
        if($getAllPosts->num_rows() > 0 ){
            foreach ($getAllPosts->result() as $value) {               
                $post_images = $this->Post_Model->getPostImages($value->post_id);
                $post_comments = $this->Post_Model->getPostComments($value->post_id);
                $post_likes = $this->Post_Model->getPostLikes($value->post_id);
                $like_by_user = $this->Post_Model->getCustomFields(Tables::POST_LIKE,array('post_id'=>$value->post_id, 'user_id' => $user_id),'id');
                if($like_by_user->num_rows() > 0)
                    $value->isLiked = true;
                else
                    $value->isLiked = false;
                $value->post_likes = $post_likes;
                $value->post_images = $post_images;
                $value->post_comments = $post_comments;
                array_push($resultSet['records'], $value);
            }
        }
        $data['recent_posts'] = $resultSet;
        $data['content']         ='admin/coaching_academy';
        echo Modules::run('template/admin_template',$data);
    }

    /*Save Upload Vedio*/
    public function save_upload_video($post_type = 'post'){
        $this->adminAuthentication();
        
        if($post_type == 'post' || $post_type == 'fitness_studio') {
            $this->form_validation->set_rules('sports_id','Category','required');
            $this->form_validation->set_rules('sub_sports_id','Sub category','required');
        }
        else {
            $this->form_validation->set_rules('title','Title','required');
            $this->form_validation->set_rules('location','Location','required');
            $this->form_validation->set_rules('rating','Rating','less_than[6]');
            
        }
        
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 

            /*$sub_sports_id   = $this->input->post('sub_sports_id');
            $sports_id   = $this->input->post('sports_id');*/
            $admin_user = $this->session->userdata('admin_user');
            $image_array = $this->session->userdata('images');
            $user_id = $admin_user->id;
            $post_data = $this->input->post();

            if(empty($post_data['post_id']) && (!isset($post_data['description']) || empty($post_data['description'])) && (!isset($image_array) || empty($image_array)) ) {
                echo json_encode(array('status'=>2,'msg'=>"Please provide description or upload media"));
                
                return;
            }
            $post_detail  = array(
                'description' => @$this->input->post('description'),
                'post_type' => $post_type,
                'updated_date' =>date('Y-m-d H:i:s'), 
            ); 
            if(empty($post_data['post_id'])){
                $post_detail['created_by'] = $user_id;
                $post_detail['created_date'] = date('Y-m-d H:i:s');
                $post_detail['status'] = 1;
            }
            if($post_type == 'post' || $post_type == 'fitness_studio'){
                $post_detail['sports_id'] = $this->input->post('sports_id');
                $post_detail['sub_sports_id'] = $this->input->post('sub_sports_id');
            }   
            else {
                $post_detail['title'] = ucwords($this->input->post('title'));
                $post_detail['location'] = $this->input->post('location');
                if(isset($post_data['website_url']) && !empty($post_data['website_url'])){
                    $website_url = (strpos($post_data['website_url'], 'http://') > -1 || strpos($post_data['website_url'], 'https://') > -1) ? $post_data['website_url'] : "http://".$post_data['website_url'];
                    $post_detail['website_url'] = $website_url;
                }
                if(isset($post_data['link_contact_form']) && !empty($post_data['link_contact_form'])){
                    
                    $post_detail['link_contact_form'] = $post_data['link_contact_form'];
                }

                if(isset($post_data['contact_email']) && !empty($post_data['contact_email'])){
                    if (!filter_var($post_data['contact_email'], FILTER_VALIDATE_EMAIL)) {
                      echo json_encode(array('status'=>2,'msg'=>"Please enter valid email address"));
                
                        return;
                    } 
                    $post_detail['contact_email'] = $post_data['contact_email'];
                }
            }
            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
                $post_detail['latitude'] = $post_data['latitude'];
                $post_detail['longitude'] =  $post_data['longitude'];
            } 
            if(isset($post_data['postal_code']) && !empty($post_data['postal_code']) ){
                $post_detail['postal_code'] = $post_data['postal_code'];              
            }
            if(isset($post_data['post_type']) && !empty($post_data['post_type']) ){
                $post_detail['post_type'] = $post_data['post_type'];              
            }
            if(isset($post_data['rating']) && !empty($post_data['rating']) ){
                $post_detail['rating'] = $post_data['rating'];              
            }
            if(empty($post_data['post_id']))
                $post_id = $this->Admin_model->save(Tables::POSTS, $post_detail);
            else {
                $post_id = $post_data['post_id'];
                $this->Admin_model->update(Tables::POSTS, array('id' => $post_id), $post_detail);
            }

            
            if($post_id) {

                $req_data = array(
                    'post_id' => $post_id,
                    'created_date'=>date('Y-m-d H:i:s'),
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                $temp = ($this->session->userdata('images')) ? $this->session->userdata('images') : array();
                if(count($temp) > 0 ) { 
                    //$sub_path = date('Y').'/'.date('m');
                    $folder_path = './uploads/posts';
                    if (!is_dir(FCPATH . $folder_path)) 
                        mkdir(FCPATH . $folder_path, 0777, true);
                    
                    foreach ($temp as $key => $value) {
                        if($value['file_name']) {
                            
                            $req_data = array(
                                'post_id' => $post_id,
                                'created_date'=>date('Y-m-d H:i:s'),
                                'updated_date'=>date('Y-m-d H:i:s'),
                            );
                            if(strpos($value['file_name'], '.mp4') > -1){
                                $file_name_without_extension = explode(".", $value['file_name']);
                                array_pop($file_name_without_extension);
                                
                                $thumbnail_image_name = implode('.', $file_name_without_extension).".jpeg";
                                $thumbnail_image = $folder_path."/".$thumbnail_image_name;
                                $source_file = './uploads/temp/'.$value['file_name'];
                                $genrate_thumb_image = generate_video_thumbnail($source_file, $thumbnail_image);
                                if($genrate_thumb_image)
                                    $req_data['thumbnail_image']  = $thumbnail_image_name;
                                $compress_video_name = strtotime(date('YmdHis')).$value['file_name'];
                                $compress_video_path = $folder_path."/".$compress_video_name;
                                $compress_video = compress_video_file($source_file, $compress_video_path);
                                $req_data['name']  = $compress_video_name; 
                            }
                            else {
                                copy('./uploads/temp/'.$value['file_name'], $folder_path.'/'.$value['file_name']);
                                $req_data['name']  = $value['file_name'];       
                            }
                            $this->Admin_model->save(Tables::POST_IMAGES,$req_data); 
                            @unlink('./uploads/temp/'.$value['file_name']);
                            
                        }
                    }
                    $this->session->set_userdata('images', array());
                }
                                      
                 echo json_encode(array('status'=>1,'msg'=>(empty($post_data['post_id'])) ? 'Save successfully' : "Updated successfully"));
                 die();  
                
            }else{
                 echo json_encode(array('status'=>1,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }

    /*Delete Upload Vedio*/
    public function delete_post_item($post_type = 'post'){
        $this->adminAuthentication();
        
        $this->form_validation->set_rules('post_id','Post id','required');        
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 
            $post_id = $this->input->post('post_id');
            $post_id = encrypt_decrypt('decrypt', $post_id);
            $query = $this->Admin_model->getCustomFields(Tables::POSTS,array('id'=>$post_id),'id, created_by');
           
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                   
                    $this->db->trans_begin();
                    $this->Admin_model->delete_by_condition(Tables::POST_COMMENTS, array('post_id' => $post_id));
                   
                    $this->Admin_model->delete_by_condition(Tables::COACHING_ACADEMY_ENQUIRY, array('post_id' => $post_id));
                   
                    $this->Admin_model->delete_by_condition(Tables::POST_LIKE, array('post_id' => $post_id));

                    $this->Admin_model->delete_by_condition(Tables::POST_FAVOURITE, array('post_id' => $post_id));

                    $this->Admin_model->delete_by_condition(Tables::POSTS, array('shared_post_id' => $post_id));

                    $image_query = $this->Admin_model->getCustomFields(Tables::POST_IMAGES,array('post_id'=>$post_id),'id,name');

                    if ($image_query->num_rows()>0) {
                        foreach ($image_query->result() as $image) {
                            $image_file_path = 'uploads/posts/'.$image->name;
                            //echo $file_path ;
                            if (file_exists($image_file_path)) {
                               unlink($image_file_path);
                            }
                            $this->Admin_model->delete_by_condition(Tables::POST_IMAGES,array('id'=>$image->id));
                        }
                    }
                    $this->Admin_model->delete_by_condition(Tables::POSTS, array('id' => $post_id));
                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                        
                        echo json_encode(array('status'=>2,'msg'=>'Please try again, Something is wrong.'));
                        die();
                    
                    }
                    else{
                        $this->db->trans_commit();
                        
                        echo json_encode(array('status'=>1,'msg'=>'Successfully deleted'));
                        die();
                    }
                

                   
                
            }else{
                 echo json_encode(array('status'=>2,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }

    /*Get Post Details Upload Vedio*/
    public function get_post_item($post_type = 'post'){
        $this->adminAuthentication();
        $this->load->model(array('api/Post_Model'));
        $this->form_validation->set_rules('post_id','Post id','required');        
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 
            $post_id = $this->input->post('post_id');
            $post_id = encrypt_decrypt('decrypt', $post_id);
            $query = $this->Admin_model->getCustomFields(Tables::POSTS,array('id'=>$post_id),'*');
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                $sub_category = array();
                if($post_details->sports_id){
                    $sub_query = $this->Admin_model->getCustomFields(Tables::SPORTS,array('parent_sports_id'=>$post_details->sports_id),'*');
                    if($sub_query->num_rows() > 0)
                        $post_details->sub_sports_data = $sub_query->result();
                }
                else
                    $post_details->sub_sports_data = array();
                $post_images = $this->Post_Model->getPostImages($post_details->id);
                $post_details->images = $post_images;
                echo json_encode(array('status'=>1,'msg'=>'Post info', 'data' => $post_details));
                 die();   
                

                   
                
            }else{
                 echo json_encode(array('status'=>2,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));

    }

    /*Delete Exist Post Images*/
    public function delete_exit_post_image(){
        $this->adminAuthentication();
        $this->load->model(array('api/Post_Model'));
        $this->form_validation->set_rules('image_id','Image id','required');        
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){ 
            $image_id = $this->input->post('image_id');
            $query = $this->Admin_model->getCustomFields(Tables::POST_IMAGES,array('id'=>$image_id),'*');
            if($query->num_rows() > 0 ){
                $image_info = $query->row();
                $image_file_path = 'uploads/posts/'.$image_info->name;
                //echo $file_path ;
                if (file_exists($image_file_path)) {
                   unlink($image_file_path);
                }
                $this->Admin_model->delete_by_condition(Tables::POST_IMAGES,array('id'=>$image_info->id));
                echo json_encode(array('status'=>1,'msg'=>'Image deleted successfully'));
                 die();  
                
            }else{
                 echo json_encode(array('status'=>2,'msg'=>'Sorry Opps, Error occurred please try after some time.'));
                 die();
                
            }
           
        }
        else
            echo json_encode(array('status'=>2,'msg'=>validation_errors()));
    }

    /*View All Comments Related to Post*/
    public function get_all_comments($post_id, $post_type='post'){
        $this->adminAuthentication();
        $post_id = encrypt_decrypt('decrypt', $post_id);
        
        $this->load->model(array('api/Post_Model'));
        $post_details = $this->Post_Model->getAllPosts(array('id' => $post_id, 'post_type' => $post_type));
        if($post_details->num_rows() > 0){
            $post_info = $post_details->row(); 

            $post_images = $this->Post_Model->getPostImages($post_id);
            $post_comments = $this->Post_Model->getPostComments($post_id);
            $post_likes = $this->Post_Model->getPostLikes($post_id);
            $data = array('post_info' => $post_info, 'post_images' => $post_images, 'post_comments' => $post_comments, 'post_likes' => $post_likes);
            echo $this->load->view('admin/view_all_comments', $data);
        }
        else
            echo "No Data";
        //$this->Admin_model->getCustomFields(Tables::SPORTS,array(''),'id as sports_id,name as sports_name');
        
        
    }
    /*View All Comments Related to Post*/
    public function get_all_likes($post_id, $post_type='post'){
        $this->adminAuthentication();
        $post_id = encrypt_decrypt('decrypt', $post_id);
        
        $this->load->model(array('api/Post_Model'));
        $post_details = $this->Post_Model->getAllPosts(array('id' => $post_id, 'post_type' => $post_type));
        if($post_details->num_rows() > 0){
            $post_info = $post_details->row(); 

            $post_images = $this->Post_Model->getPostImages($post_id);
            $post_comments = $this->Post_Model->getPostComments($post_id);
            $post_likes = $this->Post_Model->getPostLikes($post_id);
            $data = array('post_info' => $post_info, 'post_images' => $post_images, 'post_comments' => $post_comments, 'post_likes' => $post_likes);
            echo $this->load->view('admin/view_all_likes', $data);
        }
        else
            echo "No Data";
        //$this->Admin_model->getCustomFields(Tables::SPORTS,array(''),'id as sports_id,name as sports_name');
        
        
    }
    /*Post Comments on Post*/
    public function post_comments(){
        $this->adminAuthentication();
        $this->form_validation->set_rules('message','Message','required');
        $this->form_validation->set_rules('post_id','Post id','required');
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){            
            $admin_user = $this->session->userdata('admin_user');
            $user_id = $admin_user->id;
            $this->Admin_model->save(Tables::POST_COMMENTS, array('post_id' => $this->input->post('post_id'), 'comments' => $this->input->post('message'), 'user_id' => $user_id, 'created_date' => date('Y-m-d H:i:s')));
            $user_query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$user_id),'id, first_name, last_name, email, contact_no, user_group, dob, gender, address, city, zip_code, country, nationality, status, parent_first_name, parent_last_name, parent_email, parent_contact_no, current_club, favourite_club, preferred_foot, height, profession, CASE WHEN profile_pic IS NOT NULL AND profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", id, "/", profile_pic) ELSE "" END as profile_pic, CASE WHEN professional_certificate IS NOT NULL AND professional_certificate != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", professional_certificate) ELSE "" END as professional_certificate, CASE WHEN letter_of_employment IS NOT NULL AND letter_of_employment != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", letter_of_employment) ELSE "" END as letter_of_employment , CASE WHEN id_card IS NOT NULL AND id_card != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", id_card) ELSE "" END as id_card');
            $data = array('comments' => $this->input->post('message'), 'comments_by' => 'Admin', 'profile_pic' => base_url('assets/images/profile.png'));
            if($user_query->num_rows() > 0 ){
                $user_info = $user_query->row();
                $data['comments_by'] = $user_info->first_name.' '.$user_info->last_name;
                
                if($user_info->profile_pic)
                    $data['profile_pic'] = $user_info->profile_pic;
            }

            echo json_encode(array('status'=>1,'msg'=>"Comment posted successfully", 'data' => $data));
        }
        else
            echo json_encode(array('status'=>2,'msg'=>'Please fill message.'));
    }
    /*Upload Media on temp*/
    public function upload_media() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') 
            redirect('/');
        if (!empty($_FILES)) {

            $folder_path = './uploads/temp/';

            

            $new_file_name = time() . mt_rand(10, 99);

            $config['upload_path'] = $folder_path;

            $config['allowed_types'] = 'gif|jpg|png|jpeg|svg|mp4|pdf';

            //$config['max_size'] = UPLOAD_IMAGE_SIZE;

            $config['file_name'] = $new_file_name;

            if (!is_dir(FCPATH . $folder_path)) {
                mkdir(FCPATH . $folder_path, 0777, true);
            }

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload('file')) {

                echo json_encode(array('status' => false, 'msg' => $this->upload->display_errors('', '')));

            } else {
                    $temp = ($this->session->userdata('images')) ? $this->session->userdata('images') : array();

                    $upload_data = $this->upload->data();

                    if (file_exists(FCPATH . $folder_path . $upload_data['file_name'])) {

                        array_push($temp, array('file_name' => $upload_data['file_name'], 'status' => 0));

                        $this->session->set_userdata('images', $temp);

                        echo json_encode(array('status' => true, 'filename' => $upload_data['file_name']));

                    }
            }

        } 
        else 
            echo json_encode(array('status' => false, 'filename' => '', 'msg' => 'Please select atleast one file'));
    }

    /*Upload Media on temp*/
    public function upload_profile_media() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') 
            redirect('/');
        if (!empty($_FILES)) {

            $folder_path = './uploads/temp/';

            

            $new_file_name = time() . mt_rand(10, 99);

            $config['upload_path'] = $folder_path;

            $config['allowed_types'] = 'gif|jpg|png|jpeg|svg';

            //$config['max_size'] = UPLOAD_IMAGE_SIZE;

            $config['file_name'] = $new_file_name;

            if (!is_dir(FCPATH . $folder_path)) {
                mkdir(FCPATH . $folder_path, 0777, true);
            }

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload('file')) {

                echo json_encode(array('status' => false, 'msg' => $this->upload->display_errors('', '')));

            } else {
                    $temp = ($this->session->userdata('profile_images')) ? $this->session->userdata('profile_images') : array();

                    $upload_data = $this->upload->data();

                    if (file_exists(FCPATH . $folder_path . $upload_data['file_name'])) {

                        array_push($temp, array('file_name' => $upload_data['file_name'], 'status' => 0));

                        $this->session->set_userdata('profile_images', $temp);

                        echo json_encode(array('status' => true, 'filename' => $upload_data['file_name']));

                    }
            }

        } 
        else 
            echo json_encode(array('status' => false, 'filename' => '', 'msg' => 'Please select atleast one file'));
    }
    /* Remove Gallery Image*/
    public function delete_temp_image(){
       
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {echo json_encode(['msg' => 'Invalid request method', 'status' => FALSE]);die;}
        $array = array();
        $image_name = $this->input->post('name');
        $image_array = $this->session->userdata('images');
        //print_r($image_array);die;
        if ($image_name && is_array($image_array)) {

            foreach ($image_array as $img) {

                if ($img['file_name'] == $image_name) {

                    $thumb = FCPATH . 'uploads/temp/' . $image_name;

                    @unlink($thumb);

                } 
                else 
                    array_push($array, $img);

            }
            $this->session->set_userdata('images', $array);
            echo json_encode(array('status' => 1, 'total' => count($this->session->userdata('images')), 'session_image' => $this->session->userdata('images'), 'image_name' => $array));

        }
        else
            echo json_encode(array('status' => 2, 'total' => count($this->session->userdata('images'))));
    }

    /* Remove Gallery Image*/
    public function delete_temp_profile_image(){
       
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {echo json_encode(['msg' => 'Invalid request method', 'status' => FALSE]);die;}
        $array = array();
        $image_name = $this->input->post('name');
        $image_array = $this->session->userdata('profile_images');
       
        if ($image_name) {

            foreach ($image_array as $img) {

                if ($img['file_name'] == $image_name) {

                    $thumb = FCPATH . 'uploads/temp/' . $image_name;

                    @unlink($thumb);

                } 
                else 
                    array_push($array, $img);

            }
            $this->session->set_userdata('profile_images', $array);
            echo json_encode(array('status' => 1, 'total' => count($this->session->userdata('profile_images')), 'session_image' => $this->session->userdata('profile_images'), 'image_name' => $array));

        }
        else
            echo json_encode(array('status' => 2, 'total' => count($this->session->userdata('profile_images'))));
    }





    /* delete user and mechanic*/
    public function delete_user($user_id='')
    {   if (empty($user_id)) {
            $user_id = $this->input->post('user_id');
        }     
        
        $user_id = encrypt_decrypt('decrypt', $user_id);
        $user_query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$user_id),'*');

        if ($user_query->num_rows()>0) {
            $user_info = $user_query->row();
            /*if($user_info->user_group == 1){
                $this->session->set_flashdata('error_msg','Invalid Request');
                echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
                return;
            }*/
            $this->db->trans_begin();
            $this->Admin_model->delete_by_condition(Tables::POST_COMMENTS, " user_id ='".$user_id."' OR post_id IN (SELECT id FROM ".Tables::POSTS." WHERE created_by = '".$user_id."')");
            $this->Admin_model->delete_by_condition(Tables::COACHING_ACADEMY_ENQUIRY, " user_id ='".$user_id."' OR post_id IN (SELECT id FROM ".Tables::POSTS." WHERE created_by = '".$user_id."')");
            $this->Admin_model->delete_by_condition(Tables::EVENTS_ENQUIRY, " user_id ='".$user_id."' OR event_id IN (SELECT id FROM ".Tables::EVENTS." WHERE user_id = '".$user_id."')");
            $this->Admin_model->delete_by_condition(Tables::EVENTS, array('user_id' => $user_id));

            $this->Admin_model->delete_by_condition(Tables::POST_LIKE, " user_id ='".$user_id."' OR post_id IN (SELECT id FROM ".Tables::POSTS." WHERE created_by = '".$user_id."')");
            $image_query = $this->Admin_model->getCustomFields(Tables::POST_IMAGES," post_id IN (SELECT id FROM ".Tables::POSTS." WHERE created_by='".$user_id."')", "*");
            $this->Admin_model->delete_by_condition(Tables::POST_FAVOURITE, " user_id ='".$user_id."' OR post_id IN (SELECT id FROM ".Tables::POSTS." WHERE created_by = '".$user_id."')");
            $get_shared_post_id = $this->db->query("SELECT group_concat(id) as ids FROM ".Tables::POSTS." WHERE created_by='".$user_id."'");
            
            if($get_shared_post_id->num_rows() > 0){

            	if(!is_null($get_shared_post_id->row()->ids)) {
	            	$shared_post_id = explode(",", $get_shared_post_id->row()->ids);
	            	//$this->Admin_model->delete_by_condition(Tables::POSTS, " shared_post_id IN (".implode(",",$shared_post_id).")");
                    $this->Admin_model->delete_by_condition(Tables::POST_COMMENTS, " post_id IN (".implode(",",$shared_post_id).")");
                    $this->Admin_model->delete_by_condition(Tables::COACHING_ACADEMY_ENQUIRY, " post_id IN (".implode(",",$shared_post_id).")");
                    
                    $this->Admin_model->delete_by_condition(Tables::POST_LIKE, " post_id IN (".implode(",",$shared_post_id).")");
                    
                    //$this->Admin_model->delete_by_condition(Tables::POST_FAVOURITE, " post_id IN (".implode(",",$shared_post_id).")");
                    $this->Admin_model->update(Tables::POST_FAVOURITE," shared_post_id IN (".implode(",",$shared_post_id).")",'shared_post_id=NULL');
                    $this->Admin_model->delete_by_condition(Tables::MY_POST," post_id IN (".implode(",",$shared_post_id).")");
            	}
            }
            if ($image_query->num_rows()>0) {
                foreach ($image_query->result() as $image) {
                    $image_file_path = 'uploads/posts/'.$image->name;
                    //echo $file_path ;
                    if (file_exists($image_file_path)) {
                       unlink($image_file_path);
                    }
                    $this->Admin_model->delete_by_condition(Tables::POST_IMAGES,array('id'=>$image->id));
                }
            }
            $this->Admin_model->delete_by_condition(Tables::POSTS, array('created_by' => $user_id));
            $this->Admin_model->delete_by_condition(Tables::MY_POST, array('user_id' => $user_id));
            //$this->Admin_model->delete_by_condition(Tables::POSTS, array('created_by' => $user_id));
            $this->Admin_model->delete_by_condition(Tables::USER_FOLLOWER, 'follower_id = '.$user_id.' OR following_id = '.$user_id);
            $this->Admin_model->delete_by_condition(Tables::USER, array('id' => $user_id));
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->session->set_flashdata('success_msg','Please try again, Something is wrong.');
                echo json_encode(array('status'=>true,'message'=>'Please try again, Something is wrong.'));
                return;
                
            
            }
            else{
                $this->db->trans_commit();
                $this->session->set_flashdata('success_msg','User deleted successfully');
                echo json_encode(array('status'=>true,'message'=>'User deleted successfully'));
                return; 
            }

        }
        else {
            $this->session->set_flashdata('error_msg','Invalid Request');
            echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
            return; 
        }
        

    }

    public function change_profile_status(){
        $user_id = $this->input->post('user_id');
        $status = $this->input->post('status');
        $user_id = encrypt_decrypt('decrypt', $user_id);
        $user_query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$user_id),'*');
        if ($user_query->num_rows()>0) {
            $user_info = $user_query->row();
            if($user_info->user_group == 1){
                $this->session->set_flashdata('error_msg','Invalid Request');
                echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
                return;
            }
            $this->Admin_model->update(Tables::USER, array('id' => $user_id), array('status' => $status,'isseen'=>2,'updated_date'=>date('Y-m-d H:i:s')));
            $success_msg = "";
            if($status == 1){
                $this->send_approve_mail($user_info);               
                $load['title']  = SITE_TITLE;
                $load['msg']    = 'Your account is approved by admin';
                $load['action'] = 'PENDING';                                 
                $token = $user_info->fcm_token;                        
                $this->common->android_push($token, $load);
                $success_msg = "User account approved now.";
            }
            else if($status == 2){
                $this->send_unapprove_mail($user_info);
                $success_msg = "User account unapproved.";
            }
            else if($status == 4){
                $this->send_suspend_mail($user_info);
                $success_msg = "User account suspended.";

            }

            $this->session->set_flashdata('success_msg', $success_msg);
            echo json_encode(array('status'=>true,'message'=> $success_msg));


        }
        else {
            $this->session->set_flashdata('error_msg','Invalid Request');
            echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
            return; 
        }
    }
	

	
	/* Get user list  */
	public function users()
	{
		$this->adminAuthentication();
        $data['css_array']       = $this->config->config['user_css'];
        $data['js_array']        = $this->config->config['user_js'];
		$config = array();
        $filter_data = $this->input->get();        
        if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/users";
        $config["total_rows"] = $this->Admin_model->get_user_list($filter_data,NULL,NULL)->num_rows();       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        $data["result"] =$this->Admin_model->get_user_list( $filter_data,$config["per_page"],$page)->result(); 

		$data['title'] 			 ='User List '.SITE_TITLE;
		$data['keyword'] 		 ='User List '.SITE_TITLE;
		$data['description'] 	 ='User List '.SITE_TITLE;
		$data['content']		 ='admin/users';
		echo Modules::run('template/admin_template',$data);
	}

    /*Load Event Modal*/
    public function get_event_modal(){
        $this->adminAuthentication();
        $get_data = $this->input->get();
        if(isset($get_data['event_id']) && !empty($get_data['event_id'])) {
            $event_id = encrypt_decrypt('decrypt', $get_data['event_id']);
            $category_data   =  $this->Admin_model->getCustomFields(Tables::EVENTS, array('id' => $event_id),'id as event_id,event_name, event_date, event_description, location, latitude, longitude,postal_code');
            if($category_data->num_rows() > 0) {
                $categoryData = $category_data->row();
                $get_data = $categoryData;
            }
        }
        echo $this->load->view('admin/event_modal', $get_data);
    }

    /* Add Events */
    public function add_events(){
        $this->adminAuthentication();
        $this->form_validation->set_rules('event_name','Event name','required');
        $this->form_validation->set_rules('event_location','Event location','required');
        $this->form_validation->set_rules('event_description','Event description','required');
        $this->form_validation->set_error_delimiters('<div class="text-danger">', '</div>');
        if($this->form_validation->run()==TRUE){            
            $event_id   = $this->input->post('event_id');
            $post_data = $this->input->post();
            if($event_id)
                $event_id = encrypt_decrypt('decrypt', $event_id);
            $admin_user = $this->session->userdata('admin_user');            
            $user_id = $admin_user->id;
            $data_array = array(
                'event_name' => $this->input->post('event_name'),
                'location' => $this->input->post('event_location'),
                'event_description' => $this->input->post('event_description'),
                'user_id' => $user_id,
                'status'     => 1,
                'updated_date' => date('Y-m-d H:i:s')
            );
            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
                $data_array['latitude'] = $post_data['latitude'];
                $data_array['longitude'] =  $post_data['longitude'];
            }

            if(isset($post_data['event_date']) && !empty($post_data['event_date'])){
                $data_array['event_date'] = date('Y-m-d', strtotime($post_data['event_date']));
            }
            if(isset($post_data['postal_code']) && !empty($post_data['postal_code'])){
                $data_array['postal_code'] = $post_data['postal_code'];
            }
            
            if($event_id){
                $add_category = $this->Admin_model->update(Tables::EVENTS, array('id' => $event_id),$data_array);            
            }
            else{
                $data_array['created_date'] = date('Y-m-d H:i:s');
                $add_category = $this->Admin_model->Save(Tables::EVENTS,$data_array);
            }
            
            echo json_encode(array('status'=>1,'msg'=>($event_id) ? "Updated Successfully" : "Added Successfully"));
        }
        else
            echo json_encode(array('status'=>2,'msg'=>'Please fill category name.'));
    }

    /* Get Event list  */
    public function events()
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['event_css'];
        $data['js_array']        = $this->config->config['event_js'];

        $config = array();
        $filter_data = $this->input->get();
        $this->load->model(array('api/Event_Model'));
       /* if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;*/
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/events";
        $config["total_rows"] = $this->Event_Model->totalEventCount($filter_data)->row()->total_count;
       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        $data["result"] =$this->Event_Model->getAllEvents( $filter_data,$page, $config["per_page"])->result(); 
        
        $data['title']           ='Event List '.SITE_TITLE;
        $data['keyword']         ='Event List '.SITE_TITLE;
        $data['description']     ='Event List '.SITE_TITLE;
        $data['content']         ='admin/events';
        echo Modules::run('template/admin_template',$data);
    }

    public function delete_events(){
        $event_id = $this->input->post('event_id');
        $event_id = encrypt_decrypt('decrypt', $event_id);
        $user_query = $this->Admin_model->getCustomFields(Tables::EVENTS,array('id'=>$event_id),'*');
        if ($user_query->num_rows()>0) {
            $user_info = $user_query->row();
            if($user_info->user_group == 1){
                $this->session->set_flashdata('error_msg','Invalid Request');
                echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
                return;
            }
            $this->db->trans_begin();
            $this->Admin_model->delete_by_condition(Tables::EVENTS_ENQUIRY, array('event_id' => $event_id));
            $this->Admin_model->delete_by_condition(Tables::EVENTS, array('id' => $event_id));
            if ($this->db->trans_status() === FALSE) {
                $this->db->trans_rollback();
                $this->session->set_flashdata('success_msg','Please try again, Something is wrong.');
                echo json_encode(array('status'=>true,'message'=>'Please try again, Something is wrong.'));
                return;
                
            
            }
            else{
                $this->db->trans_commit();
                $this->session->set_flashdata('success_msg','Event deleted successfully');
                echo json_encode(array('status'=>true,'message'=>'Event deleted successfully'));
                return; 
            }

        }
        else {
            $this->session->set_flashdata('error_msg','Invalid Request');
            echo json_encode(array('status'=>true,'message'=>'Invalid Request'));
            return; 
        }
    }

    /*Download User Documents*/
    public function download_doc($user_id){
        $user_id = encrypt_decrypt('decrypt', $user_id);
        $support_documents = $this->Admin_model->getCustomFields(Tables::USER,array('id' => $user_id),'*');
        if($support_documents->num_rows() > 0 ){
            $files = array();
            
            $userInfo = $support_documents->row();
            if($userInfo->professional_certificate){
                //copy('./uploads/documents/'.$userInfo->professional_certificate, $userInfo->professional_certificate);
                array_push($files, $userInfo->professional_certificate);
            }
            if($userInfo->letter_of_employment){
               // copy('./uploads/documents/'.$userInfo->letter_of_employment, $userInfo->letter_of_employment);
                array_push($files, $userInfo->letter_of_employment);
            }
            if($userInfo->id_card){
               // copy('./uploads/documents/'.$userInfo->id_card, $userInfo->id_card);
                array_push($files, $userInfo->id_card);
            }
            if(count($files) > 0 ) {   
                           
                //$zipname = $userInfo->first_name.'_documents.zip';
                $createdzipname = $userInfo->first_name;
                $this->load->library('zip');
                $this->load->helper('download');
        

                // create new folder 
                $this->zip->add_dir('documents');

                foreach ($files as $file) {
                    $paths = base_url('uploads/documents/'.$userInfo->id.'/'.$file);
                    // add data own data into the folder created
                    $this->zip->add_data('documents/'.$file,file_get_contents($paths));    
                }
                $this->zip->download($createdzipname.'.zip');
                /*$zip = new ZipArchive;
                $zip->open($zipname, ZipArchive::CREATE);
                foreach ($files as $file) {
                  
                  $zip->addFile($file);
                }
                $zip->close();
                header('Content-Type: application/zip');
                header('Content-disposition: attachment; filename='.$zipname);
                header('Content-Length: ' . filesize($zipname));
                readfile($zipname);
                unlink($zipname);
                if($userInfo->professional_certificate){
                    if(file_exists($userInfo->professional_certificate))
                        unlink($userInfo->professional_certificate);
                }
                if($userInfo->letter_of_employment){
                    if(file_exists($userInfo->letter_of_employment))
                        unlink($userInfo->letter_of_employment);
                }
                if($userInfo->id_card){
                    if(file_exists($userInfo->id_card))
                        unlink($userInfo->id_card);
                }*/
            }
            else{
                $this->session->set_flashdata('error_msg','No documents available');
                redirect('admin/users');
            }

            
        }
        else{
            $this->session->set_flashdata('error_msg','No documents available');
             redirect('admin/users');
        }


    }

    /*View Upload Documents*/
    public function view_upload_documents($user_id){
        $user_id = encrypt_decrypt('decrypt', $user_id);
        $support_documents = $this->Admin_model->getCustomFields(Tables::USER,array('id' => $user_id),'*');
        if($support_documents->num_rows() > 0 ){
            $files = array();            
            $userInfo = $support_documents->row();
            $get_data['user_info'] = $userInfo; 
            echo $this->load->view('admin/view_document_modal', $get_data);

            
        }
        else{
            $get_data['user_info'] = new stdClass(); 
            echo $this->load->view('admin/view_document_modal', $get_data);
        }
    }

    /*View Upload Documents*/
    public function view_user_detail($user_id){
        $user_id = encrypt_decrypt('decrypt', $user_id);
        $support_documents = $this->Admin_model->get_user_profile($user_id);
       
        if($support_documents->num_rows() > 0 ){          
            
            $userInfo = $support_documents->row();
            $get_data['user_info'] = $userInfo;
            
            echo $this->load->view('admin/view_user_detail', $get_data);

            
        }
        
    }
    


    /* Get Coaching Academy Enquiry list  */
    public function enquiry()
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['event_css'];
        $data['js_array']        = $this->config->config['event_js'];

        $config = array();
        $filter_data = $this->input->get();
        
       /* if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;*/
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/enquiry";
        $config["total_rows"] = $this->Admin_model->totalEnquiryCount($filter_data)->row()->total_count;
       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        
        $data["result"] =$this->Admin_model->getAllEnquiry( $filter_data,$config["per_page"], $page)->result(); 
        
        $data['title']           ='Coaching Academy Link Contact List '.SITE_TITLE;
        $data['keyword']         ='Coaching Academy Link Contact List '.SITE_TITLE;
        $data['description']     ='Coaching Academy Link Contact List '.SITE_TITLE;
        $data['content']         ='admin/coaching_academy_enquiry';
        echo Modules::run('template/admin_template',$data);
    }

    /* Get Event Participant list  */
    public function events_participant()
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['event_css'];
        $data['js_array']        = $this->config->config['event_js'];

        $config = array();
        $filter_data = $this->input->get();
        
       /* if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;*/
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/events_participant";
        $config["total_rows"] = $this->Admin_model->totalEventsParticipantCount($filter_data)->row()->total_count;
       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        
        $data["result"] =$this->Admin_model->getAllEventsParticipant($filter_data,$config["per_page"], $page)->result(); 
        
        $data['title']           ='Event Participant List '.SITE_TITLE;
        $data['keyword']         ='Event Participant List '.SITE_TITLE;
        $data['description']     ='Event Participant List '.SITE_TITLE;
        $data['content']         ='admin/event_participant';
        echo Modules::run('template/admin_template',$data);
    }
   
    


	public function logout() {

        $this->session->sess_destroy();

        redirect($this->config->base_url(), 'refresh');
    }



    /* get user detail */
    public function getUser() {
        $this->adminAuthentication();
        $res['post'] = $this->Admin_model->get_user_detail($this->input->post("user_id"))->row_array();       
        $this->load->view('admin/edit_user', $res);
    }



    public function settings(){
        $this->adminAuthentication();  
        $settings = $this->Admin_model->get_settings(); 
        $data['settings'] = $settings; 
        $data['css_array']   = $this->config->config['settings_css'];
        $data['js_array']    = $this->config->config['settings_js'];   
        $data['title']       = 'Settings - '.DEFAULT_SITE_TITLE;
        $data['description'] = 'Settings - '.DEFAULT_SITE_TITLE;
        $data['content']     =   'admin/settings_view';
        
        echo Modules::run('template/admin_template', $data);
        
        
    }

    public function update_settings(){
        $this->adminAuthentication(); 
        $settings = $this->Admin_model->get_settings(array('option_name' => 'logo_settings'));
        $logo_settings = array();
        if($settings->num_rows()) {
            $logo_settings = ($settings->row()->option_value) ? unserialize($settings->row()->option_value): array();
        } 
        $distance = $this->input->post('distance[]');
        $distance = array_filter($distance, function($value) { return !is_null($value) && $value !== ''; });   
        if(count($distance) == 0){
            $this->session->set_flashdata('error_msg', "Distance field required!");
            redirect('admin/settings');
            exit();
        }      
        $data_array = array(
            'option_value' => serialize($distance),
            'modified_date' => date('Y-m-d H:i:s')
        );
        
        $this->Admin_model->update(Tables::OPTIONS, array('option_name' => 'distance_settings'), $data_array);
        if(isset($_FILES['dark_logo']['name']) && !empty($_FILES['dark_logo']['name'])){
            $folder_path = './uploads/logo/';          

            $new_file_name = time() . mt_rand(10, 99);

            $config['upload_path'] = $folder_path;

            $config['allowed_types'] = 'gif|jpg|png|jpeg|svg|mp4|pdf';

            //$config['max_size'] = UPLOAD_IMAGE_SIZE;

            $config['file_name'] = $new_file_name;

            if (!is_dir(FCPATH . $folder_path)) {
                mkdir(FCPATH . $folder_path, 0777, true);
            }

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('dark_logo')) {
                
                $upload_data = $this->upload->data();
                if(isset($logo_settings['dark_logo']) && !empty($logo_settings['dark_logo']))
                    @unlink($folder_path.$logo_settings['dark_logo']);
                $logo_settings['dark_logo'] = $upload_data['file_name'];
                    
            }
        }
        if(isset($_FILES['light_logo']['name']) && !empty($_FILES['light_logo']['name'])){
            $folder_path = './uploads/logo/';          

            $new_file_name = time() . mt_rand(10, 99);

            $config['upload_path'] = $folder_path;

            $config['allowed_types'] = 'gif|jpg|png|jpeg|svg|mp4|pdf';

            //$config['max_size'] = UPLOAD_IMAGE_SIZE;

            $config['file_name'] = $new_file_name;

            if (!is_dir(FCPATH . $folder_path)) {
                mkdir(FCPATH . $folder_path, 0777, true);
            }

            $this->load->library('upload', $config);

            if ($this->upload->do_upload('light_logo')) {
                
                $upload_data = $this->upload->data();
                if(isset($logo_settings['light_logo']) && !empty($logo_settings['light_logo']))
                    @unlink($folder_path.$logo_settings['light_logo']);
                $logo_settings['light_logo'] = $upload_data['file_name'];
                    
            }
        }
        $active_logo = $this->input->post('active_logo');
        $logo_settings['active_logo'] = (isset($active_logo) && !empty($active_logo)) ? $active_logo : 1;
        $data_array = array(
            'option_value' => serialize($logo_settings),
            'modified_date' => date('Y-m-d H:i:s')
        );
        $this->Admin_model->update(Tables::OPTIONS, array('option_name' => 'logo_settings'), $data_array);
        
        $this->session->set_flashdata('success_msg', "Setting updated successfully");
        redirect('admin/manage_data');
        
        
    }

    public function color_setting($value='')
    {
       if ($_SERVER["REQUEST_METHOD"] == "POST") {
           $post_data = $this->input->post();
           //Array ( [id] => Array ( [0] => 1 [1] => 2 ) [active_logo] => Array ( [0] => 1 ) )
           //print_r($post_data);
           for ($i=0; $i <count($post_data['id']) ; $i++) { 
            if ($post_data['id'][$i]==$post_data['status']) {
                $arr = array('status'=>1);
            }else{
                $arr = array('status'=>2);
            }
               $this->Admin_model->update(Tables::COLOR,array('id'=>$post_data['id'][$i]), $arr);
                echo $this->db->last_query();
           }
           $this->session->set_flashdata('success_msg','Record is updated successfully.');
           redirect('admin/color_setting');
       }else{
            $this->adminAuthentication();  
            $query = $this->Admin_model->getCustomFields(Tables::COLOR,'1=1','id,color,status');
           
            $data['settings'] = $query; 
            $data['css_array']   = $this->config->config['settings_css'];
            $data['js_array']    = $this->config->config['settings_js'];   
            $data['title']       = 'Settings - '.DEFAULT_SITE_TITLE;
            $data['description'] = 'Settings - '.DEFAULT_SITE_TITLE;
            $data['content']     =   'admin/color_setting';        
            echo Modules::run('template/admin_template', $data);
        }
    }
    /* change password */
    public function change_password($value='')
    {
         $this->adminAuthentication(); 
        $this->form_validation->set_rules('current_password','Current Password','required|min_length[5]|callback_check_current_password');
        $this->form_validation->set_rules('new_password','New Password','required|min_length[5]');
        $this->form_validation->set_rules('confirm_password','Confirm Password','required|min_length[5]|matches[new_password]');
        $this->form_validation->set_error_delimiters('<span class="text-danger">','</span>');
        if ($this->form_validation->run()==false) {
            $data['css_array']       = $this->config->config['upload_video_css'];
            $data['js_array']        = $this->config->config['upload_video_js'];   
            $data['title']       = 'Change Password - '.DEFAULT_SITE_TITLE;
            $data['description'] = 'Change Password - '.DEFAULT_SITE_TITLE;
            $data['content']     = 'admin/change_password';        
            echo Modules::run('template/admin_template', $data);
        }else{
           //print_r($_POST);die;
            $affected_row = $this->Admin_model->update(Tables::USER,array('id'=>$this->session->userdata('admin_user')->id),array('password'=>md5($this->input->post('confirm_password'))));
            if ($affected_row) {
                $this->session->set_flashdata('success_msg','Password has been changed');
                $this->session->set_userdata("admin_user", array());
                redirect('admin/login');
            }else{
                $this->session->set_flashdata('error_msg','Error occurred, Please try after some time');
                redirect('admin/change_password');
            }
            
        }
        
    }
    /* check current password */
    public function check_current_password()
    {
        $query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$this->session->userdata('admin_user')->id),'password');
        if ($query->num_rows()>0) {
            $row = $query->row();
            if ($row->password==md5($this->input->post('current_password'))) {
               return true;
            }else{
                $this->form_validation->set_message('check_current_password','Old password do not match');
                return FALSE;
            }
        }
    }

    /* Get user list  */
    public function sub_admin()
    {
        $this->adminAuthentication();
        $data['css_array']       = $this->config->config['sub_admin_css'];
        $data['js_array']        = $this->config->config['sub_admin_js'];
        $config = array();
        $filter_data = $this->input->get();        
        if(!isset($filter_data['status']) || empty($filter_data['status']))
            $filter_data['status'] = 1;
        $data['filter_data'] = $filter_data;
        $config["base_url"] = $this->config->base_url() . "admin/users";
        $config["total_rows"] = $this->Admin_model->get_admin_list($filter_data,NULL,NULL)->num_rows();       
        $config["per_page"] = 20;
        $config['query_string_segment'] = 'page';
        $this->pagination->initialize($config);
        $data["links"] = $this->pagination->create_links();
        $page = (isset($_GET['page']) && intval($_GET['page'])) ? $_GET['page'] : 0;
        $current_page = $page;
        $page = ($page)? (($page-1)*$config["per_page"]) : 0;
        $data["result"] =$this->Admin_model->get_admin_list( $filter_data,$config["per_page"],$page)->result(); 

        $data['title']           ='Admin List '.SITE_TITLE;
        $data['keyword']         ='Admin List '.SITE_TITLE;
        $data['description']     ='Admin List '.SITE_TITLE;
        $data['content']         ='admin/admin_list';
        echo Modules::run('template/admin_template',$data);
    }

    /*View Upload Documents*/
    public function add_user($id=''){ 
        if (!empty($id)){
            $query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>encrypt_decrypt('decrypt',$id)),'*');
            if ($query->num_rows()>0) {
                $data['users'] = $query->row();
                echo $this->load->view('admin/add_sub_admin', $data);
            }else{
                echo $this->load->view('admin/add_sub_admin', array());
            }
            
        }else{   
            echo $this->load->view('admin/add_sub_admin', array()); 
        }        
    }

    /*View Upload Documents*/
    public function save_user(){  
        
         if (!empty($this->input->post('user_id'))) {
             $this->form_validation->set_rules('name','Name','required');
             $this->form_validation->set_rules('email','Email','required');             
             $this->form_validation->set_error_delimiters('','');
             if ($this->form_validation->run()==FALSE) {
               
                $error ='';
                if (form_error('name')) {
                    $error=form_error('name');
                }else if(form_error('email')){
                    $error=form_error('email');
                }
                echo json_encode(array('status'=>false,'message'=>$error));
             }else{
                
                $arr = array(
                    'first_name'=>$this->input->post('name'),
                    'email'=>$this->input->post('email'),                    
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                $id = $this->Admin_model->update(Tables::USER,array('id'=>$this->input->post('user_id')),$arr);
                if ($id) {
                    //$query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$id),'first_name,email');
                    //$this->send_password_mail($query->row(),$this->input->post('password'));
                    echo json_encode(array('status'=>true,'message'=>'Sub admin user account updated successfully'));
                }else{
                    echo json_encode(array('status'=>false,'message'=>'Error occurred, Please try after some time'));
                }
            }
         }else{
             $this->form_validation->set_rules('name','Name','required');
             $this->form_validation->set_rules('email','Email','required');
             $this->form_validation->set_rules('password','Password','required');
             $this->form_validation->set_rules('conf_password','Confirm Password','required|matches[password]');
             $this->form_validation->set_error_delimiters('','');
             if ($this->form_validation->run()==FALSE) {
               
                $error ='';
                if (form_error('name')) {
                    $error=form_error('name');
                }else if(form_error('email')){
                    $error=form_error('email');
                }else if(form_error('password')){
                    $error=form_error('password'); 
                }else if(form_error('conf_password')){
                     $error=form_error('conf_password');
                }
                echo json_encode(array('status'=>false,'message'=>$error));
             }else{
                
                $arr = array(
                    'first_name'=>$this->input->post('name'),
                    'email'=>$this->input->post('email'),
                    'password'=>md5($this->input->post('password')),
                    'user_group'=>1,
                    'status'=>1,
                    'created_date'=>date('Y-m-d H:i:s'),
                    'updated_date'=>date('Y-m-d H:i:s'),
                );
                $id = $this->Admin_model->save(Tables::USER,$arr);
                if ($id) {
                    $query = $this->Admin_model->getCustomFields(Tables::USER,array('id'=>$id),'first_name,email');
                    $this->send_password_mail($query->row(),$this->input->post('password'));
                    echo json_encode(array('status'=>true,'message'=>'Sub admin user account created successfully'));
                }else{
                    echo json_encode(array('status'=>false,'message'=>'Error occurred, Please try after some time'));
                }
            }
        }
    }

    public function delete_admin_user($id='')
    {
        $this->Admin_model->delete_by_condition(Tables::USER,array('id'=>encrypt_decrypt('decrypt',$id)));
        echo json_encode(array('status'=>true,'message'=>'Sub admin user account deleted successfully'));
    }
    
}