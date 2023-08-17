

<div class="container-fluid">
    <div class="we-page-title">
        <div class="row">
            <div class="col-md-5 align-self-center">
                <h3 class="we-page-heading">Mobile Screen Header Color</h3> </div>
            <div class="col-md-7 align-self-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                    <li class="breadcrumb-item active">Mobile Screen Header Color</li>
                </ol>
            </div>
        </div>
    </div>
    <div class="manage-data-section">
        <div class="card vd-card">
            
            <div class="card-body">
                <div class="manage-list-item sb-modal-form">
                    <?php $this->load->view('common/error'); ?>
                    <?php echo form_open_multipart(base_url('admin/color_setting')); ?> 
                    <div class="row">
                        <div class="col-md-12"><h2>Mobile Screen Header Color</h2><hr /></div>
                    <?php if ($settings->num_rows()>0) {
                       foreach ($settings->result() as $row) {?>
                        <div class="col-md-6"> 
                            <div class="form-group">
                                <input type="hidden" name="id[]" value="<?php echo $row->id;?>">
                               <label><?php echo $row->color;?></label>
                            </div>
                        </div> 
                        <div class="col-md-6"> 
                            <div class="form-group">
                                <input type="radio" name="status" value="<?php echo $row->id;?>" <?php echo ($row->status==1)?'checked':'';?>><label>Active</label>
                            </div>
                        </div> 
                    <?php  }
                    }?>
                        
                        <div class="col-md-3">                              
                            <div class="form-group">                                       
                                <button type="submit" class="sb-modal-btn"> Update</button>
                            </div>
                        </div>
                    </div> 
                    <?php echo form_close(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
