(function(){
	'use strict';
	
	/**
	 * Copy this template and implement code in order to create new
	 * list types.
	 */
	$(document).ready(function(){
		$.getJSON( '/item', function( items ) {
			var tableData = [];
			var tableCols = [{title: ''},{title: '' }];
			for(var i = 0; i < items.length; i++){
				//Generate table row and add it to tableData
			}
			$('#mainDataTable').dataTable({
				"data": tableData,
				"columns": tableCols
			});
		});
	});
	
})();