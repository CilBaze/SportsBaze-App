<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
<head>
</head>
 
<body bgcolor="#ffffff">
<table class="body-wrap" align="center" border="0" cellpadding="0" cellspacing="0" width="620" bgcolor="#ffffff" style="border:solid 1px #efefef; margin:0 auto;">
	<tbody>
		<tr>
			<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px; padding:10px;">	
				<a href="<?php echo base_url();?>" title="<?php echo DEFAULT_SITE_TITLE;?>"><img  alt="<?php echo DEFAULT_SITE_TITLE;?>" src="<?php echo base_url('assets/images/logo.png');?>" height="50"></a>
			</td>
		</tr>
		<tr>
			<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px; padding: 10px;" bgcolor="#fbfbfb">
				<table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%; padding:10px;">
					<tbody>
						<tr>
							<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px;" height="10" valign="top" width="540">&nbsp;</td>
						</tr>
						<tr>
							<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px;" valign="top" width="540">
								<h1 style="font-size:24px;">Password reset instructions</h1>
							</td>
						</tr>
						<tr>
							<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px;" valign="top" width="540"><br></td>
						</tr>
						<tr>
							<td style="font-family:tahoma, geneva, sans-serif;color:rgb(67, 67, 68);font-size:12px; line-height:18px;" valign="top" width="540">
								<p>Dear <?php echo $user_name;?>,</p>
								<p>You recently requested a password reset from <?php echo DEFAULT_SITE_TITLE;?>, please follow the link below to reset your password.<br />
								<a style="color:#44a0b3; text-decoration:none;" href="<?php echo $reset_link;?>"><?php echo $reset_link;?></a>
								</p>
								<p>If you did not request to reset your password then please just ignore this email and no changes will occur.</p>
								<p><strong><?php echo $expire_msg;?></strong></p>
							</td>
						</tr>
					</tbody>	
				</table>
			</td>
		</tr>
		<tr>
			<td style="font-family:tahoma, geneva, sans-serif; color:#ffffff; font-size:12px;" bgcolor="#29054a">
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>
						<tr>
							<td align="center" style="padding:10px;">
								<p>Email: <a href="mailto:<?php echo DEFAULT_SITE_EMAIL;?>" style="color:#ffffff; text-decoration:none;"><?php echo DEFAULT_SITE_EMAIL;?></a> &nbsp; | &nbsp; Phone: <a href="tel:<?php echo DEFAULT_PHONE_NO;?>" style="color:#ffffff; text-decoration:none;"><?php echo DEFAULT_PHONE_NO;?></a></p>
								<p style="color:#ffffff;"><small>&copy; <?php echo date('Y'). ' '.DEFAULT_SITE_TITLE;?>. All Rights Reserved.</small></p>
							</td>
						</tr>
					</tbody>
				</table>	
			</td>
		</tr>
	</tbody>
</table>
</html>