<?php

defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Common extends BD_Controller {

    function __construct()
    {
        // Construct the parent class savaran,95
        parent::__construct();
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->load->model('Common_model');
        
    }

    /* get distance list */
    public function distance_get()
    {
       $settings = $this->Common_model->get_settings(array('option_name' => 'distance_settings'));
       if ($settings->num_rows()>0) {
           $distance_data = ($settings->row()->option_value) ? unserialize($settings->row()->option_value): array();
           $this->response(array("status" => true, 'message'=>'',"data" => $distance_data),REST_Controller::HTTP_OK);
       }else{
            $this->response(array("status" => true, 'message'=>'',"data" => array()),REST_Controller::HTTP_OK);
       }
    }

    public function logo_settings_get()
    {
       $settings = $this->Common_model->get_settings(array('option_name' => 'logo_settings'));
       if ($settings->num_rows()>0) {
           $logo_data = ($settings->row()->option_value) ? unserialize($settings->row()->option_value): array();
           if(isset($logo_data['active_logo']) && $logo_data['active_logo'] == 1){
              unset($logo_data['light_logo']);
              $logo_data['dark_logo'] = base_url('uploads/logo/'.$logo_data['dark_logo']);
          }
          else if(isset($logo_data['active_logo']) && $logo_data['active_logo'] == 2){
            unset($logo_data['dark_logo']);
            $logo_data['light_logo'] = base_url('uploads/logo/'.$logo_data['light_logo']);
          }

           $this->response(array("status" => true, 'message'=>'',"data" => $logo_data),REST_Controller::HTTP_OK);
       }else{
            $this->response(array("status" => true, 'message'=>'',"data" => array()),REST_Controller::HTTP_OK);
       }
    }

    

    
}
