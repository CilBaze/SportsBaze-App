
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Event extends BD_Controller {
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->auth();
        $this->load->model(array('api/Event_Model'));
        $this->load->library(array('common/common'));
        //$this->user_data->id
    }

    /* Create Event */
    public function create_post($post_type = 'post')
    {
        $check_suspend_account = $this->Event_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('event_name','Event Name','required');
        $this->form_validation->set_rules('event_description','Event Description','required');
        $this->form_validation->set_rules('location','Event Location','required');
        $this->form_validation->set_rules('postal_code','Post Code','required');
        
        
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            
                $error_message=array(
                    
                    'event_name'=>form_error('event_name'),
                    'event_description'=>form_error('event_description'),
                    'location'=>form_error('location'),

                );  
            
                    
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_data = $this->input->post();
            
            $post_detail  = array(
                'user_id' => $this->user_data->id,
                'event_description' => @$this->input->post('event_description'),
                'event_name' => @$this->input->post('event_name'),
                'location' => @$this->input->post('location'),                
                'status' => 1,
                'postal_code' => @$this->input->post('postal_code'),
                'created_date' =>date('Y-m-d H:i:s'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );  
            
            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
            	$post_detail['latitude'] = $post_data['latitude'];
            	$post_detail['longitude'] =  $post_data['longitude'];
            }

            if(isset($post_data['event_date']) && !empty($post_data['event_date'])){
                $post_detail['event_date'] = date('Y-m-d', strtotime($post_data['event_date']));
            }
               
            $event_id = $this->Event_Model->save(Tables::EVENTS, $post_detail);
            
            if($event_id) {

                
                                      
                $this->set_response(['status'=>true,'message'=>'Event created successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }

    /*Get Event List*/

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
        if(isset($filter_post['latitude']) && !empty($filter_post['latitude']))
            $post_filter['latitude'] = $filter_post['latitude'];
        if(isset($filter_post['longitude']) && !empty($filter_post['longitude']))
            $post_filter['longitude'] = $filter_post['longitude'];
        if(isset($filter_post['distance']) && !empty($filter_post['distance']))
            $post_filter['distance'] = $filter_post['distance'];
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $post_filter['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['event_date']) && !empty($filter_post['event_date']))
            $post_filter['event_date'] = $filter_post['event_date'];
        $getAllEvents = $this->Event_Model->getAllEvents($post_filter, $offset, $per_page);
        $getTotalPosts = $this->Event_Model->totalEventCount($post_filter);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllEvents->num_rows() > 0 ){
            $resultSet['records'] = $getAllEvents->result();
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK); 

    }

    /**Get User Events*/
    public function my_feed_get($post_type = 'post')
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
        $post_filter = array('post_type' => $post_type, 'user_id' => $user_id);
        //$post_filter = array('status' => 1, 'post_type' => $post_type);
        if(isset($filter_post['latitude']) && !empty($filter_post['latitude']))
            $post_filter['latitude'] = $filter_post['latitude'];
        if(isset($filter_post['longitude']) && !empty($filter_post['longitude']))
            $post_filter['longitude'] = $filter_post['longitude'];
        if(isset($filter_post['distance']) && !empty($filter_post['distance']))
            $post_filter['distance'] = $filter_post['distance'];
        if(isset($filter_post['keywords']) && !empty($filter_post['keywords']))
            $post_filter['keywords'] = $filter_post['keywords'];
        if(isset($filter_post['event_date']) && !empty($filter_post['event_date']))
            $post_filter['event_date'] = $filter_post['event_date'];

        $getAllEvents = $this->Event_Model->getAllEvents($post_filter, $offset, $per_page);
        $getTotalPosts = $this->Event_Model->totalEventCount($post_filter);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllEvents->num_rows() > 0 ){
            $resultSet['records'] = $getAllEvents->result();
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK); 

    }

    /*Event Participate Form*/
    public function participate_post(){
        $this->load->helper('phpmailer');
        $check_suspend_account = $this->Event_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $this->form_validation->set_rules('event_id','Post Id','required');
        $this->form_validation->set_rules('first_name','First name','required');
        $this->form_validation->set_rules('email','Email','required');
        $this->form_validation->set_rules('contact_no','Contact no','required');
        $this->form_validation->set_rules('message','Message','required');
        $this->form_validation->set_error_delimiters('','');
        $error = "";
        if ($this->form_validation->run()==false) {
            if (form_error('event_id')) 
               $error = form_error('event_id');
            else if(form_error('message'))
                $error = form_error('message');
            else if (form_error('first_name')) 
               $error = form_error('first_name');
            else if(form_error('email'))
                $error = form_error('email');
            else if(form_error('contact_no'))
                $error = form_error('contact_no');
            
            $error_message=array(
                
                'event_id'=>form_error('event_id'),
                'message'=>form_error('message'),
                'first_name'=>form_error('first_name'),
                'email'=>form_error('email'),
                'contact_no'=>form_error('contact_no'),

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $event_id = $this->input->post('event_id');
            $post_data = $this->input->post();
            $post_detail = $this->Event_Model->getCustomFields(Tables::EVENTS,array('id' => $event_id), "*");

            if($post_detail->num_rows() > 0 ) {
                $post_info = $post_detail->row();
                
                $this->Event_Model->save(Tables::EVENTS_ENQUIRY, array(
                    'event_id' => $event_id,
                    'user_id' => $this->user_data->id,
                    'first_name' => @$post_data['first_name'],
                    'last_name' => @$post_data['last_name'],
                    'email'     => @$post_data['email'],
                    'contact_no' => @$post_data['contact_no'],
                    'message' => @$post_data['message']

                ));
                //$this->sendEmail("mohdarshad3@gmail.com", "Enquiry - ".$post_info->title, $contentHtml);
                $this->set_response(['status'=>true,'message'=>'Thank you for contacting us.', 'data' => array()],REST_Controller::HTTP_OK);
            }
            else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Invalid post id.'));
            }
             
        }
    
    }
    /*Update Events Info*/
    public function updateitem_post($post_type = 'post')
    {
        //$this->form_validation->set_rules('description','Description','required');
        $check_suspend_account = $this->Event_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $user_id = $this->user_data->id;
        $this->form_validation->set_rules('event_id','Event id','required');
        $this->form_validation->set_rules('event_name','Event Name','required');
        $this->form_validation->set_rules('event_description','Event Description','required');
        $this->form_validation->set_rules('location','Event Location','required');
        $this->form_validation->set_rules('postal_code','Postal Code','required');
        
        
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            
                $error_message=array(
                    'event_id' =>form_error('event_id'),
                    'event_name'=>form_error('event_name'),
                    'event_description'=>form_error('event_description'),
                    'location'=>form_error('location'),

                );  
            
                    
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            $post_data = $this->input->post();
            
            $query = $this->Event_Model->getCustomFields(Tables::EVENTS,array('id'=>$this->input->post('event_id')),'*');
            if($query->num_rows() == 0 ){
                $this->set_response(['status'=>false,'message'=>'Event id does not exists', 'data' => array()],REST_Controller::HTTP_OK);
                return;
            }
            $post_info = $query->row();
            if($post_info->user_id != $user_id) {
                $this->set_response(['status'=>false,'message'=>'You have not permission to edit this event', 'data' => array()],REST_Controller::HTTP_OK);
                return;
            }
            $post_detail  = array(
                
                'event_description' => @$this->input->post('event_description'),
                'event_name' => @$this->input->post('event_name'),
                'location' => @$this->input->post('location'), 
                'postal_code' => @$this->input->post('postal_code'), 
                'updated_date' =>date('Y-m-d H:i:s'), 
            );  

            if(isset($post_data['latitude']) && !empty($post_data['latitude']) && isset($post_data['longitude']) && !empty($post_data['longitude'])){
            	$post_detail['latitude'] = $post_data['latitude'];
            	$post_detail['longitude'] =  $post_data['longitude'];
            }

            if(isset($post_data['event_date']) && !empty($post_data['event_date'])){
                $post_detail['event_date'] = date('Y-m-d', strtotime($post_data['event_date']));
            }
              
               
            $event_id = $this->Event_Model->update(Tables::EVENTS, array('id' => $this->input->post('event_id')), $post_detail);
            
            if($event_id) {

                
                                      
                $this->set_response(['status'=>true,'message'=>'Event updated successfully'],REST_Controller::HTTP_OK);   
                
            }else{
                $this->response(array("status" => false, 'message'=>'Sorry Opps, Error occurred please try after some time.'));
            }
            
             
        }
    }


    /*Delete Events  */
    public function eventitem_delete(){
        
        $check_suspend_account = $this->Event_Model->getCustomFields(Tables::USER,array('status !='=>'1', 'id' => $this->user_data->id),'id');
        if($check_suspend_account->num_rows() > 0){
            $this->set_response(['status'=>false,'message'=>'Sorry Currently Your account is not in active mode. So you can not access this feature.','data'=>$error_message],REST_Controller::HTTP_OK);
            return false;
        }
        $event_id = (int) $this->delete('event_id');
        $user_id = $this->user_data->id;
        $error = "";
        if (!$event_id) {
            
               $error = "Event id required";
            
            $error_message=array(
                
                'event_id'=>"Event id required"

            );           
            $this->set_response(['status'=>false,'message'=>$error,'data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
            
            $query = $this->Event_Model->getCustomFields(Tables::EVENTS,array('id'=>$event_id),'id, user_id');
            if($query->num_rows() > 0 ){
                $post_details = $query->row();
                if($post_details->user_id == $user_id) {
                    $this->db->trans_begin();
                    
                    $this->Event_Model->delete_by_condition(Tables::EVENTS_ENQUIRY, array('event_id' => $event_id));
                    
                    $this->Event_Model->delete_by_condition(Tables::EVENTS, array('id' => $event_id));
                    if ($this->db->trans_status() === FALSE) {
                        $this->db->trans_rollback();
                        $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.', 'data' => array()],REST_Controller::HTTP_OK);
                    
                    }
                    else{
                        $this->db->trans_commit();
                        $this->set_response(['status'=>true,'message'=>'Event successfully deleted', 'data' => array()],REST_Controller::HTTP_OK);
                    }
                }
                else{
                    $this->set_response(['status'=>false,'message'=>'You have not permission to delete this event', 'data' => array()],REST_Controller::HTTP_OK);
                }
            }
            else{
                $this->set_response(['status'=>false,'message'=>'Please try again, Something is wrong.', 'data' => array()],REST_Controller::HTTP_OK);
            }
            
             
        }
    }

    /*Event Participant List*/
    public function event_participent_get($event_id){
        $per_page = 50000;
        $page_no = 1;
        if(isset($filter_post['per_page']) && !empty($filter_post['per_page']))
            $per_page = $filter_post['per_page'];
        if(isset($filter_post['page_no']) && !empty($filter_post['page_no']))
            $page_no = (int) $filter_post['page_no'];
        $offset = ($page_no > 1) ? ($page_no -1 ) * $per_page : 0;
        $getAllEvents = $this->Event_Model->getAllEventsParticipant($event_id, $offset, $per_page);
        $getTotalPosts = $this->Event_Model->totalEventParticipantCount($event_id);
        $result = $getTotalPosts->row();
        $resultSet = array('per_page' => $per_page, 'page_no' => $page_no, 'totalRecords' => (int) $result->total_count, 'totalPages' => ceil($result->total_count/$per_page), 'records' => array());
        
        if($getAllEvents->num_rows() > 0 ){
            $resultSet['records'] = $getAllEvents->result();
        }
        $this->set_response(['status'=>true,'message'=>'', 'data' => $resultSet],REST_Controller::HTTP_OK);

    }

    

    
    

}
