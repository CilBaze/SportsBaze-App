<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * 
 */
class Admin_model extends MY_Model
{
	
	function __construct()
	{
		$this->load->database();
	}

	public function get_user_count_stats(){
			$query = $this->db->query("SELECT * FROM ((SELECT count(id) as fan FROM ".Tables::USER." WHERE user_group='2') as t1,(SELECT count(id) as coach FROM ".Tables::USER." WHERE user_group='3') as t2,(SELECT count(id) as club FROM ".Tables::USER." WHERE user_group='4') as t3,(SELECT count(id) as athlete FROM ".Tables::USER." WHERE user_group='5') as t4, (SELECT count(id) as total_user FROM ".Tables::USER." WHERE user_group !='1') as t5, (SELECT count(id) as posts FROM ".Tables::POSTS." WHERE post_type ='post') as t6)");
			return $query->row();

	}		

	public function get_user_chart_data($user_group = 2){
		$query = $this->db->query("SELECT concat(Year(created_date),'-',CASE WHEN Month(created_date) < 10 THEN concat('0',Month(created_date)) ELSE Month(created_date) end) as label_text, Count(*) as total FROM ".Tables::USER." WHERE user_group='".$user_group."' AND created_date >= CURDATE() - INTERVAL 1 YEAR GROUP BY Year(created_date), Month(created_date)");
			return $query->result();
	}

	public function get_post_chart_data($post_type = 'post'){
		$query = $this->db->query("SELECT concat(Year(created_date),'-',CASE WHEN Month(created_date) < 10 THEN concat('0',Month(created_date)) ELSE Month(created_date) end) as label_text, Count(*) as total FROM ".Tables::POSTS." WHERE post_type='".$post_type."' AND created_date >= CURDATE() - INTERVAL 1 YEAR GROUP BY Year(created_date), Month(created_date)");
			return $query->result();
	}

	/* Get user list */
	public function get_user_list($filter_data,$limit,$start)	
	{
		
		$this->db->select('*');
		$this->db->from(Tables::USER);
		if (empty($filter_data['status'])) {
			$this->db->where(array('status'=>1));
		}else{
			$this->db->where(array('status'=>$filter_data['status']));
		}
		if (isset($filter_data['email'])) {
			$condition = "(`email` = '".$filter_data['email']."' OR `name` LIKE '%".$filter_data['email']."%')";
			$this->db->where($condition);
		}
		if (isset($filter_data['user_group']) && !empty($filter_data['user_group']) && $filter_data['user_group'] != 1)
			$this->db->where('user_group', $filter_data['user_group']);
		else
			$this->db->where(array('user_group !='=> 1));
		if (!empty($limit)) {
			$this->db->limit($limit,$start);
		}
		$this->db->order_by('id DESC');	
		$query = $this->db->get();
		
		return $query;
	}
	/* Get user list */
	public function get_admin_list($filter_data,$limit,$start)	
	{
		
		$this->db->select('*');
		$this->db->from(Tables::USER);
		if (empty($filter_data['status'])) {
			$this->db->where(array('status'=>1));
		}else{
			$this->db->where(array('status'=>$filter_data['status']));
		}
		if (isset($filter_data['email'])) {
			$condition = "(`email` = '".$filter_data['email']."' OR `name` LIKE '%".$filter_data['email']."%')";
			$this->db->where($condition);
		}
		
			$this->db->where('user_group', 1);
		
		if (!empty($limit)) {
			$this->db->limit($limit,$start);
		}
		$this->db->order_by('id DESC');	
		$query = $this->db->get();
		
		return $query;
	}

