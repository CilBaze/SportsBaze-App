<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');


class Post_model extends MY_Model{

    public function __construct(){
        parent::__construct();
        
    }
    
    
    /*Get All post*/
    public function getAllPosts($condition, $offest = 0, $limit = 20){
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
        $this->db->select('p.id as post_id,p.post_type, p.description, p.title,p.rating, p.website_url, p.location, p.latitude, p.longitude, p.views, p.link_contact_form, p.contact_email, p.status, p.shared_post_id, p.created_date,IFNULL(postal_code,"") as postal_code, p.created_by as user_id, p.sports_id, p.sub_sports_id, sp.name as sport_name, ssp.name as sub_sports_name, u.first_name as user_first_name, u.last_name as user_last_name, u.email, u.user_group, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, (SELECT count(*) FROM '.Tables::POST_FAVOURITE.' WHERE post_id=p.id) as total_favourite '.$distance);
        $this->db->from(Tables::POSTS.' p');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        //$this->db->where("(p.shared_post_id IS NULL OR p.shared_post_id = '')");
        /*if(isset($condition['filter_type']) && !empty($condition['filter_type']))
            $this->db->where('p.post_type', $condition['filter_type']);
        else*/ if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);        
        /*else
            $this->db->where('p.post_type', 'post');*/
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);
        if(isset($condition['id']) && !empty($condition['id']))
            $this->db->where('p.id', $condition['id']);

        if(isset($condition['sports_id']) && !empty($condition['sports_id'])){
            //$sport= implode(',',$condition['sports_id']);
            $sport= $condition['sports_id'];
            if (!empty($sport)) {
                $condition1 = 'p.sports_id in ('.$sport.')';            
                $this->db->where( $condition1,null,FALSE);
            }
           
        }

        if(isset($condition['sub_sports_id']) && !empty($condition['sub_sports_id']))
            $this->db->where('p.sub_sports_id', $condition['sub_sports_id']);
        
        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR sp.name LIKE '%".$condition['keywords']."%' OR ssp.name LIKE '%".$condition['keywords']."%' OR p.description LIKE '%".$condition['keywords']."%' OR p.title LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%' OR p.post_type LIKE '%".$condition['keywords']."%')");
        else if(!isset($condition['keywords']) && empty($condition['keywords']) && !isset($condition['post_type']) && empty($condition['post_type']))
             $this->db->where("p.post_type= 'gym' OR p.post_type= 'coaching_academy'");
        $this->db->limit($limit, $offest);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        //echo $this->db->last_query();
        return $q;
    }

    /*Get All Post Count*/
    public function totalPostCount($condition){
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
        $this->db->from(Tables::POSTS.' p');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        //$this->db->where("(p.shared_post_id IS NULL OR p.shared_post_id = '')");
        /*if(isset($condition['filter_type']) && !empty($condition['filter_type']))
            $this->db->where('p.post_type', $condition['filter_type']);
        else*/ if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);         
        /*else
            $this->db->where('p.post_type', 'post');*/
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);

        if(isset($condition['sports_id']) && !empty($condition['sports_id'])){
            //$sport= implode(',',$condition['sports_id']);
            $sport= $condition['sports_id'];
            if (!empty($sport)) {
                $condition1 = 'p.sports_id in ('.$sport.')';            
                $this->db->where( $condition1,null,FALSE);
            }
           
        }

        if(isset($condition['sub_sports_id']) && !empty($condition['sub_sports_id']))
            $this->db->where('p.sub_sports_id', $condition['sub_sports_id']);

        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR sp.name LIKE '%".$condition['keywords']."%' OR ssp.name LIKE '%".$condition['keywords']."%' OR p.description LIKE '%".$condition['keywords']."%' OR p.title LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%'OR p.post_type LIKE '%".$condition['keywords']."%')");
        else if(!isset($condition['keywords']) && empty($condition['keywords']) && !isset($condition['post_type']) && empty($condition['post_type']))
             $this->db->where("p.post_type= 'gym' OR p.post_type= 'coaching_academy'"); 
        $q=$this->db->get();
       
        return $q;
    }

    /*Get All My Post*/
    public function getAllMyPosts($condition, $offest = 0, $limit = 20){
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
        $this->db->select('p.id as post_id, p.description, p.title, p.website_url, p.location, p.latitude, p.longitude, p.views, p.link_contact_form, p.contact_email, p.status, p.created_date, p.created_by as user_id, p.sports_id, p.sub_sports_id, p.shared_post_id, sp.name as sport_name, ssp.name as sub_sports_name, u.first_name as user_first_name, u.last_name as user_last_name, u.email, u.user_group, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, (SELECT count(*) FROM '.Tables::POST_FAVOURITE.' WHERE post_id=p.id) as total_favourite '.$distance);
        $this->db->from(Tables::POSTS.' p');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        if(isset($condition['created_by']) && !empty($condition['created_by']))
            $this->db->where('p.created_by', $condition['created_by']);
        if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);
        else
            $this->db->where('p.post_type', 'post');
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);
        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR sp.name LIKE '%".$condition['keywords']."%' OR ssp.name LIKE '%".$condition['keywords']."%' OR p.description LIKE '%".$condition['keywords']."%' OR p.title LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%')");
        //else
            //$this->db->where("p.post_type= 'gym' OR p.post_type= 'coaching_academy'");
        $this->db->limit($limit, $offest);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();

        return $q;
    }

    /*Get All My Post Count*/
    public function totalMyPostCount($condition){
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
        $this->db->from(Tables::POSTS.' p');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
         if(isset($condition['created_by']) && !empty($condition['created_by']))
            $this->db->where('p.created_by', $condition['created_by']);
        if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);
        else
            $this->db->where('p.post_type', 'post');
        if(isset($condition['status']) && !empty($condition['status']))
            $this->db->where('p.status', $condition['status']);

        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(u.first_name LIKE '%".$condition['keywords']."%' OR u.last_name LIKE '%".$condition['keywords']."%' OR sp.name LIKE '%".$condition['keywords']."%' OR ssp.name LIKE '%".$condition['keywords']."%' OR p.description LIKE '%".$condition['keywords']."%' OR p.title LIKE '%".$condition['keywords']."%' OR p.location LIKE '%".$condition['keywords']."%')");
        
        $q=$this->db->get();
        return $q;
    }

    /*Get Post Images by Post id*/
    public function getPostImages($post_id){
        $this->db->select('p.id as image_id, CONCAT("'.base_url('uploads/posts/').'", p.name) as image_url, (CASE WHEN p.thumbnail_image IS NOT NULL AND p.thumbnail_image != "" THEN CONCAT("'.base_url('uploads/posts/').'", p.thumbnail_image) ELSE "" end) as thumbnail_image_url');
        $this->db->from(Tables::POST_IMAGES.' p');
        $this->db->where('p.post_id', $post_id);
        
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->result();
        else
            return array();
    }

    /*Get Post Comments by Post id*/
    public function getPostComments($post_id){
        $this->db->select('pc.id as comment_id, pc.post_id, pc.user_id, p.description, pc.created_date, pc.comments, CONCAT(u.first_name, " ", CASE WHEN u.last_name is NOT NULL THEN u.last_name ELSE "" END) as comment_by, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic');
        $this->db->from(Tables::POST_COMMENTS.' pc');
        $this->db->join(Tables::POSTS.' p', 'pc.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u', 'pc.user_id = u.id', 'left');
        $this->db->where('pc.post_id', $post_id);
        $this->db->order_by('pc.id DESC');
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->result();
        else
            return array();
    }

    public function getCommentDetails($comment_id) {
        $this->db->select('pc.id as comment_id, pc.post_id, pc.user_id, p.description, CONCAT(u.first_name, " ", CASE WHEN u.last_name is NOT NULL THEN u.last_name ELSE "" END) as comment_by, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, p.created_by');
        $this->db->from(Tables::POST_COMMENTS.' pc');
        $this->db->join(Tables::POSTS.' p', 'pc.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u', 'pc.user_id = u.id', 'left');
        $this->db->where('pc.id', $comment_id);
        
        $q=$this->db->get();
        return $q;
    }


    /*Get Post Like by Post id*/
    public function getPostLikes($post_id){
        $this->db->select('pl.id as like_id, pl.post_id, pl.user_id, CONCAT(u.first_name, " ", CASE WHEN u.last_name is NOT NULL THEN u.last_name ELSE "" END) as like_by, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic');
        $this->db->from(Tables::POST_LIKE.' pl');
        $this->db->join(Tables::USER.' u', 'pl.user_id = u.id', 'left');
        $this->db->where('pl.post_id', $post_id);
        
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->result();
        else
            return array();
    }

    /*Get User Favourite Post*/
    public function getUserFavourite($condition, $offest = 0, $limit = 20){
        $this->db->select('p.id as post_id, p.description, p.title, p.website_url, p.location, p.latitude, p.longitude, p.views, p.link_contact_form, p.contact_email, p.status, p.created_date, p.created_by as user_id, p.sports_id, p.sub_sports_id, sp.name as sport_name, ssp.name as sub_sports_name, u.first_name as user_first_name, u.last_name as user_last_name, u.email, u.user_group, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, (SELECT count(*) FROM '.Tables::POST_FAVOURITE.' WHERE post_id=p.id) as total_favourite,p.shared_post_id');
        $this->db->from(Tables::POST_FAVOURITE.' pf');
        $this->db->join(Tables::POSTS.' p', 'pf.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u_c', 'pf.user_id = u_c.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('pf.user_id', $condition['user_id']);
        if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);
        $this->db->limit($limit, $offest);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->result();
        else
            return array();
    }

    /*Get User Favourite Post Count*/
    public function getUserFavouriteTotal($condition){
        $this->db->select('count(p.id) as total_count');
        $this->db->from(Tables::POST_FAVOURITE.' pf');
        $this->db->join(Tables::POSTS.' p', 'pf.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u_c', 'pf.user_id = u_c.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('pf.user_id', $condition['user_id']);
        if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->row()->total_count;
        else
            return 0;
    }

    public function get_post_detail($post_id){
        $this->db->select('p.id as post_id, p.description, p.title, p.website_url, p.location, p.latitude, p.longitude, p.views, p.link_contact_form, p.contact_email, p.status, p.shared_post_id, p.created_date, p.created_by as user_id, p.sports_id, p.sub_sports_id, sp.name as sport_name, ssp.name as sub_sports_name, u.first_name as user_first_name, u.last_name as user_last_name, u.email, u.user_group, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, (SELECT count(*) FROM '.Tables::POST_FAVOURITE.' WHERE post_id=p.id) as total_favourite');
        $this->db->from(Tables::POSTS.' p');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        $this->db->where('p.id', $post_id);
        
        $q=$this->db->get();

        return $q;
    }

    /* get personal trainee */
    public function get_trainee($condition, $offest = 0, $limit = 20)
    {
        $this->db->select('id,title,email,speciality,skill,experience,rating,description,CONCAT("'.base_url('uploads/profile_pic/').'",id,"/",profile_pic) as profile_pic,IFNULL(profile_pic,"") as profile_image');
        $this->db->from(Tables::TRAINEE);
        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(title LIKE '%".$condition['keywords']."%')");
        $this->db->limit($limit, $offest);
        $this->db->order_by('id DESC');
        $query = $this->db->get();

        return $query;
    }
     /* get personal trainee */
    public function get_total_trainee($condition)
    {   
        $this->db->select('id');
        $this->db->from(Tables::TRAINEE); 
        if(isset($condition['keywords']) && !empty($condition['keywords']))
            $this->db->where("(title LIKE '%".$condition['keywords']."%')");       
       
        $q=$this->db->get();
        return $q;
    }

    /* get personal trainee media*/
    public function get_trainee_image($trainee_id)
    {
        $this->db->select('CONCAT("'.base_url('uploads/trainee/').'",name) as name,CONCAT("'.base_url('uploads/trainee/').'",thumbnail_image) as thumbnail_image_url,id as image_id');
        $this->db->from(Tables::TRAINEE_IMAGE);
        $this->db->where(array('trainee_id'=>$trainee_id));
        $query = $this->db->get();
        /*return $query;
       echo $this->db->last_query();*/
        if ($query->num_rows()) {
            return $query->result(); 
        }else{
            return array();
        }
        
    }

    /*Get User Favourite Post*/
    public function getUserFavourite1($condition, $offest = 0, $limit = 20){
        $this->db->select('my.id as my_post_id,p.id as post_id, p.description, p.title, p.website_url, p.location, p.latitude, p.longitude, p.views, p.link_contact_form, p.contact_email, p.status, p.created_date, p.created_by as user_id, p.sports_id, p.sub_sports_id, sp.name as sport_name, ssp.name as sub_sports_name, u.first_name as user_first_name, u.last_name as user_last_name, u.email, u.user_group, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, (SELECT count(*) FROM '.Tables::POST_FAVOURITE.' WHERE post_id=p.id) as total_favourite,p.shared_post_id');
        $this->db->from(Tables::MY_POST.' my');
        $this->db->join(Tables::POSTS.' p', 'my.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u_c', 'my.user_id = u_c.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('my.user_id', $condition['user_id']);
            $this->db->where('my.status', 1);
        /*if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);*/
        $this->db->limit($limit, $offest);
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->result();
        else
            return array();
    }

    /*Get User Favourite Post Count*/
    public function getUserFavouriteTotal1($condition){
        $this->db->select('count(my.id) as total_count');
        $this->db->from(Tables::MY_POST.' my');
        $this->db->join(Tables::POSTS.' p', 'my.post_id = p.id', 'left');
        $this->db->join(Tables::USER.' u_c', 'my.user_id = u_c.id', 'left');
        $this->db->join(Tables::USER.' u', 'p.created_by = u.id', 'left');
        $this->db->join(Tables::SPORTS.' sp', 'p.sports_id = sp.id', 'left');
        $this->db->join(Tables::SPORTS.' ssp', 'p.sub_sports_id = ssp.id', 'left');
        if(isset($condition['user_id']) && !empty($condition['user_id']))
            $this->db->where('my.user_id', $condition['user_id']);
            $this->db->where('my.status', 1);
        /*if(isset($condition['post_type']) && !empty($condition['post_type']))
            $this->db->where('p.post_type', $condition['post_type']);*/
        $this->db->order_by('p.id DESC');
        $q=$this->db->get();
        if($q->num_rows() > 0 )
            return $q->row()->total_count;
        else
            return 0;
    }
    
    

}