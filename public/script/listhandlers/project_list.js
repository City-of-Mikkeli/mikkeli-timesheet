(function(){
	'use strict';
	
	$(document).ready(function(){
		$('.main').append('<button id="addProjectBtn" class="btn btn-warning">Uusi projekti</button>');
		$('#addProjectBtn').click(function(){
			$('#addProjectModal').modal('show');
		});
		$.getJSON( '/project', function( projects ) {
			var tableData = [];
			var tableCols = [{title: 'Nimi'},{title: 'Kuvaus' },{title: 'Aloitettu'}];
			for(var i = 0; i < projects.length; i++){
				var project = projects[i];
				var tableRow = [];
				var name = typeof(project.name) !== 'undefined' ? project.name : '';
				var desc = typeof(project.description) !== 'undefined' ? project.description : '';
				var created = typeof(project.created) !== 'undefined' ? new Date(project.created) : '';
				tableRow.push(name);
				tableRow.push(desc);
				tableRow.push(created);
				tableData.push(tableRow);
			}
		    $('#mainDataTable').dataTable( {
		        "data": tableData,
		        "columns": tableCols
		    }); 
		});
	});
	
})();