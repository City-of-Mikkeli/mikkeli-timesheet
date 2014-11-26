(function(){
	'use strict';
	
	var updateCustomer = function(project_id){
		$.getJSON( '/project/'+project_id, function( project ) {
			for(var i = 0; i < project.customers.length; i++){
				var customer_id = project.customers[i];
				$.getJSON( '/customer/'+customer_id, function( customer ) {
					$('#addWorkCustomerInput').append('<option value="'+customer._id+'">'+customer.name+'</option>');
				});
			}
		});
	};
	
	$(document).ready(function(){
		$('#addWorkProjectInput').change(function(){
			var project_id = $(this).val();
			updateCustomer(project_id);
		});
		
		$('#addProjectModal').on('show.bs.modal', function (e) {
			$.getJSON( '/customer', function( customers ) {
				for(var i = 0; i < customers.length; i++){
					var customer = customers[i];
					$('#addProjectCustomersInput').append('<option value="'+customer._id+'">'+customer.name+'</option>');	
				}
			});
		});
		
		$('#addWorkModal').on('show.bs.modal', function (e) {
			$.getJSON( '/project', function( projects ) {
				for(var i = 0; i < projects.length; i++){
					var project = projects[i];
					$('#addWorkProjectInput').append('<option value="'+project._id+'">'+project.name+'</option>');	
				}
				updateCustomer($('#addWorkProjectInput').val());
			});
			$.getJSON( '/price', function( prices ) {
				for(var i = 0; i < prices.length; i++){
					var price = prices[i];
					$('#addWorkPriceInput').append('<option value="'+price._id+'">'+price.name+' ('+price.price+'€/h)</option>');
				}
			});
			$.getJSON( '/costcenter', function( costcenters ) {
				for(var i = 0; i < costcenters.length; i++){
					var costcenter = costcenters[i];
					$('#addWorkCostCenterInput').append('<option value="'+costcenter._id+'">'+costcenter.name+' ('+costcenter.number+')</option>');	
				}
			});
			
		});
		
		$('#addWorkModal').on('shown.bs.modal', function(e) {
			if($('#addWorkIdInput').val() != ''){
				var eventid = $('#addWorkIdInput').val();
				var work = renderedEvents[eventid];
				$('#addWorkHoursInput').val(work.hours);
				$('#addWorkDescriptionInput').val(work.description);
				$('#addWorkPriceInput').val(work.price_id);
				$('#addWorkCostCenterInput').val(work.costcenter_id);
				$('#addWorkProjectInput').val(work.project_id);
				$('#addWorkCustomerInput').val(work.customer_id);
				$('#addWorkDateInput').val(work.day);
			}
		});
	});
	
})();