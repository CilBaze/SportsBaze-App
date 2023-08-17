<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');


class Common_model extends MY_Model{

    public function __construct(){
        parent::__construct();
        
    }
    
    
    public function get_settings($condition = null){
        if($condition)
            $this->db->where($condition);
        $query = $this->db->get(Tables::OPTIONS);
        return $query;
    }
    

}