<!DOCTYPE html>

<html>

	<head>
    <meta charset="utf-8" />
	<title><?php echo $title ? $title: 'SportsBaze';?></title>
     <meta name="keywords" content="" />
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- Set the viewport width to device width for mobile -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">    
         <script type="text/javascript">
            var base_url = "<?php echo  base_url();?>";
        </script>

        <!-- Fav and touch icons -->
        <!-- <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $this->config->base_url() ?>img/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $this->config->base_url() ?>img/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $this->config->base_url() ?>img/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="<?php echo $this->config->base_url() ?>img/ico/apple-touch-icon-57-precomposed.png"> -->
        <link rel="shortcut icon" href="<?php echo $this->config->base_url() ?>assets/images/ico/favicon.png">


        <!-- CSS -->

    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/modules/admin/css/header-footer.css');?>">
   
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/modules/admin/css/sidebar.css');?>">



        
       

	<?php if(isset($css_array) && count($css_array) > 0 ){ foreach($css_array as $css){ ?>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url($css);?>">

	<?php } } ?>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/modules/admin/css/responsive.css');?>">
	
    <script src="<?php echo $this->config->base_url() ?>assets/js/jquery-3.4.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="<?php echo base_url('assets/plugins/owlcarousel/js/owl.carousel.min.js');?>"></script>
	<script type="text/javascript">

		var base_url = '<?php echo base_url();?>';
		 var hide_date = '';//Hide previous date in daterangepicker
		 
	</script>

	

</head>
<body class="fix-header fix-sidebar card-no-border">   
  
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">

        	<?php $this->load->view('header');?> 
            <?php $this->load->view('sidebar');?> 
            <div class="page-wrapper">
                <?php $this->load->view($content);?> 
                <?php $this->load->view('footer');?> 
            </div>
    </div>


    <!-- Head SCRIPTS -->
        
        <script src="<?php echo $this->config->base_url() ?>assets/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="<?php echo $this->config->base_url() ?>assets/modules/admin/js/jquery.slimscroll.js" type="text/javascript"></script>
        <script src="<?php echo $this->config->base_url() ?>assets/modules/admin/js/sidebarmenu.js" type="text/javascript"></script>
        <script src="<?php echo $this->config->base_url() ?>assets/modules/admin/js/sticky-kit.min.js" type="text/javascript"></script>
        <script src="<?php echo $this->config->base_url() ?>assets/modules/admin/js/function.js" type="text/javascript"></script>
      
    <?php if(isset($js_array) && count($js_array) > 0 ){ 
        foreach($js_array as $js){ ?>

		<script src="<?php echo base_url($js);?>"></script>

	<?php }} ?>
    <?php if(isset($js_external_array) && count($js_external_array) > 0 ){ foreach($js_external_array as $js){ ?>

        <script src="<?php echo $js;?>"></script>

    <?php }} ?> 
	
	</body>

</html>

