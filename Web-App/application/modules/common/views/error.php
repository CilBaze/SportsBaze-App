<?php

if($this->session->flashdata('error_msg')){

	echo '<div class="alert alert-danger alert-dismissible">
			<a title="close" aria-label="close" data-dismiss="alert" class="close" href="#">×</a>
			<strong><i class="glyphicon glyphicon-exclamation-sign"></i></strong> '.$this->session->flashdata('error_msg').'
		</div>
		';
}

if($this->session->flashdata('success_msg')){

	echo '<div class="alert alert-success alert-dismissible">
			<a title="close" aria-label="close" data-dismiss="alert" class="close" href="#">×</a>
			<strong><i class="glyphicon glyphicon-ok"></i></strong> '.$this->session->flashdata('success_msg').'
		</div>
		';
}

?>