
<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Mechanic extends BD_Controller {
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->auth();
        $this->load->model(array('api/Auth_model'));
        $this->load->library(array('common/common'));
        $this->load->helper('common/common');
        
    }

    /* Count all type job */
    public function count_all_type_job_post()
    {
        $profile_query = $this->Auth_model->get_mechanic_profile($this->user_data->id,$this->user_data->user_group);
      
    	$query = $this->Auth_model->get_total_job($this->user_data->id);
        //echo $this->db->last_query();
        if ($profile_query->num_rows()>0) {            
            $new_query = $this->Auth_model->get_total_job_range_in_mechanic($profile_query->row());
            ///echo $this->db->last_query();
            $new_job =$new_query->num_rows();
        }else{
            $new_job=0;
        }
        //echo $this->db->last_query();
    	$detail_arr = array(
    		'total_new_job'=>$new_job,
    		'accepted_job'=>0,
    		'rejected_job'=>0,
    		'scheduled_job'=>0,
    	);
    	if($query->num_rows()>0){
			$row=$query->row();

			$detail_arr = array(
	    		'total_new_job'=>$new_job,
	    		'accepted_job'=>($row->accepted_job)?$row->accepted_job:'0',
	    		'rejected_job'=>($row->rejected_job)?$row->rejected_job:'0',
	    		'scheduled_job'=>($row->scheduled_job)?$row->scheduled_job:'0',
    		);
    		
    	}
    	$this->set_response(['status'=>true,'data'=>$detail_arr],REST_Controller::HTTP_OK);
    }


    /* mechanic notification */
    public function mechanic_notifiction_post()
    {
        if ($this->user_data->user_group==4) {
            $notification_data =array();
            $profile_query = $this->Auth_model->get_mechanic_profile($this->user_data->id,$this->user_data->user_group);
            $new_query = $this->Auth_model->get_total_job_range_in_mechanic($profile_query->row());
          
                $notification_data['new_job'] =array('total_new_job'=>$new_query->num_rows(),'message'=>'New job request');  
                $cnf_query = $this->Auth_model->get_total_confirm_job($this->user_data,2);
                if ($cnf_query->num_rows()>0) {
                    
                    $notification_data['confirm'] =array('confirm_job'=>$cnf_query->result(),'message'=>'Confirm job'); 
                }else{
                     $notification_data['confirm'] =array('confirm_job'=>0,'message'=>'Confirm job'); 
                }

                $cnf_query = $this->Auth_model->get_total_confirm_job($this->user_data,3);
                if ($cnf_query->num_rows()>0) {
                
                    $notification_data['rejected'] =array('rejected_job'=>$cnf_query->result(),'message'=>'Rejected job');                  
                }else{
                     $notification_data['rejected'] =array('rejected_job'=>0,'message'=>'Rejected job'); 
                }
                $this->set_response(['status'=>true,'data'=>$notification_data],REST_Controller::HTTP_OK); 
            
        }else{
            $this->set_response(['status'=>false,'message'=>'This page is not authorized for you.'],REST_Controller::HTTP_OK);
        }
        
    }

    /* List of posted job */
    public function get_posted_job_list_post()
    {
       
        $profile_query = $this->Auth_model->get_mechanic_profile($this->user_data->id);       
         
    	$query = $this->Auth_model->get_posted_job_list($this->input->post('job_type'),null,$this->user_data->id,$profile_query->row());

            $job_detail =array();
             $imge_row=array();
    	if ($query->num_rows()>0) {
            $job_detail =array();
             
            foreach ($query->result() as $row) {
                $image_row=array();
                $job_detail[] =$row;
                $services = $this->Auth_model->get_service_request($row->posted_job_id); 

                $service_title='';
                $total_price = 0;
                foreach ($services->result() as $service) {
                    $service_title.= $service->title.', ';
                    $total_price+= $service->price;
                }
                $row->service_name = !empty($service_title) ? substr($service_title, 0, -2) : '';
                $row->total_price = $total_price;
                $row->image = $image_row;
                $image_query= $this->Auth_model->get_service_request_image($row->posted_job_id,$row->user_id);
                if ($image_query->num_rows()>0) {
                    $image_row[] = $image_query->row();
                    $row->image = $image_row;
                }                   
               
            }
            
    		$this->set_response(['status'=>true,'data'=>$job_detail],REST_Controller::HTTP_OK);
    	}else{
    		$this->set_response(['status'=>false,'data'=>$job_detail],REST_Controller::HTTP_OK);
    	}
    }

    public function action_on_posted_job_post()
    {
    	if (!$this->is_mechanic($this->user_data)) {
    		$this->set_response(['status'=>false,'message'=>'You are not authorized to access this page'],REST_Controller::HTTP_OK);
    	}
    	
    	$job_id = $this->input->post('job_id');
    	$status = $this->input->post('status');
        if (empty($job_id) && empty($status)) {
            $this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time.'],REST_Controller::HTTP_OK);
            die;
        }else{
        	$query = $this->Auth_model->getCustomFields(Tables::BOOK_REQUEST,array('id'=>$job_id),'*');
            //echo $this->db->last_query();
        	if ($query->num_rows()==0) {

        		$this->set_response(['status'=>false,'message'=>'This job does not exist'],REST_Controller::HTTP_OK);
        	}else{           
                $status1 =$status;
                if ($this->user_data->user_group==4) {
                    $mechanic_id = $this->user_data->id;
                }else{
                    $mechanic_id = $query->row()->mechanic_id;
                }
                if ($status==9 || $status==10) {
                    $status1 = $status;
                }    	    	
                $affected = $this->Auth_model->update(Tables::BOOK_REQUEST,array('id'=>$job_id),array('mechanic_id'=>$mechanic_id,'status'=>$status1));
    	    	if ($affected) {
                    $query = $this->Auth_model->getCustomFields(Tables::BOOK_REQUEST,array('id'=>$job_id),'*');
                        
                       
                    $bill_array=array(
                        'book_request_id'=>$job_id,
                        //'amount'=>$this->input->post('amount'),
                        'created_date'=>date("Y-m-d H:i:s"),
                        'updated_date'=>date("Y-m-d H:i:s"),
                    );
                    if ($status==4) {
                        # code...
                        if ($_FILES) {                                
                            $this->bill_file_upload('bill_image',$bill_array);
                        }
                    }
                        
                   
                    if ($this->user_data->user_group==4) {
                        $user_detail = $this->Auth_model->getCustomFields(Tables::USER,array('id'=>$query->row()->user_id,'user_group'=>3),'*');
                    }else{
                        $user_detail = $this->Auth_model->getCustomFields(Tables::USER,array('id'=>$query->row()->mechanic_id,'user_group'=>4),'*');
                    }
                   
                    $row = $user_detail->row();
                   
                    $load['title']  = SITE_TITLE;
                     $message = '';
                    if ($status==2) { //user - mechnic
                        $user_detail = $this->Auth_model->getCustomFields(Tables::USER,array('id'=>$query->row()->mechanic_id,'user_group'=>4),'*');               
                        $message = 'Your job has been accepted by '.$user_detail->row()->name;
                        $load['msg']    = $message;
                        $load['action'] = 'confirm';
                    }else if($status==7){ //send notification to mechanic by user
                        $message        = 'The user has accepted the work invoice. Now change the status of the job to "On the way" in accepted job list and start your journey to repair the request.';
                        $load['msg']    = $message;
                        $load['action'] = 'payment';
                    }else if($status==6) {  // send notification to user by mechanic
                        $message        = 'Your mechanic is on the way';
                        $load['msg']    = $message ;
                        $load['action'] = 'ontheway';
                    } else if($status==4) {  //send notification to user by mechnic
                        $message        = 'Your job has been completed';
                        $load['msg']    = $message ;
                        $load['action'] = 'completed';
                    }else if ($status==8) {  //send notification to mechnic by user
                        $message        = 'The user has accepted the terms & Conditions of Auto Monkey. Now change the status of the job to "On the way" in accepted job list and start your journey to diagnose & repair the request.';
                        $load['msg']    = $message;
                        $load['action'] = 'term_condtion';
                    }else if($status==9){//send notification to mechnic by user
                        $message        = 'The client has not agreed on the terms & Conditions due to which this job has been cancelled.';
                        $load['msg']    = $message ;
                        $load['action'] = 'no_term_condtion';
                    } else if($status ==10){  //send notification to  mechnic by user
                        $message        = 'The client has not made the payment due to which this job has been cancelled.';
                        $load['msg']    = $message;
                        $load['action'] = 'no_thanks';
                    } else if($status ==5){  //send notification to mechnic by user
                        $message        = 'Your job is Ongoing by the mechanic';
                        $load['msg']    = $message;
                        $load['action'] = 'ongoing';
                    }         
                    $load['job_id'] = $job_id;
                    $load['name'] = $row->name;
                    $load['inovice'] = $query->row()->job_type;
                    $load['user_id'] = $this->user_data->id;
                    $token = $row->fcm_token;   
                    if ($status!=3) {                                    
                        $this->common->android_push($token, $load, FIREBASE_KEY);
                    }             
    	    		$this->set_response(['status'=>true,'message'=> $message,'isinvoice'=>$query->row()->job_type,'data'=>array('customerProfileId'=>$row->customerProfileId,'paymentProfileId'=>$row->paymentProfileId)],REST_Controller::HTTP_OK);    		
    	    	}else{
    	    		$this->set_response(['status'=>false,'message'=>'Error occured, Plaese try after some time '],REST_Controller::HTTP_OK);
    	    	}
    	    }            
        }
    }

    /* bill file upload */
    public function bill_file_upload($folder_name,$req_data){ 
        //print_r($_FILES);die;
        $index = $folder_name;
        if (!is_dir('uploads/'.$folder_name)) {
            mkdir('./uploads/'.$folder_name, 0777, TRUE);
        }
        $config['upload_path']   = './uploads/'.$folder_name; 
        $config['allowed_types'] = 'jpg|png'; 
        $config['max_size']      = 10000; 
        //$config['max_width']     = 1024; 
        //$config['max_height']    = 768; 
        $new_name = time().$_FILES[$index]['name'];
        $config['file_name'] = $new_name; 
        //$config['file_name'] = $_FILES['file']['name'];
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
            
         if ( ! $this->upload->do_upload($index)) {

            $error = array('error' => $this->upload->display_errors()); 
            return false;
            
         }else { 
            $file_array = $this->upload->data();
            $data = array($index=>$file_array['file_name']);   
            $req_data['bill_file_name']  =$file_array['file_name'];       
            $this->Auth_model->save(Tables::BILL_HISTORY,$req_data);             
            return true;
         } 
    }

    /* view posted job */
    public function view_posted_job_post()
    {
    	$posted_job_id = $this->input->post('job_id');
    	$profile_query = $this->Auth_model->get_mechanic_profile($this->user_data->id);

    	$job_detail = $this->Auth_model->get_posted_job_list(null,$posted_job_id,$this->user_data->id,$profile_query->row());
        $services = $this->Auth_model->get_service_request($posted_job_id);        
        $service_title='';
        $total_price = 0;
        foreach ($services->result() as $service) {
            $service_title.= $service->title.', ';
            $total_price+= $service->price;
        }
        $job_detail->service_name = !empty($service_title) ? substr($service_title, 0, -2) : '';
        $job_detail->total_price = $total_price;
    	if (!empty($job_detail)) {
    		$this->set_response(['status'=>true,'data'=>$job_detail],REST_Controller::HTTP_OK);
    	}else{
    		$this->set_response(['status'=>false,'data'=>''],REST_Controller::HTTP_OK);
    	}
    }

    // Get user and mechanic profile */
    public function get_profile_post()
    {
    	$query = $this->Auth_model->get_profile($this->user_data->id);
      
    	if ($query->num_rows()>0) {
            $row = $query->row();
            $profile_detail = array(
                'name'=>$row->name,
                'email'=>$row->email,
                'contact_no'=>$row->contact_no,
                'account_holder_name'=>($row->account_holder_name)?encrypt_decrypt('decrypt',$row->account_holder_name):'',                
                'bank_name'=>($row->bank_name)?encrypt_decrypt('decrypt',$row->bank_name):'',
                'routing_number'=>($row->routing_number)?encrypt_decrypt('decrypt',$row->routing_number):'',
                'account_number'=>($row->account_number)?encrypt_decrypt('decrypt',$row->account_number):'',
            );
    		$this->set_response(['status'=>true,'data'=> $profile_detail],REST_Controller::HTTP_OK);
    	}else{
    		$this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
    	}
    }

    /* update user and mechanic profile */
    public function update_profile_post()
    {
    	$profile_array=array(
    		'name'=>$this->input->post('name'),
    		'contact_no'=>$this->input->post('contact_no'),
    		'updated_date'=>date('Y-m-d H:i:s')
    	);
        if (!empty($profile_array['name']) && !empty($profile_array['contact_no'])) {
            # code...
        	$affected = $this->Auth_model->update(Tables::USER,array('id'=>$this->user_data->id,'user_group!='=>1),$profile_array);
            if ($affected) {
                $this->set_response(['status'=>true,'message'=>'Profile is updated successfully.'],REST_Controller::HTTP_OK);
            }else{
                $this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
            }
        }
        if (!empty($this->input->post('account_holder_name')) && !empty($this->input->post('bank_name')) && !empty($this->input->post('routing_number')) && !empty($this->input->post('account_number'))) {
            $card_query = $this->Auth_model->getCustomFields(Tables::MECHANIC_ACCOUNT_DETAIL,array('user_id'=>$this->user_data->id),'*');
            $card_detail    = array(                   
                'account_holder_name'=>encrypt_decrypt('encrypt',ucwords($this->input->post('account_holder_name'),' ')),
                'bank_name'=>encrypt_decrypt('encrypt',$this->input->post('bank_name')),
                'routing_number'=>encrypt_decrypt('encrypt',$this->input->post('routing_number')),
                'account_number'=>encrypt_decrypt('encrypt',$this->input->post('account_number')), 
                'updated_date'=>date('Y-m-d H:i:s'),
            );
            if ( $card_query->num_rows()>0) {
                $account_updated = $this->Auth_model->update(Tables::MECHANIC_ACCOUNT_DETAIL,array('user_id'=>$this->user_data->id), $card_detail);
                if ($account_updated) {
                    $this->set_response(['status'=>true,'message'=>'Account is updated successfully.'],REST_Controller::HTTP_OK);
                }else{
                    $this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
                }
            }else{
                $card_detail['created_date']=date('Y-m-d H:i:s');
                $card_detail['user_id']= $this->user_data->id;
                $account_id = $this->Auth_model->save(Tables::MECHANIC_ACCOUNT_DETAIL, $card_detail);
                if ($account_id) {
                    $this->set_response(['status'=>true,'message'=>'Account is saved successfully.'],REST_Controller::HTTP_OK);
                }else{
                    $this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
                }
            }   
            
        }
    }

    /* Change password of mechanic and user */
    public function change_password_post()
    {
    	$this->form_validation->set_rules('password','Password','required');
        
        $this->form_validation->set_error_delimiters('','');
        if ($this->form_validation->run()==false) {
            $error_message=array(               
                'password'=>form_error('password'),
                
            );
           
            $this->set_response(['status'=>false,'message'=>'Some problem occurred, Please try again ','data'=>$error_message],REST_Controller::HTTP_OK);
        }else{
        	$affected = $this->Auth_model->update(Tables::USER,array('id'=>$this->user_data->id,'user_group!='=>1),array('password'=>md5($this->input->post('password'))));
    	if ($affected) {
    		$this->set_response(['status'=>true,'message'=>'Password is changed successfully.'],REST_Controller::HTTP_OK);
    	}else{
    		$this->set_response(['status'=>false,'message'=>'Error occured, Please try after some time'],REST_Controller::HTTP_OK);
    	}
        }
    }

}
