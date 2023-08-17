<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');


class Event_model extends MY_Model{

    public function __construct(){
        parent::__construct();
        
    }
    
    
    /*Get All post*/
    public function getAllEvents($condition, $offest = 0, $limit = 20){
        $distance = "";
        // filter for miles
        if (isset($condition['latitude']) && !empty($condition['latitude']) && isset($condition['longitude']) && !empty($condition['longitude'])) {
            $latitude  = $condition['latitude'];
            $longitude = $condition['longitude'];
            
            $to_distance = (isset($condition['distance']) && !empty($condition['distance'])) ? $condition['distance'] : 10;
            $distance = ",
          (6371  * acos (cos ( radians('" . $latitude . "') ) * cos( radians( p.latitude ) ) * cos( radians( p.longitude ) - radians('" . $longitude . "') ) + sin ( radians('" . $latitude . "') ) * sin( radians( p.latitude ) ))) as distance";
            if($to_distance > 100)
                $this->db->having('distance > ' . $to_distance . '');
            else
                $this->db->having('distance <= ' . $to_distance . '');
        }
        $this->db->select('p.id as event_id, p.event_description, p.event_name, p.event_date, p.location, p.latitude, p.longitude, p.status, p.created_date, p.user_id, u.first_name as user_first_name,IFNULL(p.postal_code,"") as postal_code, u.last_name as user_last_name, u.email, u.user_group, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan / User" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic '.$distance);
         $this->db->from(Tables::EVENTS.' p');
       
        $this->db->join(Tables::USER.' u', 'p.user_id = u.id', 'left');
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);
        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('p.user_id', $condition['user_id']);

        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR p.event_description LIKE '%".$condition['keywords']."%' OR p.event_name LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%' )");
        if (isset($condition['start_date']) && !empty($condition['start_date']))        
        $this->db->where("DATE_FORMAT(p.event_date,'".SQL_DATE_FORMAT."') = '".date(PHP_DATE_FORMAT,strtotime(trim($condition['start_date'])))."'",NULL,FALSE);

       /* if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
            $this->db->where("DATE_FORMAT(cae.created_date,'".SQL_DATE_FORMAT."') <= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['end_date'])))."'",NULL,FALSE);*/
        $this->db->limit($limit, $offest);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        //echo $this->db->last_query();
        return $q;
    }

    /*Get All Post Count*/
    public function totalEventCount($condition){
        $distance = "";
        // filter for miles
        if (isset($condition['latitude']) && !empty($condition['latitude']) && isset($condition['longitude']) && !empty($condition['longitude'])) {
            $latitude  = $condition['latitude'];
            $longitude = $condition['longitude'];
            
            $to_distance = (isset($condition['distance']) && !empty($condition['distance'])) ? $condition['distance'] : 10;
            $distance = ",
          (6371  * acos (cos ( radians('" . $latitude . "') ) * cos( radians( p.latitude ) ) * cos( radians( p.longitude ) - radians('" . $longitude . "') ) + sin ( radians('" . $latitude . "') ) * sin( radians( p.latitude ) ))) as distance";
            if($to_distance > 100)
                $this->db->having('distance > ' . $to_distance . '');
            else
                $this->db->having('distance <= ' . $to_distance . '');
        }
        $this->db->select("count(*) as total_count ".$distance);
        $this->db->from(Tables::EVENTS.' p');
       
        $this->db->join(Tables::USER.' u', 'p.user_id = u.id', 'left');
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);

        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('p.user_id', $condition['user_id']);

        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR p.event_description LIKE '%".$condition['keywords']."%' OR p.event_name LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%')");
        
        $q=$this->db->get();
        return $q;
    }


    /*Get All post*/
    public function getAllEventsParticipant($event_id, $offest = 0, $limit = 20){
        
        $this->db->select('p.id as event_id, p.event_description, p.event_name, p.event_date, p.location, p.latitude, p.longitude, p.status,IFNULL(p.postal_code,"") as postal_code, p.created_date, p.user_id, u.first_name as user_first_name, u.last_name as user_last_name, u.email as user_email, u.user_group, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan / User" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, ee.first_name, ee.last_name, ee.email,  ee.contact_no, ee.message');
        $this->db->from(Tables::EVENTS_ENQUIRY.' ee');
        $this->db->join(Tables::EVENTS.' p', 'ee.event_id = p.id');
       
        $this->db->join(Tables::USER.' u', 'p.user_id = u.id', 'left');
        $this->db->where('ee.event_id', $event_id);
        $this->db->limit($limit, $offest);
        $this->db->order_by('ee.id DESC');
        $q=$this->db->get();
        return $q;
    }

    /*Get All Post Count*/
    public function totalEventParticipantCount($event_id){
        
        $this->db->select("count(*) as total_count ");
        $this->db->from(Tables::EVENTS_ENQUIRY.' ee');
        $this->db->join(Tables::EVENTS.' p', 'ee.event_id = p.id');
       
        $this->db->join(Tables::USER.' u', 'p.user_id = u.id', 'left');
        $this->db->where('ee.event_id', $event_id);
        
        $q=$this->db->get();
        return $q;
    }

    

    
    

}