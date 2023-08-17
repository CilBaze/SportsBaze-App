<?php

defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Sports extends BD_Controller {

    function __construct()
    {
        // Construct the parent class savaran,95
        parent::__construct();
        // Configure limits on our controller methods
        // Ensure you have created the 'limits' table and enabled 'limits' within application/config/rest.php
        $this->methods['users_get']['limit'] = 500; // 500 requests per hour per user/key
        $this->methods['users_post']['limit'] = 100; // 100 requests per hour per user/key
        $this->methods['users_delete']['limit'] = 50; // 50 requests per hour per user/key
        $this->load->model('Sport_model');
        $this->load->library('common/common');
        $this->load->helper('common/common');
    }

    /* get sports list */
    public function index_get()
    {
       $query = $this->Sport_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL  AND taxonomy_type= "post"','id as sports_id,name as sports_name');
       if ($query->num_rows()>0) {
           $this->response(array("status" => true, 'message'=>'',"data" => $query->result()),REST_Controller::HTTP_OK);
       }else{
            $this->response(array("status" => true, 'message'=>'',"data" => array()),REST_Controller::HTTP_OK);
       }
    }

    /* get Fitness Cat list */
    public function fitness_get()
    {
       $query = $this->Sport_model->getCustomFields(Tables::SPORTS,'status= "1" AND parent_sports_id IS NULL  AND taxonomy_type= "fitness_studio"','id as sports_id,name as sports_name');
       if ($query->num_rows()>0) {
           $this->response(array("status" => true, 'message'=>'',"data" => $query->result()),REST_Controller::HTTP_OK);
       }else{
            $this->response(array("status" => true, 'message'=>'',"data" => array()),REST_Controller::HTTP_OK);
       }
    }

    

    /*Get Sub Sports*/
    public function sub_sports_get($sports_id)
    {
       $query = $this->Sport_model->getSubSports($sports_id);
       if ($query->num_rows()>0) {
           $this->response(array("status" => true, 'message'=>'',"data" => $query->result()),REST_Controller::HTTP_OK);
       }else{
            $this->response(array("status" => true, 'message'=>'',"data" => array()),REST_Controller::HTTP_OK);
       }
    }

    
}
