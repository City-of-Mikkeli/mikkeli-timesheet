(function(){
	'use strict';
	
	$(document).ready(function(){
		$('.main').append('<button id="addCustomerBtn" class="btn btn-warning">Uusi tilaaja</button>');
		$('#addCustomerBtn').click(function(){
			$('#addCustomerModal').modal('show');
		});
		$.getJSON( '/customer', function( customers ) {
			var tableData = [];
			var tableCols = [{title: 'Nimi'}];
			for(var i = 0; i < customers.length; i++){
				var customer = customers[i];
				tableData.push([customer.name]);
			}
			$('#mainDataTable').dataTable({
				"data": tableData,
				"columns": tableCols
			});
		});
	});
	
})();