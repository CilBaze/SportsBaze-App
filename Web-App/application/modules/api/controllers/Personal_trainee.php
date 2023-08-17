
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Personal_trainee extends BD_Controller {
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

    /* get trainee detail */
    public function get_trainee_detail_get($value='')
    {
        $filter_post = $this->input->get();
        $per_page = 20;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $post_filter['keywords'] = $filter_post['keywords'];   
           
        $getAllPosts = $this->Post_Model->get_trainee($post_filter, $offset, $per_page);
        $getTotalPosts = $this->Post_Model->get_total_trainee($post_filter);
        //$result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $getTotalPosts->num_rows(), 'totalPages' => ceil($getTotalPosts->num_rows()/$per_page), 'records' => array());
        if ( $getAllPosts->num_rows()) {
            $trainee_arr =array();
            foreach ($getAllPosts->result() as $value) { 
                if($value->id){                    
                    $post_images = $this->Post_Model->get_trainee_image($value->id);
                }else{                    
                    $post_images = array();
                }  
                $value->post_images = $post_images;
                $value->total_images = count($post_images);              
                array_push($resultSet['records'], $value);
               
                
               
            }
            $this->set_response(['status'=>true,'message'=>'','data'=> $resultSet,],REST_Controller::HTTP_OK); 
        }else{
            $this->set_response(['status'=>false,'message'=>'Trainee is not avilable'],REST_Controller::HTTP_OK); 
        }
    }

    /* save trainee session */
    public function save_session_post($value='')
    {
        if (empty($this->input->post('trainee_id'))) {
            $this->set_response(['status'=>false,'message'=>'Trainee is required','data'=> $resultSet,],REST_Controller::HTTP_OK);
        }
        $post_data= $this->input->post();
        
        $session_arr = array(
            'trainee_id'=>$this->input->post('trainee_id'),
            'user_id'=>$this->user_data->id,
            'name'=>$this->input->post('name'),
            'date'=>date('Y-m-d',strtotime($this->input->post('date'))),
            'time'=>date('H:i:s',strtotime($this->input->post('time'))),
            'type'=>$this->input->post('type'),
            'meeting_link'=>$this->input->post('meeting_link'),
            /*'zoom_link'=>$this->input->post('zoom_link'),
            'skype_link'=>$this->input->post('skype_link'),*/
            'profile_name'=>$this->input->post('profile_name'),
            'status'=>1,
            'created_date'=>date('Y-m-d H:i:s'),
            'updated_date'=>date('Y-m-d H:i:s'),
        );
        $session_id = $this->Post_Model->save(Tables::TRAINEE_SESSION,$session_arr);
        if ($session_id) {
            $trainee_arr = $this->Post_Model->getCustomFields(Tables::TRAINEE,array('id'=>$this->input->post('trainee_id')),'id,title,email');
            $post_data['title']=$trainee_arr->row()->title;
            $post_data['email']=$trainee_arr->row()->email;
            $this->send_mail_trainer($post_data);
            $this->set_response(['status'=>true,'message'=>'Data is saved successfully'],REST_Controller::HTTP_OK);
        }else{
            $this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
        }
    }

    /* get profile */
    public function get_profile_get()
    {      
        $trainee_id = $this->input->get('trainee_id');
        $getAllPosts = $this->Post_Model->getCustomFields(Tables::TRAINEE,array('id'=>$trainee_id),'id,title,speciality,skill,experience,rating,description,IFNULL(profile_pic,"") as profile_pic');
      
        if ($getAllPosts->num_rows()) {
            $value = $getAllPosts->row();            
            if($value->id){  
            $post_image =array();                  
                $post_images = $this->Post_Model->get_trainee_image($trainee_id);
                foreach ($post_images as $key => $row) {
                   $post_image[] =array(
                    'name'=>$row->name,
                    'image_id'=>$row->image_id,
                    'thumbnail_image_url'=>$row->thumbnail_image_url,
                    'total_images'=>count($post_images),
                   );
                }
            }else{                    
                $post_images = array();
            }  
            $value->post_images = $post_image;
            $value->base_url = base_url('uploads/profile_pic/'.$trainee_id);
            //$value->total_images = count($post_images);              
            //array_push($resultSet['records'], $value);
            $this->set_response(['status'=>true,'message'=>'','data'=>  $value,],REST_Controller::HTTP_OK); 
        }else{
            $this->set_response(['status'=>false,'message'=>'Trainee is not avilable'],REST_Controller::HTTP_OK); 
        }
    }


    

}
