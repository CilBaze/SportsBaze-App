<!DOCTYPE html>

<html>

	<head>
    <meta charset="utf-8" />
    <title><?php echo $title;?></title>
    <meta name="keywords" content="" />
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    


    <!-- Fav and touch icons -->
    <!-- <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="assets/images/ico/apple-touch-icon-57-precomposed.png"> -->
    <link rel="shortcut icon" href="<?php echo base_url('assets/images/ico/favicon.png');?>">

	<meta charset="utf-8">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width,initial-scale=1">

	<title><?php echo $title ? $title: 'SportsBaze';?></title>


	<!-- CSS -->
    

	<!-- Plugin CSS -->
    <link href="<?php echo base_url('assets/plugins/jquery-ui/jquery-ui.custom.min.css');?>" rel="stylesheet" type="text/css"> 
	<?php if(isset($css_array) && count($css_array) > 0 ){ foreach($css_array as $css){ ?>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url($css);?>">

	<?php } } ?>

	

	<script type="text/javascript">

		var base_url = '<?php echo base_url();?>';
		 var hide_date = '';//Hide previous date in daterangepicker
		 
	</script>

	

</head>

	<body>   
        <div class="auth-section">
            <div class="container"> 
		
		      <?php $this->load->view($content);?>   
            </div>
                
        </div>
            

            

        <!--
        <a class="back-top" href="#" id="back-top"> <i class="icon-chevron-up icon-white"> </i> </a> -->

        <!-- Javascript =============================================== --> 
        <!-- Placed at the end of the document so the pages load faster --> 
        <script type="text/javascript" src="<?php echo base_url('assets/js/jquery-3.4.1.min.js');?>"></script> 
        <!--[if lt IE 9]>
          <script type="text/javascript" src="js/excanvas.js"></script>      
        <![endif]-->
        <script type="text/javascript" src="<?php echo base_url('assets/js/bootstrap.min.js');?>"></script> 
        <script type="text/javascript" src="<?php echo base_url('assets/plugins/jquery-ui/jquery-ui.custom.min.js');?>"></script>
        
		<?php if(isset($js_array) && count($js_array) > 0 ){ foreach($js_array as $js){ ?>

		<script src="<?php echo base_url($js);?>"></script>

		<?php }} ?>
	
	</body>

</html>

