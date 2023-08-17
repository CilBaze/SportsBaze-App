<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');


class Sport_model extends MY_Model{

    public function __construct(){
        parent::__construct();
        
    }
    
    
    public function getSubSports($id)
    {
        $this->db->select('sp.name as sub_sports_name,sp.id as sub_sports_id, psp.name as sports_name, sp.parent_sports_id as sports_id');
        $this->db->from(Tables::SPORTS.' sp');
        $this->db->join(Tables::SPORTS.' psp','sp.parent_sports_id=psp.id','left');
        $this->db->where(array('sp.parent_sports_id'=>$id));
        $query = $this->db->get();
        return $query;
    }

    public function getAllSubSports($condition = array()) {
        $this->db->select('sp.name as sub_sports_name,sp.id as sub_sports_id, psp.name as sports_name, sp.parent_sports_id as sports_id');
        $this->db->from(Tables::SPORTS.' sp');
        $this->db->join(Tables::SPORTS.' psp','sp.parent_sports_id=psp.id','left');
        $this->db->where("sp.parent_sports_id IS NOT NULL AND sp.parent_sports_id != ''");
        if(isset($condition['taxonomy_type']) && !empty($condition['taxonomy_type']))
            $this->db->where('sp.taxonomy_type', $condition['taxonomy_type']);
        else
            $this->db->where('sp.taxonomy_type', 'post');
        $this->db->order_by('sp.parent_sports_id', 'ASC');
        $query = $this->db->get();
        return $query;
    }
    

}