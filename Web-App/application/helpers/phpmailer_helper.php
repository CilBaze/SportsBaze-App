<?php

/*use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;*/

if (!defined('BASEPATH'))

    exit('No direct script access allowed');







function phpmail_send($from, $to, $subject, $message, $attachment_path = NULL, $cc = NULL, $bcc = NULL){
	

	require_once(APPPATH . 'helpers/phpmailer/class.phpmailer.php');
	/*require_once(APPPATH . 'helpers/phpmailer/Exception.php');
	require_once(APPPATH . 'helpers/phpmailer/SMTP.php');*/


	$ci=&get_instance();

	// Create the basic mailer object

	$mail			 = new PHPMailer();

	$mail->IsSMTP();                                      // Set mailer to use SMTP
	/*$mail->Host = "smtp.office365.com";                 // Specify main and backup server
	$mail->Port = 587;                                    // Set the SMTP port
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = "services@mkrad.com";                // SMTP username
	$mail->Password = "M1ch@3lMDADMD";                  // SMTP password
	$mail->SMTPSecure = 'tls';*/
	$mail->Host = SMTP_HOST;                 // Specify main and backup server
	$mail->Port = 587;                                    // Set the SMTP port
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = DEFAULT_EMAIL_FROM;                // SMTP username
	$mail->Password = SMTP_PASSWORD;                  // SMTP password
	$mail->SMTPSecure = 'tls';
	$mail->SMTPDebug  = 1;
	
	$mail->IsHtml(true);


	$mail->Subject	 = $subject;

	$mail->Body		 = $message;

	

	

	/*switch ($CI->mdl_settings->setting('email_send_method'))

	{

	    case 'smtp':

    	    $mail->IsSMTP();



        	// Set the basic properties

        	$mail->Host		 = $CI->mdl_settings->setting('smtp_server_address');

        	$mail->Port		 = $CI->mdl_settings->setting('smtp_port');

    	

        	// Is SMTP authentication required?

        	if ($CI->mdl_settings->setting('smtp_authentication'))

        	{

        		$mail->SMTPAuth	 = TRUE;

        		$mail->Username	 = $CI->mdl_settings->setting('smtp_username');

        		$mail->Password	 = $CI->encrypt->decode($CI->mdl_settings->setting('smtp_password'));

        	}

        	

        	// Is a security method required?

        	if ($CI->mdl_settings->setting('smtp_security'))

        	{

        		$mail->SMTPSecure = $CI->mdl_settings->setting('smtp_security');

        	}

        	

        	break;

        case 'sendmail':

            $mail->IsMail();

            break;

        case 'phpmail':

        case 'default':

            $mail->IsMail();

            break;

	}*/



	//$mail->Subject	 = $subject;

	//$mail->Body		 = $message;





	if (is_array($from))

	{

		// This array should be address, name

		$mail->SetFrom($from[0], $from[1]);

	}

	else

	{

		// This is just an address

		$mail->SetFrom($from);

	}



	// Allow multiple recipients delimited by comma or semicolon

	$to = (strpos($to, ',')) ? explode(',', $to) : explode(';', $to);



	// Add the addresses

	foreach ($to as $address)

	{

		$mail->AddAddress($address);

	}



	if ($cc)

	{

		// Allow multiple CC's delimited by comma or semicolon

		$cc = (strpos($cc, ',')) ? explode(',', $cc) : explode(';', $cc);



		// Add the CC's

		foreach ($cc as $address)

		{

			$mail->AddCC($address);

		}

	}



	if ($bcc)

	{

		// Allow multiple BCC's delimited by comma or semicolon

		$bcc = (strpos($bcc, ',')) ? explode(',', $bcc) : explode(';', $bcc);



		// Add the BCC's

		foreach ($bcc as $address)

		{

			$mail->AddBCC($address);

		}

	}



	// Add the attachment if supplied

	if ($attachment_path)

	{

		$mail->AddAttachment($attachment_path);

	}



	// And away it goes...

	if ($mail->Send())

	{

		$ci->session->set_flashdata('msg', 'The email has been sent');

		@unlink($attachment_path);

		return TRUE;

	}

	else

	{

		// Or not...



		$ci->session->set_flashdata('msg', $mail->ErrorInfo);

		@unlink($attachment_path);

		return FALSE;

	}

}



?>