	public function getAllEnquiry($filter_data,$limit,$start)	
	{
		
		$this->db->select('cae.*, p.title as title,p.post_type');
		$this->db->from(Tables::COACHING_ACADEMY_ENQUIRY." cae");
		$this->db->join(Tables::POSTS." p", "cae.post_id = p.id", 'left');
		
		/*if (isset($filter_data['title']) && !empty($filter_data['title'])) {
			$condition = "(`p.title` = '".$filter_data['title']."')";
			$this->db->where($condition);

		}*/
		if(isset($filter_data['keywords']) && !empty($filter_data['keywords'])){
            $this->db->where("(p.title LIKE '%".$filter_data['keywords']."%')");
		}
		
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('cae.post_id', $filter_data['post_id']);

		 

		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
		$this->db->where("DATE_FORMAT(cae.created_date,'".SQL_DATE_FORMAT."') >= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['start_date'])))."'",NULL,FALSE);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where("DATE_FORMAT(cae.created_date,'".SQL_DATE_FORMAT."') <= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['end_date'])))."'",NULL,FALSE);
		
		if (!empty($limit)) {
			$this->db->limit($limit,$start);
		}
		$this->db->order_by('cae.id DESC');	
		$query = $this->db->get();
		//echo $this->db->last_query();
		return $query;
	}

	public function totalEnquiryCount($filter_data){
		$this->db->select("count(*) as total_count ");
        $this->db->from(Tables::COACHING_ACADEMY_ENQUIRY." cae");
		$this->db->join(Tables::POSTS." p", "cae.post_id = p.id", 'left');
		
		if(isset($filter_data['keywords']) && !empty($filter_data['keywords'])){
            $this->db->where("(p.title LIKE '%".$filter_data['keywords']."%')");
		}
		
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('cae.post_id', $filter_data['post_id']);

		 

		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
		$this->db->where("DATE_FORMAT(cae.created_date,'".SQL_DATE_FORMAT."') >= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['start_date'])))."'",NULL,FALSE);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where("DATE_FORMAT(cae.created_date,'".SQL_DATE_FORMAT."') <= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['end_date'])))."'",NULL,FALSE);
        
        $q=$this->db->get();
        return $q;
	}


	public function getAllEventsParticipant($filter_data,$limit,$start)	
	{
		
		$this->db->select('cae.*, p.event_name as title');
		
		
		$this->db->from(Tables::EVENTS_ENQUIRY." cae");
		$this->db->join(Tables::EVENTS." p", "cae.event_id = p.id", 'left');
		
		// if (isset($filter_data['title'])) {
		// 	$condition = "(`p.event_name` = '".$filter_data['title']."')";
		// 	$this->db->where($condition);
		// }
		$name_arr = explode(' ',$filter_data['keywords']);
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('cae.event_id', $filter_data['post_id']);

		if(isset($name_arr[0]) && !empty($filter_data['keywords'])){
            $this->db->where("(cae.first_name LIKE '%".$name_arr[0]."%')");
		}
		if(isset($name_arr[1]) && !empty($filter_data['keywords'])){
            $this->db->where("(cae.last_name LIKE '%".$name_arr[1]."%')");
		}
        
		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
			$this->db->where('DATE_FORMAT(cae.created_date,"%Y-%m-%d") >=', $filter_data['start_date']);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where('DATE_FORMAT(cae.created_date,"%Y-%m-%d") <=', $filter_data['end_date']);
		
		if (!empty($limit)) {
			$this->db->limit($limit,$start);
		}
		$this->db->order_by('cae.id DESC');	
		$query = $this->db->get();
		//echo $this->db->last_query();
		return $query;
	}

	public function totalEventsParticipantCount($filter_data){
		$this->db->select("count(*) as total_count ");
        $this->db->from(Tables::EVENTS_ENQUIRY." cae");
		$this->db->join(Tables::EVENTS." p", "cae.event_id = p.id", 'left');
		
		if (isset($filter_data['title'])) {
			$condition = "(`p.event_name` = '".$filter_data['title']."')";
			$this->db->where($condition);
		}
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('cae.event_id', $filter_data['post_id']);

		if(isset($filter_data['keywords']) && !empty($filter_data['keywords'])){
            $this->db->where("(p.event_name LIKE '%".$filter_data['keywords']."%')");
		}
		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
			$this->db->where('DATE_FORMAT(cae.created_date,"%Y-%m-%d") >=', $filter_data['start_date']);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where('DATE_FORMAT(cae.created_date,"%Y-%m-%d") <=', $filter_data['end_date']);
        
        $q=$this->db->get();
        return $q;
	}

	public function get_settings($condition = null){
		if($condition)
			$this->db->where($condition);
		$query = $this->db->get(Tables::OPTIONS);
		return $query;
	}

	public function get_user_profile($id='')
	{		
		$this->db->select('u.*,s.name as sport_name,ss.name as scouting_name');		
		$this->db->from(Tables::USER.' u');		
		$this->db->join(Tables::SPORTS.' s','s.id=u.sports_id','left');		
		$this->db->join(Tables::SPORTS.' ss','ss.id=u.scouting_sports_id','left');		
		$this->db->where(array('u.id'=>$id));
		$query = $this->db->get();
		//echo $this->db->last_query();
		return $query;
	}

	public function getAllBooking($filter_data,$limit,$start)	
	{
		
		$this->db->select('ba.*, p.title as title,p.post_type');
		$this->db->from(Tables::BOOK_APPOINTMENT." ba");
		$this->db->join(Tables::POSTS." p", "ba.post_id = p.id", 'left');
		
		/*if (isset($filter_data['title']) && !empty($filter_data['title'])) {
			$condition = "(`p.title` = '".$filter_data['title']."')";
			$this->db->where($condition);

		}*/
		if(isset($filter_data['keywords']) && !empty($filter_data['keywords'])){
            $this->db->where("(p.title LIKE '%".$filter_data['keywords']."%')");
		}
		
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('ba.post_id', $filter_data['post_id']);
		if (isset($filter_data['post_type']) && !empty($filter_data['post_type']))
			$this->db->where('p.post_type', $filter_data['post_type']);

		 

		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
		$this->db->where("DATE_FORMAT(ba.created_date,'".SQL_DATE_FORMAT."') >= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['start_date'])))."'",NULL,FALSE);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where("DATE_FORMAT(ba.created_date,'".SQL_DATE_FORMAT."') <= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['end_date'])))."'",NULL,FALSE);
		
		if (!empty($limit)) {
			$this->db->limit($limit,$start);
		}
		$this->db->order_by('ba.id DESC');	
		$query = $this->db->get();
		//echo $this->db->last_query();
		return $query;
	}

	public function totalBookingCount($filter_data){
		$this->db->select("count(*) as total_count ");
        $this->db->from(Tables::BOOK_APPOINTMENT." ba");
		$this->db->join(Tables::POSTS." p", "ba.post_id = p.id", 'left');
		
		if(isset($filter_data['keywords']) && !empty($filter_data['keywords'])){
            $this->db->where("(p.title LIKE '%".$filter_data['keywords']."%')");
		}
		
		if (isset($filter_data['post_id']) && !empty($filter_data['post_id']))
			$this->db->where('ba.post_id', $filter_data['post_id']);

		 

		if (isset($filter_data['start_date']) && !empty($filter_data['start_date']))
		$this->db->where("DATE_FORMAT(ba.created_date,'".SQL_DATE_FORMAT."') >= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['start_date'])))."'",NULL,FALSE);

		if (isset($filter_data['end_date']) && !empty($filter_data['end_date']))
			$this->db->where("DATE_FORMAT(ba.created_date,'".SQL_DATE_FORMAT."') <= '".date(PHP_DATE_FORMAT,strtotime(trim($filter_data['end_date'])))."'",NULL,FALSE);
        
        $q=$this->db->get();
        return $q;
	}

}

