<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');


class User_model extends MY_Model{

    public function __construct(){
        parent::__construct();
        
    }
    
    
    /*Get all follower list*/
    public function getAllFollower($user_id, $session_user_id, $offest = 0, $limit = 20){
        if($user_id != $session_user_id)
            $following_cond = 'following_id ='.$session_user_id.'  AND follower_id = uf.following_id';
        else
            $following_cond = 'follower_id=uf.following_id AND following_id= '.$session_user_id;
        $this->db->select('u.first_name as user_first_name, u.last_name as user_last_name, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan / User" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, u.email, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, uf.following_id, uf.follower_id, u.id as user_id, (SELECT CASE WHEN count(*) > 0 THEN 1 ELSE 0 end FROM '.Tables::USER_FOLLOWER.' WHERE '.$following_cond.') as isFollowing');
        $this->db->from(Tables::USER_FOLLOWER.' uf');        
        $this->db->join(Tables::USER.' u', 'uf.following_id = u.id', 'left');
        $this->db->where("uf.follower_id", $user_id);
        $this->db->limit($limit, $offest);
        $q = $this->db->get();
        //echo $this->db->last_query();
        return $q;
    }
    //CASE WHEN count(id) > 0 THEN 1 ELSE 0 end

    public function totalFollowerCount($user_id){
        
        $this->db->select('count(*) as total_count');
        $this->db->from(Tables::USER_FOLLOWER.' uf');        
        $this->db->join(Tables::USER.' u', 'uf.following_id = u.id', 'left');
        $this->db->where("uf.follower_id", $user_id);
        $q = $this->db->get();
        //echo $this->db->last_query();
        return $q;
    }

    /*Get all followering list*/
    public function getAllFollowing($user_id, $session_user_id, $offest = 0, $limit = 20){
        /*if($user_id != $session_user_id)
            $following_cond = 'follower_id=uf.follower_id AND following_id= '.$session_user_id;
        else
            $following_cond = 'follower_id=uf.following_id AND following_id= '.$session_user_id;*/
        $this->db->select('u.first_name as user_first_name, u.last_name as user_last_name, (CASE WHEN u.user_group = "1" THEN "Admin" WHEN u.user_group = "2" THEN "Fan / User" WHEN u.user_group = "3" THEN "Coach / Trainer" WHEN u.user_group = "4" THEN "Scout / Club" WHEN u.user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, u.email, CASE WHEN u.profile_pic IS NOT NULL AND u.profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", u.profile_pic) ELSE "" END as profile_pic, uf.following_id, uf.follower_id, u.id as user_id, (SELECT CASE WHEN count(*) > 0 THEN 1 ELSE 0 end FROM '.Tables::USER_FOLLOWER.' WHERE follower_id=uf.follower_id AND following_id= '.$session_user_id.') as isFollowing');
        $this->db->from(Tables::USER_FOLLOWER.' uf');        
        $this->db->join(Tables::USER.' u', 'uf.follower_id = u.id', 'left');
        $this->db->where("uf.following_id", $user_id);
        $this->db->limit($limit, $offest);
        $q = $this->db->get();
        return $q;
    }

    public function totalFollowingCount($user_id)
    {
        $this->db->select('count(*) as total_count');
        $this->db->from(Tables::USER_FOLLOWER.' uf');        
        $this->db->join(Tables::USER.' u', 'uf.follower_id = u.id', 'left');
        $this->db->where("uf.following_id", $user_id);
        $q = $this->db->get();
        return $q;
        
    }

    public function countStatsData($user_id){
        $this->db->select('count(*) as totalPost, (select count(*) from '.Tables::USER_FOLLOWER.' WHERE follower_id ='.$user_id.') as totalFollower, (select count(*) from '.Tables::USER_FOLLOWER.' WHERE following_id ='.$user_id.') as  totalFollowing');
        $this->db->from(Tables::POSTS);
        $this->db->where("created_by", $user_id);
        $q = $this->db->get();
        return $q;
    }

