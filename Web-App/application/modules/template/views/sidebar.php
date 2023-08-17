<aside class="left-sidebar">
            <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
        <!-- End User profile text-->
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav">
            <ul id="sidebarnav">
                <li >
                    <a class="<?php echo ($this->router->fetch_method()=='dashboard')?'active':''?>" href="<?php echo $this->config->base_url() ?>admin/dashboard" aria-expanded="false">
                      <i class="las la-tachometer-alt menu-icon"></i>
                      <span class="hide-menu">Dashboard</span>
                  </a>
                </li>
                <li class="">
                    <a href="<?php echo $this->config->base_url() ?>admin/users" class="<?php echo ($this->router->fetch_method()=='users')?'active':''?>" aria-expanded="false">
                      <i class="las la-user menu-icon"></i>
                      <span class="hide-menu">User</span>
                  </a>
                </li>

                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/upload_video" class="<?php echo ($this->router->fetch_method()=='upload_video')?'active':''?>" aria-expanded="false">
                      <i class="las la-upload menu-icon"></i>
                      <span class="hide-menu">Upload Video</span>
                  </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/manage_data" class="<?php echo ($this->router->fetch_method()=='manage_data')?'active':''?>" aria-expanded="false">
                      <i class="las la-server menu-icon"></i>
                      <span class="hide-menu">Manage Data</span>
                  </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/manage_fitness_data" class="<?php echo ($this->router->fetch_method()=='manage_fitness_data')?'active':''?>" aria-expanded="false">
                      <i class="las la-server menu-icon"></i>
                      <span class="hide-menu">Manage Fitness Data</span>
                  </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/sports_center" class="<?php echo ($this->router->fetch_method()=='sports_center')?'active':''?>" aria-expanded="false">
                      <i class="las la-baseball-ball menu-icon"></i>
                      <span class="hide-menu">Sports Centre</span>
                  </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/book_appointment" class="<?php echo ($this->router->fetch_method()=='book_appointment')?'active':''?>" aria-expanded="false">
                      <i class="las la-school menu-icon"></i>
                      <span class="hide-menu">Sports Centre Enquiry</span>
                  </a>
                </li>
               <!--  <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/coaching_academy" class="<?php echo ($this->router->fetch_method()=='coaching_academy')?'active':''?>" aria-expanded="false">
                      <i class="las la-school menu-icon"></i>
                      <span class="hide-menu">Coaching Academy</span>
                  </a>
                </li> -->
                <!-- <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/enquiry" class="<?php echo ($this->router->fetch_method()=='enquiry')?'active':''?>" aria-expanded="false">
                      <i class="las la-school menu-icon"></i>
                      <span class="hide-menu">Coaching Academy Contact</span>
                  </a>
                </li> -->
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/events" class="<?php echo ($this->router->fetch_method()=='events')?'active':''?>" aria-expanded="false">
                      <i class="las la-calendar menu-icon"></i>
                      <span class="hide-menu">Sport Events</span>
                  </a>
                </li>
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/fitness_studio" class="<?php echo ($this->router->fetch_method()=='fitness_studio')?'active':''?>" aria-expanded="false">
                      <i class="las la-running menu-icon"></i>
                      <span class="hide-menu">Fitness Studio</span>
                  </a>
                </li>

                <!-- <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/gym" class="<?php echo ($this->router->fetch_method()=='gym')?'active':''?>" aria-expanded="false">
                      <i class="las la-dumbbell menu-icon"></i>
                      <span class="hide-menu">Gym</span>
                  </a>
                </li> -->
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/personal_trainee" class="<?php echo ($this->router->fetch_method()=='personal_trainee')?'active':''?>" aria-expanded="false">
                      <i class="las la-dumbbell menu-icon"></i>
                      <span class="hide-menu">Personal Trainer</span>
                  </a>
                </li>
                <!-- <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/color_setting" class="<?php echo ($this->router->fetch_method()=='color_setting')?'active':''?>" aria-expanded="false">
                      <i class="las la-cog menu-icon"></i>
                      <span class="hide-menu">Header Color</span>
                  </a>
                </li> -->
                <li class="nav-item">
                    <a href="<?php echo $this->config->base_url() ?>admin/color_setting" class="<?php echo ($this->router->fetch_method()=='color_setting')?'active':''?>" aria-expanded="false">
                      <i class="las la-cog menu-icon"></i>
                      <span class="hide-menu">Settings</span>
                  </a>
                </li>
                
            </ul>
        </nav>
        <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
   
</aside>