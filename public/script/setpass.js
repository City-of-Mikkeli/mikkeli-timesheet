(function(){
	'use strict';
	
	$(document).ready(function(){
		$('#changePasswordInput1').change(function(){
			var pass = $(this).val();
			var pass2 = $('#changePasswordInput2').val();
			if(pass === pass2){
				$('#changePasswordBtn').removeAttr('disabled');
			}else{
				$('#changePasswordBtn').attr('disabled', 'disabled');
			}
		});
		$('#changePasswordInput2').change(function(){
			var pass = $(this).val();
			var pass2 = $('#changePasswordInput1').val();
			if(pass === pass2){
				$('#changePasswordBtn').removeAttr('disabled');
			}else{
				$('#changePasswordBtn').attr('disabled', 'disabled');
			}
		});
	});
	
})();