    /* get user list */
    public function get_user_list($condition)
    {
        $this->db->select('id, first_name, last_name, email, contact_no, user_group, (CASE WHEN user_group = "1" THEN "Admin" WHEN user_group = "2" THEN "Fan / User" WHEN user_group = "3" THEN "Coach / Trainer" WHEN user_group = "4" THEN "Scout / Club" WHEN user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, dob, gender, address, city, zip_code, country, nationality, status, parent_first_name, parent_last_name, parent_email, parent_contact_no, current_club, favourite_club, preferred_foot, height, profession, CASE WHEN profile_pic IS NOT NULL AND profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", id, "/", profile_pic) ELSE "" END as profile_pic, CASE WHEN professional_certificate IS NOT NULL AND professional_certificate != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", professional_certificate) ELSE "" END as professional_certificate, CASE WHEN letter_of_employment IS NOT NULL AND letter_of_employment != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", letter_of_employment) ELSE "" END as letter_of_employment , CASE WHEN id_card IS NOT NULL AND id_card != "" THEN CONCAT("'.base_url('uploads/documents/').'", id, "/", id_card) ELSE "" END as id_card');
        $this->db->from(Tables::USER);
        $this->db->where($condition);
        $this->db->order_by('first_name ASC');
        $query =$this->db->get();
        return $query;
    }
    /* get profile detail */
    public function get_profile($user_id='')
    {
        $this->db->select('u.id, first_name, last_name, email, contact_no, user_group, (CASE WHEN user_group = "1" THEN "Admin" WHEN user_group = "2" THEN "Fan" WHEN user_group = "3" THEN "Coach / Trainer" WHEN user_group = "4" THEN "Scout / Club" WHEN user_group = "5" THEN "Athlete" ELSE "Admin" end ) as user_group_name, dob, gender, address, city, zip_code, country, u.nationality, u.status, u.parent_first_name, parent_last_name, parent_email, parent_contact_no, current_club, favourite_club, preferred_foot, height, IFNULL(profession,"") as profession, CASE WHEN profile_pic IS NOT NULL AND profile_pic != "" THEN CONCAT("'.base_url('uploads/profile/').'", u.id, "/", profile_pic) ELSE "" END as profile_pic, CASE WHEN professional_certificate IS NOT NULL AND professional_certificate != "" THEN CONCAT("'.base_url('uploads/documents/').'", u.id, "/", professional_certificate) ELSE "" END as professional_certificate, CASE WHEN letter_of_employment IS NOT NULL AND letter_of_employment != "" THEN CONCAT("'.base_url('uploads/documents/').'", u.id, "/", letter_of_employment) ELSE "" END as letter_of_employment ,CASE WHEN id_card IS NOT NULL AND id_card != "" THEN CONCAT("'.base_url('uploads/documents/').'", u.id, "/", id_card) ELSE "" END as id_card,s.name as sport_name');
        $this->db->from(Tables::USER.' u');
        $this->db->join(Tables::SPORTS.' s','u.sports_id=s.id','left');
        $this->db->where(array('u.id'=>$user_id));
        $q =$this->db->get();
        return $q;
    }

    /* get following token */
    public function get_following_token($follow_id)
    {
        $this->db->select('CONCAT(u.first_name," ",IFNULL(u.last_name,"")) as following_name,CONCAT(u1.first_name," ",IFNULL(u1.last_name,"")) as follower_name,u.fcm_token as following_fcm_token,u1.fcm_token as follower_fcm_token');
        $this->db->from(Tables::USER_FOLLOWER.' uf');
        $this->db->join(Tables::USER.' u','u.id=uf.following_id','left');
        $this->db->join(Tables::USER.' u1','u1.id=uf.follower_id','left');
        $this->db->where(array('uf.id'=>$follow_id));
        $query = $this->db->get();
        return $query;
    }
    /* get following token */
    public function get_bell_notification($following_id)
    {
        $this->db->select('uf.id,CONCAT(u.first_name," ",IFNULL(u.last_name,"")) as following_name,CONCAT(u1.first_name," ",IFNULL(u1.last_name,"")) as follower_name,u.fcm_token as following_fcm_token,u1.fcm_token as follower_fcm_token,CASE WHEN uf.isseen=2 THEN CONCAT(u.first_name," ",IFNULL(u.last_name,"")," has started following you") END as message,uf.created_date,IFNULL(CONCAT("'.base_url('uploads/profile').'","/",u.id,"/",u.profile_pic),"") as profile_pic');
        $this->db->from(Tables::USER_FOLLOWER.' uf');
        $this->db->join(Tables::USER.' u','u.id=uf.following_id','left');
        $this->db->join(Tables::USER.' u1','u1.id=uf.follower_id','left');
        $this->db->where(array('uf.follower_id'=>$following_id,'uf.isseen'=>2));
        $this->db->order_by('uf.id DESC');
        $query = $this->db->get();
        //echo $this->db->last_query();
        return $query;
    }
     /* get following token */
    public function get_user_notification($id)
    {
        $this->db->select('id,fcm_token,CASE WHEN (isseen=2 and status=1) THEN "Your profile has been approved by the administrator" WHEN (isseen=2 and status=2) THEN "Your profile has been rejected by the administratord" WHEN (isseen=2 and status=4) THEN "Your account has been suspended by the administrator" END as message,updated_date as created_date');
       
        $this->db->from(Tables::USER);        
        $this->db->where(array('id'=>$id,'isseen'=>2));
        $query = $this->db->get();
        return $query;
    }

    
    

}