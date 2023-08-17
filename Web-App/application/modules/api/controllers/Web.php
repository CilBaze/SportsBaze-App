<?php 

defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * 
*/

class Web extends MY_Controller
{
	function __construct()
	{
		parent::__construct();
		$this->config->load('config');
		$this->load->model(array('api/Sport_model'));
		$this->load->library(array('common/Tables','pagination'));
		$this->load->helper(array('common/common','url'));
       
		
	}

	/* Load home page */

	public function cookie_policy()
	{	
		$data['css_array']       = $this->config->config['cookie_policy_css'];
        //$data['js_array']        = $this->config->config['login_js'];
		$data['title'] 			 ='Cookie Policy '.SITE_TITLE;
		$data['keyword'] 		 ='Cookie Policy '.SITE_TITLE;
		$data['description'] 	 ='Cookie Policy '.SITE_TITLE;
		$data['content']		 ='api/cookie_policy';
		echo Modules::run('template/site_template',$data);
	}
	public function privacy_policy()
	{	
		$data['css_array']       = $this->config->config['privacy_policy_css'];
        $data['js_array']        = $this->config->config['login_js'];
		$data['title'] 			 ='Privacy Policy '.SITE_TITLE;
		$data['keyword'] 		 ='Privacy Policy '.SITE_TITLE;
		$data['description'] 	 ='Privacy Policy '.SITE_TITLE;
		$data['content']		 ='api/privacy_policy';
		echo Modules::run('template/site_template',$data);
	}
	public function term_condition()
	{	
		$data['css_array']       = $this->config->config['term_condition_css'];
        $data['js_array']        = $this->config->config['login_js'];
		$data['title'] 			 ='Term Condition '.SITE_TITLE;
		$data['keyword'] 		 ='Term Condition '.SITE_TITLE;
		$data['description'] 	 ='Term Condition '.SITE_TITLE;
		$data['content']		 ='api/term_condition';
		echo Modules::run('template/site_template',$data);
	}
}