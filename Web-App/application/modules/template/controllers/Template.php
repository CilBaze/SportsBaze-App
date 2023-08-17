<?php

defined('BASEPATH') OR exit('No direct script access allowed') ;

class Template extends MY_Controller
{
	function __construct()
	{
		parent::__construct();
	}

	/* Load site Template */
	public function site_template($data)
	{
		$this->load->view('site_index',$data);

	}

	/* Load admin Template */
	public function admin_template($data)
	{
		$this->load->view('admin-template',$data);
	}

	/* Load admin Template */
	public function login_template($data)
	{
		$this->load->view('admin_login_template',$data);
	}

	/* Load user dashboard template */
	public function user_dashboard_template($data)
	{
		$this->load->view('dashboard_index',$data);
	}

}

