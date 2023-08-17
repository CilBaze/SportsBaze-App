$(document).ready(function() {
	$('#forgot-password').on('click',function(){
		$.ajax({
			url:base_url+'admin/forgot_form',
			type:'get',
			
			success:function(data){
				$('#forgot-form').modal('show');
				$('.forgot-form').html(data);
			}
		})
	})
});