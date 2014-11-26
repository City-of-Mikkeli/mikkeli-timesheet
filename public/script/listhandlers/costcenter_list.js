(function(){
	'use strict';
	
	var getValues = function(row){
		var values = {
				id: '',
				cols : {}
		};
		row.find('.tableCol').each(function(){
			if(typeof($(this).data('rowid')) !== 'undefined'){
				values.id = $(this).data('rowid');
			}
			values.cols[$(this).data('colname')] = $(this).find('input').val();
		});
		return values;
		
	};
	
	$(document).ready(function(){
		$('.main').append('<button id="addCostCenterBtn" class="btn btn-warning">Uusi kustannuspaikka</button>');
		$('#addCostCenterBtn').click(function(){
			$('#addCostCenterModal').modal('show');
		});
		$.getJSON( '/costcenter', function( costcenters ) {
			var tableData = [];
			var tableCols = [{title: 'Nimi'},{title: 'Numero'},{title: 'Toiminnot'}];
			for(var i = 0; i < costcenters.length; i++){
				var costcenter = costcenters[i];
				tableData.push(['<p data-colname="name" data-rowid="'+costcenter._id+'" class="tableCol">'+costcenter.name+'</p>',
				                '<p data-colname="number" class="tableCol" >'+costcenter.number+'</p>',
				                '<button class="btn btn-default editCostCenterBtn">Muokkaa</button>']);
			}
			$('#mainDataTable').dataTable({
				"data": tableData,
				"columns": tableCols
			});
		});
		
		$(document).on('click', '.editCostCenterBtn', function(){
			$(this).text('Tallenna');
			$(this).removeClass('editCostCenterBtn');
			$(this).addClass('saveCostCenterBtn');
			$(this).parent().append('<button class="btn btn-danger cancelCostCenterEditBtn">Peruuta</button>');
			$(this).parents('tr').find('.tableCol').each(function(){
				$(this).html('<input data-originalvalue="'+$(this).text()+'" type="text" value="'+$(this).text()+'" \>');
			});
		});
		$(document).on('click', '.cancelCostCenterEditBtn', function(){
			var editBtn = $(this).parent().find('.saveCostCenterBtn');
			editBtn.removeClass('saveCostCenterBtn');
			editBtn.addClass('editCostCenterBtn');
			editBtn.text('Muokkaa');
			$(this).parents('tr').find('.tableCol').each(function(){
				$(this).html($(this).find('input').data('originalvalue'));
			});
			$(this).remove();
		});
		$(document).on('click', '.saveCostCenterBtn', function(){
			var values = getValues($(this).parents('tr'));
			var tablerow = $(this).parents('tr');
			$.post( '/costcenter/'+values.id, values.cols, function( costcenter ) {
				var dt = $( '#mainDataTable' ).DataTable(); 
				dt.row(tablerow).remove();
				dt.row.add(['<p data-colname="name" data-rowid="'+costcenter._id+'" class="tableCol">'+costcenter.name+'</p>',
	                '<p data-colname="number" class="tableCol" >'+costcenter.number+'</p>',
	                '<button class="btn btn-default editCostCenterBtn">Muokkaa</button>']).draw();
			});
		});
	});
	
})();