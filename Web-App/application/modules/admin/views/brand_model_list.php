<style type="text/css">
    .btn-or {
    background: #f0592c;
    border: none;
    color: #fff;
    font-size: 12px;
    padding: 3px 12px;
    border-radius: 2px;
}
.btn-or:hover {
    color: #fff;
}
</style>
<div aria-hidden="true" role="dialog" tabindex="-1" class="modal fade" id="confirmdel" style="display: none;z-index: 2147483648">
    <div class="modal-dialog" style="width: 400px">
        <div class="modal-body" style="padding-bottom: 0px;">
            Are you sure you want to delete!
        </div>
        <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-primary" id="delete">Delete</button>
            <button type="button" data-dismiss="modal" class="btn">Cancel</button>
        </div>
    </div>
</div>
<div aria-hidden="true" role="dialog" tabindex="-1" class="modal fade" id="confirm" style="display: none;z-index: 2147483648">
    <div class="modal-dialog" id="response">

    </div>
</div>
<div class="vd_content-wrapper">
    <div class="vd_container">
        <div class="vd_content clearfix">
            <div class="vd_head-section clearfix">
                <div class="vd_panel-header">
                    <div class="vd_panel-menu hidden-sm hidden-xs" data-intro="<strong>Expand Control</strong><br/>To expand content page horizontally, vertically, or Both. If you just need one button just simply remove the other button code." data-step=5  data-position="left">
                        <div data-action="remove-navbar" data-original-title="Remove Navigation Bar Toggle" data-toggle="tooltip" data-placement="bottom" class="remove-navbar-button menu"> <i class="fa fa-arrows-h"></i> </div>
                        <div data-action="remove-header" data-original-title="Remove Top Menu Toggle" data-toggle="tooltip" data-placement="bottom" class="remove-header-button menu"> <i class="fa fa-arrows-v"></i> </div>
                        <div data-action="fullscreen" data-original-title="Remove Navigation Bar and Top Menu Toggle" data-toggle="tooltip" data-placement="bottom" class="fullscreen-button menu"> <i class="glyphicon glyphicon-fullscreen"></i> </div>
                    </div>
                </div>
            </div>
            <div class="vd_content-section clearfix">
               
                <div class="panel widget light-widget">
                    <div class="panel-heading vd_bg-grey">
                        <h3 class="panel-title" style="color:#fff"> <span class="menu-icon"> <i class="fa fa-dot-circle-o"></i> </span> <?php echo $breadcrumb;?> </h3>
                    </div>
                    <div class="panel-body">
                         
                        <div class="panel widget">
                            <div  class="container">
                                <div class="row">
                                    <form action="<?= $this->config->base_url() . 'admin/drivers' ?>" method="get">

                                        <!-- <div class="col-md-4 label-H">
                                            <label>Brand name</label>
                                            <input class="form-control" type="text" value="<?php echo !empty($filter_data['brand_name']) ? $filter_data['brand_name'] : ''; ?>" name="brand_name"/>
                                        </div>

                                        <div class="col-md-2 label-H">
                                            <label>Status</label>
                                            <select class="form-control" name="status">
                                                <option value="">Select</option>
                                                <option <?php echo!empty($filter_data['status']) ? $filter_data['status'] == '1' ? 'selected' : '' : ''; ?>  value="1">Active</option>
                                                <option <?php echo isset($filter_data['status']) ? $filter_data['status'] == '2' ? 'selected' : '' : ''; ?>  value="4">Inactive</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3" style="margin-top:27px">
                                            <input type="submit" value="Search" class="btn btn-success"/>
                                            <a href="<?= $this->config->base_url() . 'admin/brand_list' ?>" class="btn btn-danger"><i class="fa fa-refresh" aria-hidden="true"></i></a>
                                        </div> -->
                                       
                                        

                                        <div class="col-md-12 text-right" style="margin-top: 27px;">
                                            <a href="<?php echo base_url('admin/add_brand_model');?>" class="btn btn-or">Add Brand Model</a>
                                           
                                        </div>
                                       

                                    </form>
                                </div>

                            </div>
                            
                            <div  class="panel-body table-responsive">                                
                                <table id="example" class="table table-hover display border">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Brand name</th>                     
                                            <th>Model name</th>                     
                                            <th>status</th>
                                            <th>Action</th>                                           
                                        </tr>
                                        <?php 
                                        if ($models->num_rows()>0) {  
                                        $i=1;                          
                                        foreach ($models->result()   as $model) {?>
                                            <tr>
                                                <td><?php echo $i++;?></td>
                                                <td><?php echo $model->brand_name;?></td>
                                                <td><?php echo $model->model_name;?></td>
                                                 <td><?= $model->status == 1 ? '<span id="span" class="label label-success" style="background-color:green;color:white;">Active</span>' : '<span id="span" class="label label-success" style="background-color:red;color:white;">Inactive</span>'; ?></td>
                                                 <td><span class="menu-action hiderow<?= $model->id ?>"><a id="<?= $model->id ?>" data-original-title="edit" data-toggle="tooltip" data-placement="top" class="btnaction btn menu-icon vd_bd-yellow vd_yellow" href="<?php echo base_url('admin/edit_brand_model/'.$model->id);?>"> <i class="fa fa-pencil"></i> </a> 
                                                <a id="<?= $model->id ?>" data-original-title="delete" data-toggle="tooltip" data-placement="top" class="model-action btn menu-icon vd_bd-red vd_red"> <i class="fa fa-times"></i> </a></span></td>
                                            </tr>
                                        <?php }}?>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
