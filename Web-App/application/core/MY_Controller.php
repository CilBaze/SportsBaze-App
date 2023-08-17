<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/* load the MX_Router class */
require APPPATH . "third_party/MX/Controller.php";

class MY_Controller extends MX_Controller
{	

	function __construct() 
	{
		parent::__construct();
		$this->_hmvc_fixes();
	}
	
	function _hmvc_fixes()
	{		
		//fix callback form_validation		
		//https://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc
		$this->load->library(array('form_validation', 'email', 'parser'));
		$this->form_validation->CI =& $this;
	}

	public function is_logged_in(){
		if($this->session->userdata('user_detail')['logged_in']){
			return true;
		}else{
			
			return false;
		}
	}
	//Check Admin authentication
	public function adminAuthentication(){
		
		$user_group = $this->session->userdata('admin_user');
		if( empty($this->session->userdata('admin_user')) ){
			$this->session->set_flashdata('error_msg','Not logged-in or session expired.');
			redirect('admin/login'); 
		}
		
	}

	

	/* send mail to reset password of admin */
	public function send_approve_mail($user_data)
	{
		$content  = "<p>Hi, ".$userdata->first_name." ".$userdata->last_name."</p>";
		$content .= '<p>Your account is approved by admin.</p>';	
		/*$content .= '<p>Now You can access your account. <a href="'.base_url().'">Click Here</a></p>';*/	
		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Account Approved', $content);

	   
	}
	/* send mail to trainer to save session */
	public function send_mail_trainer($user_data)
	{		
		$content  = "<p>Hi, ".$user_data['title']."</p>";
		$content .= '<p>Session Details:</p>';			
		$content .= '<p>Name: '.$user_data['name'].'</p>';			
		$content .= '<p>Profile Name: '.$user_data['profile_name'].'</p>';			
		$content .= '<p>Date: '.date('m-d-Y',strtotime($user_data['date'])).'</p>';			
		$content .= '<p>Time: '.date('h:i A',strtotime($user_data['time'])).'</p>';			
		$content .= '<p>Type:'.$user_data['type'].'</p>';			
		$content .= '<p>Meeting Link: '.$user_data['meeting_link'].'</p>';			
		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";   
           
	    $this->sendEmail($user_data['email'], 'Session Details', $content);

	   
	}


	public function send_unapprove_mail($user_data)
	{
		
		$content  = "<p>Hi, ".$userdata->first_name." ".$userdata->last_name."</p>";
		$content .= '<p>Your account is not approved by admin.</p>';	
		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Account Unapprove', $content);

	   
	}

	public function send_suspend_mail($user_data)
	{
		
		$content  = "<p>Hi, ".$user_data->first_name." ".$user_data->last_name."</p>";
		$content .= '<p>Your account is suspended by admin.</p>';	
		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Account Suspended', $content);

	   
	}

	public function send_reset_password_mail($user_data)
	{
		$date = date('Y-m-d H:i:s',strtotime('24 hours'));
		$date1= strtotime($date);
		$content  = "<p>Hi, Admin</p>";
		$content .= '<a href="'.base_url('admin/reset_password/'.encrypt_decrypt('encrypt',$user_data->email).'/'.$date1).'">Click here to reset your pssword</a>';	
		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Reset Password', $content);

	   
	}
	public function send_password_mail($user_data,$password)
	{		
		$content  = "<p>Hi, '.$user_data->first_name.'</p>";		       
		$content  .= "<p>Email, '.$user_data->email.'</p>";		       
		$content  .= "<p>Password, '.$password.'</p>";		       
		$content  .= '<p><a href="'.base_url('admin').'">Click Here to login</a></p>';		       
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Reset Password', $content);

	   
	}

	/*Reset Password email*/
	public function send_reset_password_mail_to_user($user_data)
	{
		$date = date('Y-m-d H:i:s',strtotime('24 hours'));
		$date1= strtotime($date);
		$content  = "<p>Hi, ".$user_data->first_name." ".@$user_data->last_name."</p>";
		$content .= '<p>Please use this code to reset your password.</p>';	
		$content .= '<p>OTP: '.@$user_data->otp.'</p>';	      
        $content .= "<p>If you have any questions about ".DEFAULT_SITE_TITLE." or would like to discuss our service, please contact our Customer Support Team at <a href='mailto:" . DEFAULT_SITE_EMAIL . "'>" . DEFAULT_SITE_EMAIL . "</a>.</p>";        
	    $this->sendEmail($user_data->email, 'Reset Password', $content);

	   
	}
	
	
	/* send mail */
	public function sendEmail($to, $subject, $content, $attachment = NULL) {
        $this->load->helper('phpmailer');
        $email_data = array(
            'content' => $content,
        );        

        /*********************************************************/
         $from = array(DEFAULT_EMAIL_FROM, DEFAULT_SITE_EMAIL);
        
            $to = $to;
            $subject = $subject;
            $message = $this->parser->parse('common/email_template/default_email', $email_data, TRUE);
            $headers = "From: ".DEFAULT_EMAIL_FROM;
            $headers .= "MIME-Version: ".DEFAULT_SITE_TITLE."\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            @phpmail_send(DEFAULT_EMAIL_FROM, $to, $subject, $message);
            //$send = mail($to, $subject, $message, $headers);
        
    }

  
   
}

/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */
