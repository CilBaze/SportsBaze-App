<header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
        <!-- ============================================================== -->
        <!-- Logo -->
        <!-- ============================================================== -->
        <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <!-- Logo icon -->
                <b>
                    <!-- Dark Logo icon -->
                    <img src="<?php echo base_url('assets/images/logo-icon.png');?>" alt="<?php echo DEFAULT_SITE_TITLE;?>"  class="dark-logo" height="30" />
                    
                </b>
                <!--End Logo icon -->
                <!-- Logo text -->
                <span>
                 <!-- dark Logo text -->
                 <img src="<?php echo base_url('assets/images/logo.png');?>" alt="<?php echo DEFAULT_SITE_TITLE;?>" class="dark-logo"  height="45" />
                 <!-- Light Logo text -->    
                 </span>
            </a>
        </div>
        <!-- ============================================================== -->
        <!-- End Logo -->
        <!-- ============================================================== -->
        <div class="navbar-collapse">
            <!-- ============================================================== -->
            <!-- toggle and nav items -->
            <!-- ============================================================== -->
            <ul class="navbar-nav mr-auto mt-md-0 ">
                <!-- This is  -->
                <li class="nav-item"> 
                    <a class="nav-link nav-toggler hidden-md-up" href="javascript:void(0)">
                     <i class="las la-border-all"></i>
                    </a> 
                </li>
                <li class="nav-item"> 
                    <a class="nav-link sidebartoggler hidden-sm-down  " href="javascript:void(0)">
                     <i class="las la-border-all"></i>
                    </a> 
                </li>
               
            </ul>
            <!-- ============================================================== -->
            <!-- User profile and search -->
            <!-- ============================================================== -->
            <ul class="navbar-nav my-lg-0">
               
                <!-- ============================================================== -->
                <!-- End Comment -->
                <!-- ============================================================== -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="<?php echo base_url('assets/images/profile.png');?>" alt="user" class="profile-pic" />
                    <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                    </a>
                    <div class="dropdown-menu profilebox dropdown-menu-right">
                        <ul class="dropdown-user">
                           <li><a href="<?php echo $this->config->base_url('admin/change_password') ?>"><i class="las la-user-cog"></i> Change Password</a></li>
                           <li><a href="<?php echo $this->config->base_url('admin/sub_admin') ?>"><i class="las la-user-cog"></i>Manage sub admin</a></li>
                            <li><a href="<?php echo base_url('admin/logout');?>"><i class="las la-sign-out-alt"></i> Logout</a></li>
                        </ul>
                    </div>
                </li>
                
            </ul>
        </div>
    </nav>
</header>
<!-- Header Ends -->