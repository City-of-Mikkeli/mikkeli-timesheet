(function(){
	'use strict';
	
	String.prototype.pick = function(min, max) {
		var n, chars = '';
		if (typeof max === 'undefined') {
			n = min;
		} else {
			n = min + Math.floor(Math.random() * (max - min));
		}
		for (var i = 0; i < n; i++) {
			chars += this.charAt(Math.floor(Math.random() * this.length));
		}
		return chars;
	};
	
	String.prototype.shuffle = function() {
		var array = this.split('');
		var tmp, current, top = array.length;
		if (top) while (--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
		return array.join('');
	};
	
	var getPassword = function(){
		var specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
		var lowercase = 'abcdefghijklmnopqrstuvwxyz';
		var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var numbers = '0123456789';
		var all = specials + lowercase + uppercase + numbers;
		var password = '';
		password += specials.pick(1);
		password += lowercase.pick(1);
		password += uppercase.pick(1);
		password += all.pick(6, 12);
		password = password.shuffle();
		
		return password;
	};
	
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
	
	var roles = {
		'admin' : 'Ylläpitäjä',
		'manager' : 'Esimies',
		'user' : 'Käyttäjä'
	};
	
	$(document).ready(function(){
		$('.main').append('<button id="addUserBtn" class="btn btn-warning">Lisää käyttäjä</button>');
		
		$.getJSON( '/user', function( users ) {
			var tableData = [];
			var tableCols = [{title: 'Email'}, {title: 'Salasana'}, {title: 'Rooli' }, {title: 'Toiminnot'}];
			for(var i = 0; i < users.length; i++){
				var user = users[i];
				tableData.push(['<p data-colname="email" class="tableCol" data-rowid="'+user._id+'">'+user.local.email+'</p>', '*********', roles[user.local.role], '<button class="btn btn-default">Edit</button><button class="btn btn-default">Reset password</button><button class="btn btn-danger deleteUserBtn">Poista</button>']);
			}
			$('#mainDataTable').dataTable({
				"data": tableData,
				"columns": tableCols
			});
		});
		
		$('#mainDataTable').on('init.dt', function(){
			$('#addUserBtn').click(function(){
				$( '#mainDataTable' ).DataTable().row.add(['<input type="text" name="email" />', '<span class="newUserPass">' + getPassword() + '</span><small> ( tämä on viimeinen kerta kun näet salasanan. )</small> ', '<select name="role"><option value="user">Käyttäjä</option><option value="manager">Esimies</option><option value="admin">Ylläpitäjä</option></select>', '<button class="btn btn-default addNewUserBtn">Tallenna</button><button data-onserver="false" class="btn btn-danger deleteUserBtn">Poista</button>']).draw();
			});
		});

		$(document).on('click', '.addNewUserBtn', function(){
			//TODO: add validation
			var tablerow = $(this).parents('tr');
			var email = tablerow.find('input[name="email"]').val();
			var password = tablerow.find('.newUserPass').text();
			var role = tablerow.find('select[name="role"]').val();	
			$.post( '/user', { email: email, password: password, role: role }, function( user ) {
				var dt = $( '#mainDataTable' ).DataTable(); 
				dt.row(tablerow).remove();
				dt.row.add([user.local.email, '*********', roles[user.local.role], '<button class="btn btn-default editUserBtn">Edit</button><button class="btn btn-default">Reset password</button><button class="btn btn-danger deleteUserBtn">Poista</button>']).draw();
			}, 'json');		
		});
		
		$(document).on('click', '.deleteUserBtn', function(){
			if($(this).data('onserver') == false){
				$( '#mainDataTable' ).DataTable().row($(this).parents('tr')).remove().draw('false');
			}else{
				//TODO: Prompt user and if granted, perform call
				//TODO: Add functionality for deleting
			}
		});
		
		$(document).on('click', '.editUserBtn', function(){
			$(this).text('Tallenna');
			$(this).removeClass('editUserBtn');
			$(this).addClass('updateUserBtn');
			$(this).parent().append('<button class="btn btn-danger cancelUserEditBtn">Peruuta</button>');
			$(this).parents('tr').find('.tableCol').each(function(){
				$(this).html('<input data-originalvalue="'+$(this).text()+'" type="text" value="'+$(this).text()+'" \>');
			});
		});
		
		$(document).on('click', '.cancelUserEditBtn', function(){
			var editBtn = $(this).parent().find('.updateUserBtn');
			editBtn.removeClass('updateUserBtn');
			editBtn.addClass('editUserBtn');
			editBtn.text('Muokkaa');
			$(this).parents('tr').find('.tableCol').each(function(){
				$(this).html($(this).find('input').data('originalvalue'));
			});
			$(this).remove();
		});
		
		/*$(document).on('click', '.updateUserBtn', function(){ //TODO: implement sending edits
			var values = getValues($(this).parents('tr'));
			var tablerow = $(this).parents('tr');
			$.post( '/costcenter/'+values.id, values.cols, function( costcenter ) {
				var dt = $( '#mainDataTable' ).DataTable(); 
				dt.row(tablerow).remove();
				dt.row.add(['<p data-colname="name" data-rowid="'+costcenter._id+'" class="tableCol">'+costcenter.name+'</p>',
	                '<p data-colname="number" class="tableCol" >'+costcenter.number+'</p>',
	                '<button class="btn btn-default editCostCenterBtn">Muokkaa</button>']).draw();
			});
		});*/
		
		
	});
	
})();